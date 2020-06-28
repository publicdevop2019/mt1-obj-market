import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpProxyService } from './http-proxy.service';
import { ICartItem } from '../pages/cart/cart.component';
import {
    IProductDetail,
    IProductOptions,
    IProductSimple
} from '../pages/product-detail/product-detail.component';
import { ICategoryCard } from '../components/category-list/category-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public productSimpleList: IProductSimple[] = [];
    public formProduct: FormGroup;
    public currentCategory: ICategoryCard;
    public productDetails: IProductDetail;
    public finalPrice: number;
    constructor(public httpProxy: HttpProxyService) { }
    extractCartItem(): ICartItem {
        return {
            finalPrice: this.finalPrice.toString(),
            selectedOptions: this._getSelectedOptions(),
            imageUrlSmall: this.productDetails.imageUrlSmall,
            productId: this.productDetails.id,
            name: this.productDetails.name,
            attributesSales: this.getSalesAttr(),
            id: ''
        } as ICartItem;
    }
    getSalesAttr(): string[] {
        return this.formProduct.get('salesAttr').value
    }
    private _getSelectedOptions(): IProductOptions[] {
        return Object.keys(this.formProduct.controls).filter(e => e !== 'salesAttr').map(ctrlKey => {
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
