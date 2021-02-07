import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-bottom-sheet-payment-picker',
    templateUrl: './bottom-sheet-payment-picker.component.html',
    styleUrls: ['./bottom-sheet-payment-picker.component.scss']
})
export class BottomSheetPaymentPickerComponent implements OnInit {
    constructor(
        private bottomSheetRef: MatBottomSheetRef<
            BottomSheetPaymentPickerComponent
        >,
        private orderSvc: OrderService
    ) {
    }
    public paymentPicked(paymentType: string): void {
        this.bottomSheetRef.dismiss();
        this.orderSvc.order.paymentType = paymentType;
    }
    ngOnInit() { }
}
