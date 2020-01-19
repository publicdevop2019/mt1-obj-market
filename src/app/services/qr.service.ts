import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class QRService {

  constructor(private router: Router, private orderSvc: OrderService) { }
  canActivate(): boolean {
    if (isNullOrUndefined(this.orderSvc.pendingPaymentLink) || this.orderSvc.pendingPaymentLink == '') {
      this.router.navigate(['/home']);
    } else {
      return true
    }
  }
}
