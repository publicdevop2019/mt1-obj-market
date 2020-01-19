import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../components/card-order/card-order.component';
import { IAddress } from '../pages/addresses/addresses.component';
import { CartService } from './cart.service';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public currentShippingAddress: IAddress;
    public currentPaymentType: string;
    public pendingPaymentOrder: IOrder;
    public pendingPaymentLink: string;
    constructor(public httpProxy: HttpProxyService, private router: Router, private cartSvc: CartService) { }
    canActivate(): boolean {
        if (this.cartSvc.cart.length > 0) {
            return true
        } else {
            this.router.navigate(['/home']);
        }
    }
    
}
