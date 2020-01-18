import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-bottom-sheet-payment-picker',
    templateUrl: './bottom-sheet-payment-picker.component.html',
    styleUrls: ['./bottom-sheet-payment-picker.component.scss']
})
export class BottomSheetPaymentPickerComponent implements OnInit {
    constructor(
        private change: ChangeDetectorRef,
        private bottomSheetRef: MatBottomSheetRef<
            BottomSheetPaymentPickerComponent
        >,
        private router: Router,
        private orderSvc: OrderService
    ) {
    }
    public paymentPicked( paymentType: string): void {
        this.router.navigate(['/order']);
        this.bottomSheetRef.dismiss();
        this.orderSvc.currentPaymentType = paymentType;
    }
    ngOnInit() { }
}
