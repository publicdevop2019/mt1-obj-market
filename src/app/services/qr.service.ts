import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { nullOrUndefined } from '../classes/utility';

@Injectable({
  providedIn: 'root'
})
export class QRService {

  constructor(private router: Router, private orderSvc: OrderService,private snakBarSvc:SnackbarService) { }
  canActivate(): boolean {
    if (nullOrUndefined(this.orderSvc.paymentLink) || this.orderSvc.paymentLink === '') {
      this.snakBarSvc.openSnackBar('payment_link_not_found')
      this.router.navigate(['/home']);
    } else {
      return true
    }
  }
}
