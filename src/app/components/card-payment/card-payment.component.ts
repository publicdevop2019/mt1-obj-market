import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPayment } from 'src/app/pages/payments/payments.component';

@Component({
    selector: 'app-card-payment',
    templateUrl: './card-payment.component.html',
    styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {
    @Input() payment: IPayment;
    @Input() editable = false;
    @Output() deleted = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}
    public emitEvent() {
        this.deleted.emit();
    }
}
