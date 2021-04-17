import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { notNullAndUndefined } from 'src/app/classes/utility';
import { IOrder } from 'src/app/modules/account/card-order/card-order.component';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { BottomSheetAddressPickerComponent } from '../bottom-sheet-address-picker/bottom-sheet-address-picker.component';
import { BottomSheetPaymentPickerComponent } from '../bottom-sheet-payment-picker/bottom-sheet-payment-picker.component';
import { Title } from '@angular/platform-browser';
import { CONSTANT_I18N } from 'src/locale/constant';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
    public editable = false;
    public newOrder = false;
    constructor(
        private cartSvc: CartService,
        private bottomSheet: MatBottomSheet,
        public orderSvc: OrderService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleSvc: Title
    ) {
        this.orderSvc.order = {} as IOrder;
        this.activatedRoute.paramMap
            .pipe(
                switchMap(next => {
                    if (!notNullAndUndefined(next.get('orderId'))) {
                        /** create a new order */
                        this.newOrder = true;
                        this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.account + ' ' + CONSTANT_I18N.newOrders)
                        return of({
                            productList: this.cartSvc.cart,
                            address: this.orderSvc.order.address,
                            paymentType: this.orderSvc.order.paymentType,
                            orderState: 'DRAFT',
                            id: this.orderSvc.order.id,
                        } as IOrder);
                    } else {
                        /** read an existing paid or unpaid order */
                        this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.account 
                        + ' ' + CONSTANT_I18N.ordersDetail + ' ' + next.get('orderId'));
                        return this.orderSvc.httpProxy.getOrderById(
                            next.get('orderId')
                        );
                    }
                })
            )
            .subscribe(next => {
                this.orderSvc.order = next;
                if (this.orderSvc.order.orderState.indexOf('DRAFT') > -1) {
                    this.editable = true;
                }
            });
    }

    ngOnInit() { }
    public calcTotal(): string {
        let sum = 0;
        this.orderSvc.order.productList.forEach(e => {
            sum = sum + +e.finalPrice;
        });
        this.orderSvc.order.paymentAmt = sum;
        return (+sum).toFixed(2);
    }
    public openAddressPicker() {
        const config = new MatBottomSheetConfig();
        config.data = { context: this.newOrder ? 'new' : 'update' };
        this.bottomSheet.open(BottomSheetAddressPickerComponent,config);
    }
    public openPaymentPicker() {
        this.bottomSheet.open(BottomSheetPaymentPickerComponent);
    }
    public reserveOrder() {
        this.orderSvc.scrollTop.next();
        let createOrReplaceOrder: Observable<any>;
        if (this.newOrder) {
            createOrReplaceOrder = this.orderSvc.httpProxy.createOrder(this.orderSvc.order, this.orderSvc.changeId)
        } else {
            createOrReplaceOrder = this.orderSvc.httpProxy.reserveOrder(this.orderSvc.order)
        }
        createOrReplaceOrder.subscribe(next => {
            this.cartSvc.cart = [];
            this.orderSvc.paymentLink = next.headers.get('location');
            this.router.navigate(['/payment']);
        });
    }
}
