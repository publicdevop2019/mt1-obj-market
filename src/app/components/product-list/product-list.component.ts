import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(
        public productSvc: ProductService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.data
            .pipe(
                switchMap((next: Data) => {
                    if (next.productListCategory === 'top') {
                        return this.productSvc.httpProxy.netImpl.getTopProducts();
                    } else if (next.productListCategory === 'byCategory') {
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
                })
            )
            .subscribe(next => {
                this.productSvc.productSimpleList = next;
            });
    }

    ngOnInit() {}
    ngOnDestroy(): void {
        this.productSvc.productSimpleList = [];
    }
}
