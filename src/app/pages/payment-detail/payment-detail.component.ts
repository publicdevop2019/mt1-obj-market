import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toDataURL } from 'qrcode';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    toDataURL(this.qrFrame.nativeElement as HTMLCanvasElement, this.orderSvc.paymentLink)
  }
  @ViewChild("qrCodeFrame") qrFrame: ElementRef;
  constructor(private orderSvc: OrderService, private router: Router, private bar: SnackbarService) {
  }

  ngOnInit() {
  }
  confirmPayment() {
    this.orderSvc.httpProxy.confirmOrder(this.orderSvc.order.id).subscribe(next => {
      if (next.paymentStatus === true) {
        this.router.navigate(['/order-complete']);
      } else {
        this.bar.openSnackBar('pymt_not_receieved')
      }
    })
  }
}
