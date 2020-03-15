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
    let orderId = this.extractOrderIdFromPaymentLink(this.orderSvc.paymentLink);
    this.orderSvc.order.id = orderId;
    this.orderSvc.httpProxy.netImpl.confirmOrder(orderId).subscribe(next => {
      if (next.paymentStatus === true) {
        this.router.navigate(['/order-complete']);
      } else {
        this.bar.openSnackBar('looks like we did not receieve your payment')
      }
    })
  }
  private extractOrderIdFromPaymentLink(paymentLink: string) {
    let start = paymentLink.indexOf('product_id')
    let searchStr = paymentLink.substr(start)
    return searchStr.substring(searchStr.indexOf('=') + 1, searchStr.indexOf('&'))
  }
}
