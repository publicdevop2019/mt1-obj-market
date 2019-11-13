import { Injectable } from '@angular/core';
import { HttpProxyService } from './http-proxy.service';
import { IPayment } from '../pages/payments/payments.component';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    constructor(private http: HttpProxyService) {}

    public getPayments(): Observable<IPayment[]> {
        return this.http.netImpl.getPayments();
    }
    public getPaymentById(id: string): Observable<IPayment> {
        return this.http.netImpl.getPayments().pipe(
            switchMap(payments => {
                return of(payments.find(el => el.id === id));
            })
        );
    }
    public createPayment(payment: IPayment): Observable<IPayment> {
        return this.http.netImpl.createPayment(payment);
    }
    public updatePayment(payment: IPayment): Observable<IPayment> {
        return this.http.netImpl.updatePayment(payment);
    }
    public deletePayment(id: string): Observable<any> {
        return this.http.netImpl.deletePayment(id);
    }
}
