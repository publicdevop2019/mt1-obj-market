import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
export interface IProductSimple {
    imageUrlSmall: string;
    name: string;
    description: string;
    rate?: string;
    price: string;
    sales: string;
    category: string;
    id: string;
}
export interface IProductOptions {
    title: string;
    options: IProductOption[];
}
export interface IProductOption {
    optionValue: string;
    priceVar?: string;
}
export interface IProductDetail extends IProductSimple {
    imageUrlLarge?: string[];
    selectedOptions?: IProductOptions[];
    specification?: string[];
}
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    public productDetail: IProductDetail;
    constructor(
        private activatedRoute: ActivatedRoute,
        private cartSvc: CartService,
        private productSvc: ProductService,
        private snackBarSvc: SnackbarService
    ) {
        this.activatedRoute.paramMap
            .pipe(
                switchMap(next => {
                    return this.productSvc.httpProxy.netImpl.getProductDetailsById(
                        next.get('productId')
                    );
                })
            )
            .subscribe(next => {
                this.productDetail = next;
                this.productSvc.productDetails = next;
            });
    }

    ngOnInit() {}
    public addToCart() {
        this.cartSvc.httpProxy.netImpl
            .addToCart(this.productSvc.extractCartItem())
            .subscribe(next => {
                this.snackBarSvc.openSnackBar('Item added');
            });
    }
}
