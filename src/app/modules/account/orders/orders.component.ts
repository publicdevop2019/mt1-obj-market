import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/modules/account/card-order/card-order.component';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { CONSTANT_I18N } from 'src/locale/constant';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    public orderTotal: IOrder[];
    public paiedOrders: IOrder[];
    public unpaiedOrders: IOrder[];
    constructor(public httpProxy: HttpProxyService, private titleSvc: Title) {
        this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.account + ' ' + CONSTANT_I18N.orders)
        this.httpProxy.getOrders().subscribe(next => {
            this.orderTotal = next.data;
            this.paiedOrders = this.orderTotal.filter(e => e.orderState.indexOf('NOT_PAID') === -1);
            this.unpaiedOrders = this.orderTotal.filter(e => e.orderState.indexOf('NOT_PAID') > -1);
        });
    }

    ngOnInit() { }
}
