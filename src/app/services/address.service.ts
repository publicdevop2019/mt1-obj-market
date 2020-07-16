import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    constructor(private httpProxy: HttpProxyService) {}

    public getShippingAddress(): Observable<IAddress[]> {
        return this.httpProxy.getAddresses();
    }
    public getAddressById(id: string): Observable<IAddress> {
        return this.httpProxy.getAddresses().pipe(
            switchMap(addresses => {
                return of(addresses.find(el => el.id.toString() === id));
            })
        );
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
