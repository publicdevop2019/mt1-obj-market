import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IPayment } from 'src/app/pages/payments/payments.component';
import { PaymentService } from 'src/app/services/payment.service';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-bottom-sheet-payment-picker',
    templateUrl: './bottom-sheet-payment-picker.component.html',
    styleUrls: ['./bottom-sheet-payment-picker.component.scss']
})
export class BottomSheetPaymentPickerComponent implements OnInit {
    public payment: IPayment[];
    constructor(
        public paymentSvc: PaymentService,
        private change: ChangeDetectorRef,
        private bottomSheetRef: MatBottomSheetRef<
            BottomSheetPaymentPickerComponent
        >,
        private router: Router,
        private orderSvc: OrderService
    ) {
        this.paymentSvc.getPayments().subscribe(next => {
            this.payment = next;
            this.change.detectChanges();
        });
    }
    public paymentPicked(event: MouseEvent, address: IPayment): void {
        this.orderSvc.currentPayment = address;
        this.router.navigate(['/order']);
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
    public dismiss(): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
    ngOnInit() {}
}
