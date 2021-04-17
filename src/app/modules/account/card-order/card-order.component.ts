import { Component, Input, OnInit } from '@angular/core';
import { IAddress } from 'src/app/modules/account/addresses/addresses.component';
import { ICartItem } from 'src/app/pages/cart/cart.component';
import { CONSTANT_I18N } from 'src/locale/constant';
export interface IOrder {
    id: string;
    paymentAmt:number;
    paid:boolean;
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
    public CONST_I18N=CONSTANT_I18N;
    constructor() {}

    ngOnInit() {}

}
