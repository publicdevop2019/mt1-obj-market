import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-order-complete',
    templateUrl: './order-complete.component.html',
    styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {
    constructor(public orderSvc: OrderService) {}

    ngOnInit() {}
}
