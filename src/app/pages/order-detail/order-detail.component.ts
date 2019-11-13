import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { notNullAndUndefined } from 'src/app/classes/utility';
import { BottomSheetAddressPickerComponent } from 'src/app/components/bottom-sheet-address-picker/bottom-sheet-address-picker.component';
import { BottomSheetPaymentPickerComponent } from 'src/app/components/bottom-sheet-payment-picker/bottom-sheet-payment-picker.component';
import { IOrder } from 'src/app/components/card-order/card-order.component';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
    public order: IOrder;
    public editable = false;
    constructor(
        private cartSvc: CartService,
        private bottomSheet: MatBottomSheet,
        public orderSvc: OrderService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.paramMap
            .pipe(
                switchMap(next => {
                    if (!notNullAndUndefined(next.get('orderId'))) {
                        /** create a new order */
                        this.editable = true;
                        return of({
                            cart: this.cartSvc.cart,
                            shippingAddress: this.orderSvc
                                .currentShippingAddress,
                            payment: this.orderSvc.currentPayment,
                            shippingCost: '0',
                            taxCost: '0'
                        } as IOrder);
                    } else {
                        /** read an existing order */
                        this.editable = false;
                        return this.orderSvc.httpProxy.netImpl.getOrderById(
                            next.get('orderId')
                        );
                    }
                })
            )
            .subscribe(next => {
                this.order = next;
            });
    }

    ngOnInit() {}
    public calcTotal(): number {
        return +(
            this.calcSubtotal() +
            +this.order.shippingCost +
            +this.order.taxCost
        ).toFixed(2);
    }
    public calcSubtotal(): number {
        let sum = 0;
        this.order.cart.forEach(e => {
            sum = sum + +e.finalPrice;
        });
        return +sum.toFixed(2);
    }
    public openAddressPicker() {
        this.bottomSheet.open(BottomSheetAddressPickerComponent);
    }
    public openPaymentPicker() {
        this.bottomSheet.open(BottomSheetPaymentPickerComponent);
    }
    public placeOrder() {
        /**
         * update order info
         */
        this.order.shippingAddress = this.orderSvc.currentShippingAddress;
        this.order.payment = this.orderSvc.currentPayment;
        this.orderSvc.httpProxy.netImpl
            .createOrder(this.order)
            .subscribe(next => {
                this.cartSvc.cart = [];
                this.orderSvc.justCompletedOrder = this.order;
                this.orderSvc.justCompletedOrder.id = next.id;
                this.router.navigate(['/order-complete']);
            });
    }
}
