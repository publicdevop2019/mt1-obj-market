import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { IAddress } from 'src/app/modules/account/addresses/addresses.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Location } from '@angular/common';
@Component({
    selector: 'app-form-address',
    templateUrl: './form-address.component.html',
    styleUrls: ['./form-address.component.scss']
})
export class FormAddressComponent implements OnInit {
    public addAddress = false;
    public addressForm: FormGroup = new FormGroup({
        id: new FormControl('', []),
        country: new FormControl({value:'Canada',disabled:true}, []),
        province: new FormControl('', []),
        city: new FormControl('', []),
        fullName: new FormControl('', []),
        line1: new FormControl('', []),
        line2: new FormControl('', []),
        postalCode: new FormControl('', []),
        phoneNumber: new FormControl('', [])
    });
    constructor(
        private activatedRoute: ActivatedRoute,
        private addressSvc: AddressService,
        private snackBarSvc: SnackbarService,
        private router: Router,
        private location: Location
    ) {
        this.activatedRoute.paramMap.subscribe(next => {
            if (
                next.get('addressId') === null ||
                next.get('addressId') === undefined
            ) {
                this.addAddress = true;
            } else {
                this.addAddress = false;
                this.addressSvc
                    .getAddressById(next.get('addressId'))
                    .subscribe(address => {
                        this._populateAddressFields(address);
                    });
            }
        });
    }

    ngOnInit() {}
    private _populateAddressFields(address: IAddress) {
        this.addressForm.setValue(address);
    }
    public doUpdate() {
        this.addressSvc
            .updateAddress(this.addressForm.getRawValue() as IAddress)
            .subscribe(next => {
                this.router.navigate(['/addresses']);
                this.snackBarSvc.openSnackBar('item_updated');
            });
    }
    public doCreate() {
        this.addressSvc
            .createAddress(this.addressForm.getRawValue() as IAddress)
            .subscribe(next => {
                this.location.back();
                this.snackBarSvc.openSnackBar('item_added');
            });
    }
}
