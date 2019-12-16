import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from 'src/app/pages/addresses/addresses.component';
import { ICartItem } from 'src/app/pages/cart/cart.component';
import { IPayment } from 'src/app/pages/payments/payments.component';
export interface IOrder {
    id: string;
    productList: ICartItem[];
    address: IAddress;
    payment: IPayment;
    shippingCost: string;
    taxCost: string;
    additionalFees:any
    finalPrice:string;
    totalProductPrice:string;
}
@Component({
    selector: 'app-card-order',
    templateUrl: './card-order.component.html',
    styleUrls: ['./card-order.component.scss']
})
export class CardOrderComponent implements OnInit {
    @Input() order: IOrder;
    constructor() {}

    ngOnInit() {}

    /**
     * @todo @copied from order-details
     */
    public calcTotal(): number {
        return (
            this.calcSubtotal() + +this.order.shippingCost + +this.order.taxCost
        );
    }

    /**
     * @todo @copied from order-details
     */
    public calcSubtotal(): number {
        let sum = 0;
        this.order.productList.forEach(e => {
            sum = sum + +e.finalPrice;
        });
        return sum;
    }
}
