import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    constructor(private httpProxy: HttpProxyService) { }

    public getShippingAddress() {
        return this.httpProxy.getAddresses();
    }
    public getAddressById(id: number): Observable<IAddress> {
        return this.httpProxy.getAddressesById(id);
    }
    public createAddress(address: IAddress): Observable<IAddress> {
        return this.httpProxy.createAddress(address);
    }
    public updateAddress(address: IAddress): Observable<IAddress> {
        return this.httpProxy.updateAddress(address);
    }
    public deleteAddress(id: string): Observable<any> {
        return this.httpProxy.deleteAddress(id);
    }
}
