import { Injectable } from '@angular/core';
import { ICartItem } from '../pages/cart/cart.component';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart: ICartItem[] = [];
    constructor(public httpProxy: HttpProxyService) {}
}
