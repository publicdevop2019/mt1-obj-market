import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from 'src/app/modules/account/addresses/addresses.component';
import { ICartItem } from 'src/app/pages/cart/cart.component';
export interface IOrder {
    id: string;
    paymentAmt:string;
    orderState:string;
    productList: ICartItem[];
    address?: IAddress;
    paymentType?: string; // wechat pay or ali pay
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

}
