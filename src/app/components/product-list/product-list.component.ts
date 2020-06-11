import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProductSimple } from 'src/app/pages/product-detail/product-detail.component';
import { FilterService } from 'src/app/services/filter.service';
import { GhostService } from 'src/app/services/ghost.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    endOfPages = false;
    private pageNum = -1;
    private pageSize = 20;
    private sub0: Subscription;
    private sub1: Subscription;
    constructor(
        public productSvc: ProductService,
        private activatedRoute: ActivatedRoute,
        private ghostSvc: GhostService,
        private filterSvc: FilterService
    ) {
    }

    ngOnInit() {
        this.sub1 = this.ghostSvc.productCardGhostObser
            .pipe(switchMap(() => {
                return this.getProductOb();
            })).subscribe(next => {
                if (next.length < this.pageSize)
                    this.endOfPages = true;
                this.productSvc.productSimpleList.push(...next);
            })
    }
    ngOnDestroy(): void {
        if (this.sub1)
            this.sub1.unsubscribe();
        this.productSvc.productSimpleList = [];
    }
    private getProductOb(): Observable<IProductSimple[]> {
        this.pageNum++;
        return this.activatedRoute.paramMap.pipe(
            switchMap((params: ParamMap) => {
                if (params.get('category')) {
                    this.productSvc.currentCategory = params.get('category');
                    return this.productSvc.httpProxy.netImpl.searchByCategory(this.productSvc.currentCategory, this.pageNum, this.pageSize, this.filterSvc.defaultSortBy, this.filterSvc.defaultSortOrder)
                } else {
                    return this.firstCategory().pipe(switchMap(first => {
                        return this.productSvc.httpProxy.netImpl.searchByCategory(first, this.pageNum, this.pageSize, this.filterSvc.defaultSortBy, this.filterSvc.defaultSortOrder)
                    }))
                }
            }));
    }
    private firstCategory(): Observable<string> {
        return this.productSvc.httpProxy.netImpl
            .getCategory().pipe(switchMap(next => { return of(next.categoryList[0].title) }))
    }
}
