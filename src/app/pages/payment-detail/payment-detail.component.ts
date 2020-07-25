import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toDataURL } from 'qrcode';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Title } from '@angular/platform-browser';
import { CONSTANT_I18N } from 'src/locale/constant';
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
  constructor(private orderSvc: OrderService, private router: Router, private bar: SnackbarService, private titleSvc: Title) {
    this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.paymentDetail)
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
