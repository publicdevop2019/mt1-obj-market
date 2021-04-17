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
  constructor(private orderSvc: OrderService, private router: Router, private bar: SnackbarService, private titleSvc: Title) {
    this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.paymentDetail)
  }
  @ViewChild('qrCodeFrame') qrFrame: ElementRef;
  ngAfterViewInit(): void {
    toDataURL(this.qrFrame.nativeElement as HTMLCanvasElement, this.orderSvc.paymentLink)
  }

  ngOnInit() {
  }
  confirmPayment() {
    const orderId = this.orderSvc.paymentLink;
    // const orderId = this.extractOrderIdFromPaymentLink(this.orderSvc.paymentLink);
    console.dir(orderId)
    this.orderSvc.httpProxy.confirmOrder(orderId).subscribe(next => {
      if (next.paymentStatus === true) {
        this.router.navigate(['/order-complete']);
      } else {
        this.bar.openSnackBar('pymt_not_receieved')
      }
    })
  }
  private extractOrderIdFromPaymentLink(paymentLink: string) {
    const start = paymentLink.indexOf('product_id')
    const searchStr = paymentLink.substr(start)
    return searchStr.substring(searchStr.indexOf('=') + 1, searchStr.indexOf('&'))
  }
}
