import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IAddress } from 'src/app/pages/addresses/addresses.component';
import { AddressService } from 'src/app/services/address.service';
import { MatBottomSheetRef } from '@angular/material';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'app-bottom-sheet-address-picker',
    templateUrl: './bottom-sheet-address-picker.component.html',
    styleUrls: ['./bottom-sheet-address-picker.component.scss']
})
export class BottomSheetAddressPickerComponent implements OnInit {
    public address: IAddress[];
    constructor(
        public addressSvc: AddressService,
        private change: ChangeDetectorRef,
        private bottomSheetRef: MatBottomSheetRef<
            BottomSheetAddressPickerComponent
        >,
        private router: Router,
        private orderSvc: OrderService
    ) {
        this.addressSvc.getShippingAddress().subscribe(next => {
            this.address = next;
            this.change.detectChanges();
        });
    }
    public addressPicked(event: MouseEvent, address: IAddress): void {
        this.orderSvc.currentShippingAddress = address;
        this.router.navigate(['/order']);
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
    public dismiss(): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
    ngOnInit() {}
}
