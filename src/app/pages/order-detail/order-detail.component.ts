import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
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
    // public order: IOrder;
    public editable = false;
    public newOrder = false;
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
                        this.newOrder = true;
                        return of({
                            productList: this.cartSvc.cart,
                            address: this.orderSvc.order.address,
                            paymentType: this.orderSvc.order.paymentType,
                            paymentStatus: 'unpaid'
                        } as IOrder);
                    } else {
                        /** read an existing paid or unpaid order */
                        return this.orderSvc.httpProxy.netImpl.getOrderById(
                            next.get('orderId')
                        );
                    }
                })
            )
            .subscribe(next => {
                this.orderSvc.order = next;
                if (this.orderSvc.order.paymentStatus === 'unpaid')
                    this.editable = true;
            });
    }

    ngOnInit() { }
    public calcTotal(): number {
        let sum = 0;
        this.orderSvc.order.productList.forEach(e => {
            sum = sum + +e.finalPrice;
        });
        this.orderSvc.order.paymentAmt = sum.toFixed(2);
        return +sum.toFixed(2);
    }
    public openAddressPicker() {
        this.bottomSheet.open(BottomSheetAddressPickerComponent);
    }
    public openPaymentPicker() {
        this.bottomSheet.open(BottomSheetPaymentPickerComponent);
    }
    public reserveOrder() {
        let createOrReplaceOrder: Observable<any>;
        if (this.newOrder) {
            createOrReplaceOrder = this.orderSvc.httpProxy.netImpl.reserveOrder(this.orderSvc.order)
        } else {
            createOrReplaceOrder = this.orderSvc.httpProxy.netImpl.replaceOrder(this.orderSvc.order)
        }
        createOrReplaceOrder.subscribe(next => {
            this.cartSvc.cart = [];
            this.orderSvc.paymentLink = next.headers.get('location');
            this.router.navigate(['/payment']);
        });
    }
}
