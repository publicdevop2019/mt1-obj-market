import { Component, OnInit, ElementRef, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, mergeMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ProductListService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Title } from '@angular/platform-browser';
import { CONSTANT_I18N } from 'src/locale/constant';
import { ICartItem } from '../cart/cart.component';
export interface IProductSimple {
    imageUrlSmall: string;
    name: string;
    description: string;
    lowestPrice: number;
    totalSales: number;
    id: number;
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
    attributesSales: string[];
    price: number;
    storage: number;
}
export interface IProductDetail extends IProductSimple {
    imageUrlLarge?: string[];
    selectedOptions?: IProductOptions[];
    specification?: string[];
    skus: IProductSku[],
    storage?: number,
    attrIdMap: { [key: number]: string }
    attributeSaleImages?: IAttrImage[]
}
export interface IAttrImage {
    attributeSales: string,
    imageUrls: string[]
}
@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    @ViewChild("product") product: ElementRef;
    public cartItem: ICartItem;
    public productDetail: IProductDetail;
    constructor(
        private activatedRoute: ActivatedRoute,
        private cartSvc: CartService,
        private productListSvc: ProductListService,
        private snackBarSvc: SnackbarService,
        private titleSvc: Title,
        @Inject(LOCALE_ID) locale: string,
    ) {
        this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.productDetail)
        this.activatedRoute.paramMap
            .pipe(
                switchMap(next => {
                    return this.productListSvc.httpProxy.getProductDetailsById(
                        next.get('productId')
                    );
                })
            )
            .subscribe(next => {
                const popupEl = document.createElement('mt-wc-product');
                (popupEl as any).productDetail = next;
                (popupEl as any).locale = locale.replace('-','');
                (popupEl as any).imgSize = '100vw';
                this.productDetail = next;
                popupEl.addEventListener('valueChanged', (e) => {
                    this.cartItem = (e as CustomEvent).detail;
                });
                this.product.nativeElement.appendChild(popupEl)
                this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.productDetail + ' ' + next.name)
            });
    }
    ngOnInit() { }
    public addToCart() {
        this.cartSvc.httpProxy
            .addToCart(this.cartItem).pipe(mergeMap(next => {
                this.snackBarSvc.openSnackBar('item_added');
                return this.cartSvc.httpProxy.getCartItems()
            }))
            .subscribe(next => {
                this.cartSvc.cart = next.data;
            });
    }
}
