import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
export interface IProductSimple {
    imageUrlSmall: string;
    name: string;
    description: string;
    lowestPrice: number;
    totalSales: string;
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
export interface IProductSku {
    attributeSales: string[];
    price: number;
    storageOrder: number;
}
export interface IProductDetail extends IProductSimple {
    imageUrlLarge?: string[];
    selectedOptions?: IProductOptions[];
    specification?: string[];
    skus: IProductSku[],
    attrIdMap: { [key: number]: string }
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

    ngOnInit() { }
    public addToCart() {
        this.cartSvc.httpProxy.netImpl
            .addToCart(this.productSvc.extractCartItem()).pipe(mergeMap(next => {
                this.snackBarSvc.openSnackBar('item_added');
                return this.cartSvc.httpProxy.netImpl.getCartItems()
            }))
            .subscribe(next => {
                this.cartSvc.cart = next;
            });
    }
}
