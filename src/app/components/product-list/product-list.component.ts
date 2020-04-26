import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { throwError, Observable, Subscription, of } from 'rxjs';
import { switchMap, skip } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { GhostService } from 'src/app/services/ghost.service';
import { IProductSimple } from 'src/app/pages/product-detail/product-detail.component';
import { FilterService } from 'src/app/services/filter.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    endOfPages = false;
    private sub0: Subscription;
    private sub1: Subscription;
    constructor(
        public productSvc: ProductService,
        private activatedRoute: ActivatedRoute,
        private ghostSvc: GhostService,
        private filterSvc: FilterService
    ) {
        this.productSvc.httpProxy.netImpl.pageNumber = 0;
        this.sub0 = this.activatedRoute.data
            .pipe(switchMap((next: Data) => {
                return this.getProductOb();
            }))
            .subscribe(next => {
                this.productSvc.productSimpleList = next;
            });
    }

    ngOnInit() {
        this.sub1 = this.ghostSvc.productCardGhostObser
            .pipe(switchMap(() => {
                this.productSvc.httpProxy.netImpl.pageNumber++;
                return this.getProductOb();
            })).subscribe(next => {
                if (next.length === 0)
                    this.endOfPages = true;
                this.productSvc.productSimpleList.push(...next);
            })
    }
    ngOnDestroy(): void {
        this.sub0.unsubscribe();
        this.sub1.unsubscribe();
        this.productSvc.productSimpleList = [];
    }
    private getProductOb(): Observable<IProductSimple[]> {
        return this.activatedRoute.paramMap.pipe(
            switchMap((params: ParamMap) => {
                if (params.get('category')) {
                    this.productSvc.currentCategory = params.get('category');
                    return this.productSvc.httpProxy.netImpl.searchByCategory(this.productSvc.currentCategory, this.filterSvc.defaultSortBy, this.filterSvc.defaultSortOrder)
                } else {
                    return this.firstCategory().pipe(switchMap(first => this.productSvc.httpProxy.netImpl.searchByCategory(first, this.filterSvc.defaultSortBy, this.filterSvc.defaultSortOrder)))
                }
            }));
    }
    private firstCategory(): Observable<string> {
        return this.productSvc.httpProxy.netImpl
            .getCategory().pipe(switchMap(next => { return of(next[0].title) }))
    }
}
