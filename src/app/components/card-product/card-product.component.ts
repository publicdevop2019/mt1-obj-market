import { Component, OnInit, Input } from '@angular/core';
import { IProductSimple } from '../../pages/product-detail/product-detail.component';

@Component({
    selector: 'app-card-product',
    templateUrl: './card-product.component.html',
    styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
    @Input() public productSimple: IProductSimple;
    constructor() {}

    ngOnInit() {}
}
