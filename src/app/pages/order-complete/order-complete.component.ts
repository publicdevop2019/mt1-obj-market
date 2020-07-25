import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CONSTANT_I18N } from 'src/locale/constant';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-order-complete',
    templateUrl: './order-complete.component.html',
    styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {
    constructor(public orderSvc: OrderService, private titleSvc: Title) {
        this.titleSvc.setTitle(CONSTANT_I18N.docTitle + ' ' + CONSTANT_I18N.orderComplete)
    }

    ngOnInit() { }
}
