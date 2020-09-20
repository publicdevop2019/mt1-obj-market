import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../modules/account/card-order/card-order.component';
import { CartService } from './cart.service';
import { HttpProxyService } from './http-proxy.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public order: IOrder = <IOrder>{};
    public changeId:string;
    public paymentLink: string;
    public scrollTop: Subject<void> = new Subject();
    constructor(public httpProxy: HttpProxyService, private router: Router, private cartSvc: CartService) { }
    canActivate(): boolean {
        if (this.cartSvc.cart.length > 0) {
            return true
        } else {
            this.router.navigate(['/home']);
        }
    }

}
