import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { IPayment } from 'src/app/pages/payments/payments.component';
import { Location } from '@angular/common';
@Component({
    selector: 'app-form-payment',
    templateUrl: './form-payment.component.html',
    styleUrls: ['./form-payment.component.scss']
})
export class PaymentFormComponent implements OnInit {
    public addPayment = false;
    public paymentForm: FormGroup = new FormGroup({
        id: new FormControl('', []),
        accountNumber: new FormControl('', []),
        accountHolderName: new FormControl('', []),
        expireDate: new FormControl('', []),
        cvv: new FormControl('', [])
    });
    constructor(
        private activatedRoute: ActivatedRoute,
        private paymentSvc: PaymentService,
        private snackBarSvc: SnackbarService,
        private router: Router,
        private location: Location
    ) {
        this.activatedRoute.paramMap.subscribe(next => {
            if (
                next.get('paymentId') === null ||
                next.get('paymentId') === undefined
            ) {
                this.addPayment = true;
            } else {
                this.addPayment = false;
                this.paymentSvc
                    .getPaymentById(next.get('paymentId'))
                    .subscribe(payment => {
                        this._populatePaymentFields(payment);
                    });
            }
        });
    }

    ngOnInit() {}
    private _populatePaymentFields(payment: IPayment) {
        this.paymentForm.setValue(payment);
    }
    public doUpdate() {
        this.paymentSvc
            .updatePayment(this.paymentForm.getRawValue() as IPayment)
            .subscribe(next => {
                this.router.navigate(['/payments']);
                this.snackBarSvc.openSnackBar('Payment updated');
            });
    }
    public doCreate() {
        this.paymentSvc
            .createPayment(this.paymentForm.getRawValue() as IPayment)
            .subscribe(next => {
                this.location.back();
                this.snackBarSvc.openSnackBar('Payment added');
            });
    }
}
