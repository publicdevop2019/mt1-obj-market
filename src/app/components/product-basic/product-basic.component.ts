import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { notNullAndUndefinedAndEmptyString } from 'src/app/classes/utility';
import { ProductService } from 'src/app/services/product.service';
import { IProductDetail } from '../../pages/product-detail/product-detail.component';

@Component({
    selector: 'app-product-basic',
    templateUrl: './product-basic.component.html',
    styleUrls: ['./product-basic.component.scss']
})
export class ProductBasicComponent implements OnInit {
    @Input() productDetail: IProductDetail;
    public finalPrice: number;
    constructor(public productSvc: ProductService) {}

    ngOnInit() {
        const optionCtrls: any = {};
        this.productDetail.optionsList.forEach(e => {
            optionCtrls[e.title] = new FormControl('', []);
        });
        this.productSvc.formProduct = new FormGroup(optionCtrls);
        this.finalPrice = +this.productDetail.price;
        this.productSvc.formProduct.valueChanges.subscribe(next => {
            this.finalPrice = this.calcTotal();
            this.productSvc.finalPrice = this.finalPrice;
        });
    }

    calcTotal(): number {
        let vars = 0;
        let qty = 1;
        Object.keys(this.productSvc.formProduct.controls).forEach(title => {
            if (
                notNullAndUndefinedAndEmptyString(
                    this.productSvc.formProduct.get(title).value
                )
            ) {
                const var1: string = this.productDetail.optionsList
                    .filter(e => e.title === title)[0]
                    .options.filter(
                        e =>
                            e.option ===
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
        return +((+this.productDetail.price + vars) * qty).toFixed(2);
    }
}
