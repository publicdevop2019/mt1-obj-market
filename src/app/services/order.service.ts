import { Injectable } from '@angular/core';
import { IOrder } from '../components/card-order/card-order.component';
import { IAddress } from '../pages/addresses/addresses.component';
import { IPayment } from '../pages/payments/payments.component';
import { CartService } from './cart.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public currentShippingAddress: IAddress;
    public currentPayment: IPayment;
    public justCompletedOrder: IOrder;
    constructor(public httpProxy: HttpProxyService, private router: Router, private cartSvc: CartService) { }
    canActivate(): boolean {
        if (this.cartSvc.cart.length > 0) {
            return true
        } else {
            this.router.navigate(['/home']);
        }
    }
}
