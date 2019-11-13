import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/components/card-order/card-order.component';
import { HttpProxyService } from 'src/app/services/http-proxy.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    public orders: IOrder[];
    constructor(public httpProxy: HttpProxyService) {
        this.httpProxy.netImpl.getOrders().subscribe(next => {
            this.orders = next;
        });
    }

    ngOnInit() {}
}
