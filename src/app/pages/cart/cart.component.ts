import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IProductOptions } from 'src/app/pages/product-detail/product-detail.component';
import { CartService } from 'src/app/services/cart.service';
import { shrinkOutAnimation } from 'src/app/classes/animation';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { Title } from '@angular/platform-browser';
import { CONSTANT_I18N } from 'src/locale/constant';
import * as UUID from 'uuid/v1';
export interface ICartItem {
    /**
     * @note in-memory-web-api works correctly with numeric id, if type string then id need to set to ''
     */
    id: string;
    finalPrice: string;
    /**
     * @note use list instead of key-value pair due to map structure not well supported in both JSON utility and HttpClient
     */
    selectedOptions: IProductOptions[];
    attributesSales: string[]
    attrIdMap: { [key: number]: string }
    imageUrlSmall: string;
    productId: string;
    skuId: string;
    name: string;
    amount: number;
}
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    animations: [shrinkOutAnimation]
})
export class CartComponent {
    public retrieveInProgress = true;
    constructor(
        public cartSvc: CartService,
        private router: Router,
        private autSvc: AuthService,
        private orderSvc: OrderService,
        private titleSvc: Title
    ) {
        this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.cart)
        this.cartSvc.httpProxy.getCartItems().subscribe(next => {
            this.retrieveInProgress = false;
            this.cartSvc.cart = next.data;
        });
    }
    public checkout(): void {
        if (this.autSvc.currentUserAuthInfo) {
            this.orderSvc.changeId = UUID();
            this.router.navigate(['/order']);
        } else {
            /**
             * nav back to cart so there's no need to fetch cart from remote,
             * also animation does not support new object fetch each time
             * e.g. localstorage.getItem(JSON.parse(*))
             */
            sessionStorage.setItem('nextUrl', '/cart');
            this.router.navigate(['/account']);
        }
    }
    public doDelete(id: string) {
        this.cartSvc.httpProxy
            .removeFromCart(id)
            .pipe(
                switchMap(next => {
                    return this.cartSvc.httpProxy.getCartItems();
                })
            )
            .subscribe(next => {
                this.retrieveInProgress = false;
                /**
                 * below is required for animation to work
                 */
                this.cartSvc.cart = this.cartSvc.cart.filter(
                    address => address.id !== id
                );
            });
    }
}
