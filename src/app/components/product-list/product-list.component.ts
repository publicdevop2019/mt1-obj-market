import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { switchMap, skip } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { GhostService } from 'src/app/services/ghost.service';
import { IProductSimple } from 'src/app/pages/product-detail/product-detail.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    productListCategory: string;
    constructor(
        public productSvc: ProductService,
        private activatedRoute: ActivatedRoute,
        private ghostSvc: GhostService
    ) {
        this.activatedRoute.data
            .pipe(switchMap((next: Data) => {
                this.productListCategory = next.productListCategory;
                return this.getProductOb();
            }))
            .subscribe(next => {
                this.productSvc.productSimpleList = next;
            });
    }

    ngOnInit() {
        this.ghostSvc.productCardGhostObser.pipe(skip(1))
            .pipe(switchMap(() => {
                this.productSvc.httpProxy.netImpl.pageNumber++;
                return this.getProductOb();
            })).subscribe(next => {
                this.productSvc.productSimpleList.push(...next);
            })
    }
    ngOnDestroy(): void {
        this.productSvc.productSimpleList = [];
    }
    private getProductOb(): Observable<IProductSimple[]> {
        if (this.productListCategory === 'defaultCategory') {
            return this.productSvc.httpProxy.netImpl.getDefaultCategoryProducts();
        } else if (this.productListCategory === 'byCategory') {
            return this.activatedRoute.paramMap.pipe(
                switchMap((params: ParamMap) =>
                    this.productSvc.httpProxy.netImpl.searchByCategory(
                        params.get('category')
                    )
                )
            );
        } else {
            throwError(new Error('unknown page found'));
        }
    }
}
