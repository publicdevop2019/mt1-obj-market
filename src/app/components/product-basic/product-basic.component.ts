import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { notNullAndUndefinedAndEmptyString } from 'src/app/classes/utility';
import { ProductService } from 'src/app/services/product.service';
import { IProductDetail } from '../../pages/product-detail/product-detail.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-basic',
    templateUrl: './product-basic.component.html',
    styleUrls: ['./product-basic.component.scss']
})
export class ProductBasicComponent implements OnInit {
    @Input() productDetail: IProductDetail;
    public imageUrlPrefix: string = environment.imageUrl + '/'
    constructor(public productSvc: ProductService) { }

    ngOnInit() {
        const optionCtrls: any = {};
        if (this.productDetail.selectedOptions)
            this.productDetail.selectedOptions.forEach(e => {
                optionCtrls[e.title] = new FormControl('', []);
            });
        this.productSvc.formProduct = new FormGroup(optionCtrls);
        this.productSvc.formProduct.addControl('salesAttr', new FormControl())
        this.productSvc.finalPrice = +this.productDetail.lowestPrice;
        this.productSvc.formProduct.valueChanges.subscribe(next => {
            this.productSvc.finalPrice = this.calcTotal();
        });
    }

    calcTotal(): number {
        let vars = 0;
        let qty = 1;
        let basePrice = +this.productDetail.lowestPrice
        Object.keys(this.productSvc.formProduct.controls).filter(e => e !== 'salesAttr').forEach(title => {
            if (
                notNullAndUndefinedAndEmptyString(
                    this.productSvc.formProduct.get(title).value
                )
            ) {
                const var1: string = this.productDetail.selectedOptions
                    .filter(e => e.title === title)[0]
                    .options.filter(
                        e =>
                            e.optionValue ===
                            this.productSvc.formProduct.get(title).value
                    )[0].priceVar;
                if (var1.indexOf('+') > -1) {
                    vars = vars + +var1.replace('+', '');
                } else if (var1.indexOf('-') > -1) {
                    vars = vars - +var1.replace('-', '');
                } else if (var1.indexOf('x') > -1) {
                    qty = +var1.replace('x', '');
                } else {
                    throw new Error(
                        "unrecognized operator, should be one of '-', '+', 'x'"
                    );
                }
            }
        });
        if (this.productSvc.formProduct.get('salesAttr').value)
            basePrice = this.productDetail.skus.filter(e => e.attributeSales == this.productSvc.formProduct.get('salesAttr').value)[0].price
        return +((+basePrice + vars) * qty).toFixed(2);
    }
}
