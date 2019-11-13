import { Injectable } from '@angular/core';
import { IAddress } from '../pages/addresses/addresses.component';
import { IPayment } from '../pages/payments/payments.component';
import { HttpProxyService } from './http-proxy.service';
import { IOrder } from '../components/card-order/card-order.component';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public currentShippingAddress: IAddress;
    public currentPayment: IPayment;
    public justCompletedOrder: IOrder;
    constructor(public httpProxy: HttpProxyService) {}
}
