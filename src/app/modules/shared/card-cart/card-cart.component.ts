import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartItem } from 'src/app/pages/cart/cart.component';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-card-cart',
    templateUrl: './card-cart.component.html',
    styleUrls: ['./card-cart.component.scss']
})
export class CardCartComponent implements OnInit {
    @Input() cartItemDetails: ICartItem;
    @Input() editable = false;
    @Output() deleted = new EventEmitter<void>();
    public imageUrlPrefix: string = environment.imageUrl + '/'
    constructor() { }

    ngOnInit() { }
    public emitEvent() {
        this.deleted.emit();
    }
    getImageUrl(url: string) {
        if (url.includes('http')) {
            return url
        } else {
            return this.imageUrlPrefix + url
        }
    }
    parseSku(sku: string) {
        return this.cartItemDetails.attrIdMap[sku.split(':')[0]] + ':' + sku.split(':')[1];
    }
    parseFinalPrice(price:string){
        return (+price).toFixed(2)
    }
}
