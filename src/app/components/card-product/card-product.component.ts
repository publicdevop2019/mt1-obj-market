import { Component, OnInit, Input } from '@angular/core';
import { IProductSimple } from '../../pages/product-detail/product-detail.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-card-product',
    templateUrl: './card-product.component.html',
    styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
    @Input() public productSimple: IProductSimple;
    public imageUrlPrefix: string = environment.imageUrl + '/'
    constructor() { }

    ngOnInit() { }
    getImageUrl(url: string) {
        if (url.includes('http')) {
            return url
        } else {
            return this.imageUrlPrefix + url
        }
    }
}
