import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpProxyService } from './http-proxy.service';
import { ICartItem } from '../pages/cart/cart.component';
import {
    IProductDetail,
    IProductOptions,
    IProductSimple
} from '../pages/product-detail/product-detail.component';
import { ICatalogCard } from '../components/catalog-list/catalog-list.component';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public formProductOption: FormGroup;
    public formProductSalesAttr: FormGroup;
    public currentCategory: ICatalogCard;
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
            attrIdMap:this.productDetails.attrIdMap,
            id: ''
        } as ICartItem;
    }
    getSalesAttr(): string[] {
        let sales = this.formProductSalesAttr.value
        return Object.keys(sales).map(key => key + ":" + sales[key]).sort();
    }
    private _getSelectedOptions(): IProductOptions[] {
        return Object.keys(this.formProductOption.controls).map(ctrlKey => {
            return {
                title: ctrlKey,
                options: [
                    {
                        optionValue: this.formProductOption.get(ctrlKey).value
                    }
                ]
            } as IProductOptions;
        });
    }
}
