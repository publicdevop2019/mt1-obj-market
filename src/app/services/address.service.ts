import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IAddress } from '../pages/addresses/addresses.component';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    constructor(private http: HttpProxyService) {}

    public getShippingAddress(): Observable<IAddress[]> {
        return this.http.netImpl.getAddresses();
    }
    public getAddressById(id: string): Observable<IAddress> {
        return this.http.netImpl.getAddresses().pipe(
            switchMap(addresses => {
                return of(addresses.find(el => el.id === id));
            })
        );
    }
    public createAddress(address: IAddress): Observable<IAddress> {
        return this.http.netImpl.createAddress(address);
    }
    public updateAddress(address: IAddress): Observable<IAddress> {
        return this.http.netImpl.updateAddress(address);
    }
    public deleteAddress(id: string): Observable<any> {
        return this.http.netImpl.deleteAddress(id);
    }
}
