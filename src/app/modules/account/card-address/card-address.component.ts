import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAddress } from 'src/app/modules/account/addresses/addresses.component';

@Component({
    selector: 'app-card-address',
    templateUrl: './card-address.component.html',
    styleUrls: ['./card-address.component.scss']
})
export class CardAddressComponent implements OnInit {
    @Input() address: IAddress;
    @Input() editable = false;
    @Output() deleted = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}
    public emitEvent() {
        this.deleted.emit();
    }
}
