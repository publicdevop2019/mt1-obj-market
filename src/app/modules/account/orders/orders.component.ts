import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/modules/account/card-order/card-order.component';
import { HttpProxyService } from 'src/app/services/http-proxy.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    public orderTotal: IOrder[];
    public paiedOrders: IOrder[];
    public unpaiedOrders: IOrder[];
    constructor(public httpProxy: HttpProxyService) {
        this.httpProxy.getOrders().subscribe(next => {
            this.orderTotal = next;
            this.paiedOrders = this.orderTotal.filter(e => e.orderState.indexOf('NOT_PAID') === -1);
            this.unpaiedOrders = this.orderTotal.filter(e => e.orderState.indexOf('NOT_PAID') > -1);
        });
    }

    ngOnInit() { }
}
