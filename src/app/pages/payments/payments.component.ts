import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { switchMap } from 'rxjs/operators';
import { shrinkOutAnimation } from 'src/app/classes/animation';
export interface IPayment {
    id: string;
    type: string;
    accountNumber: string;
    accountHolderName: string;
    expireDate: string;
    cvv?: string;
}
@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
    animations: [shrinkOutAnimation]
})
export class PaymentsComponent implements OnInit {
    public payment: IPayment[];
    constructor(private paymentSvc: PaymentService) {
        this.paymentSvc.getPayments().subscribe(next => {
            this.payment = next;
        });
    }

    ngOnInit() {}
    public doDelete(id: string) {
        this.paymentSvc
            .deletePayment(id)
            .pipe(
                switchMap(next => {
                    return this.paymentSvc.getPayments();
                })
            )
            .subscribe(next => {
                /**
                 * below is required for animation to work
                 */
                this.payment = this.payment.filter(
                    payment => payment.id !== id
                );
            });
    }
}
