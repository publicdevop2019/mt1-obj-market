import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpProxyService } from './http-proxy.service';
import { ICartItem } from '../pages/cart/cart.component';
import {
    IProductDetail,
    IProductOptions,
    IProductSimple
} from '../pages/product-detail/product-detail.component';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public productSimpleList: IProductSimple[];
    public formProduct: FormGroup;
    public currentCategory: string;
    public productDetails: IProductDetail;
    public finalPrice: number;
    constructor(public httpProxy: HttpProxyService) {}
    extractCartItem(): ICartItem {
        return {
            finalPrice: this.finalPrice.toString(),
            selectedOptions: this._getSelectedOptions(),
            imageUrlSmall: this.productDetails.imageUrlSmall,
            productId: this.productDetails.id,
            name: this.productDetails.name,
            id: ''
        } as ICartItem;
    }
    private _getSelectedOptions(): IProductOptions[] {
        return Object.keys(this.formProduct.controls).map(ctrlKey => {
            return {
                title: ctrlKey,
                options: [
                    {
                        optionValue: this.formProduct.get(ctrlKey).value
                    }
                ]
            } as IProductOptions;
        });
    }
}
