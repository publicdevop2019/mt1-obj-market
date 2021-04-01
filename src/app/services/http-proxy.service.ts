import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalogNet } from '../components/catalog-list/catalog-list.component';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { IOrder } from '../modules/account/card-order/card-order.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IProductDetail, IProductSimple } from '../pages/product-detail/product-detail.component';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { IFilterDetails } from './filter.service';
import * as UUID from 'uuid/v1';
export interface ISumRep<T> {
    data: T[];
    totalItemCount: number;
}
export interface IProductSimpleNet extends ISumRep<IProductSimple> {
}
export interface ICartResp extends ISumRep<ICartItem> {
}
export interface IAddressResp extends ISumRep<IAddress> {
}
export interface IOrderResp extends ISumRep<IOrder> {
}
@Injectable({
    providedIn: 'root'
})
export class HttpProxyService {
    public inProgress = false;
    constructor(public httpClient: HttpClient, public authSvc: AuthService, private themeSvc: ThemeService) { }
    searchProduct(key: string, pageNumber: number, pageSize: number): Observable<IProductSimpleNet> {
        return this.httpClient.get<IProductSimpleNet>(environment.productUrl
            + '/products/public?query=name:' + key + '&page=num:' + pageNumber + ',size:' + pageSize);
    };
    getFilterForCatalog(id: number) {
        return this.httpClient.get<IFilterDetails>(environment.productUrl + '/filters/public?query=catalog:' + id);
    }
    getCatalog(): Observable<ICatalogNet> {
        return this.httpClient.get<ICatalogNet>(
            environment.productUrl + '/catalogs/public'
        );
    }
    removeFromCart(id: string): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.delete(environment.profileUrl + '/cart/user/' + id, { headers: headerConfig });
    }
    getCartItems(): Observable<ICartResp> {
        if (this.themeSvc.isBrowser) {
            return this.httpClient.get<ICartResp>(
                environment.profileUrl + '/cart/user'
            );
        }
        return of({ data: [], totalItemCount: 0 })
    }
    addToCart(item: ICartItem): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        if (item.attributesSales.length === 1 && item.attributesSales[0] === ':')
            delete item.attributesSales
        return this.httpClient.post(environment.profileUrl + '/cart/user', item, { headers: headerConfig });
    }

    createOrder(order: IOrder, changeId: string): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', changeId)
        return this.httpClient.post(environment.profileUrl + '/orders/user', order, { headers: headerConfig, observe: 'response' });
    }
    reserveOrder(order: IOrder): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.put(environment.profileUrl
            + '/orders/user/' + order.id + '/reserve', null, { headers: headerConfig, observe: 'response' });
    };
    updateOrderAddress(order: IOrder, newAddress: IAddress): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.put(environment.profileUrl
            + '/orders/user/' + order.id, newAddress, { headers: headerConfig, observe: 'response' });
    };
    confirmOrder(orderId: string): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.put(environment.profileUrl
            + '/orders/user/' + orderId + '/confirm', null, { headers: headerConfig });
    };
    getOrderById(id: string): Observable<IOrder> {
        return this.httpClient.get<IOrder>(
            environment.profileUrl + '/orders/user/' + id
        );
    }
    getOrders(): Observable<IOrderResp> {
        if (this.themeSvc.isBrowser) {
            return this.httpClient.get<IOrderResp>(
                environment.profileUrl + '/orders/user'
            );
        }
        return of({ data: [], totalItemCount: 0 })
    }
    updateAddress(address: IAddress): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.put(
            environment.profileUrl + '/addresses/user/' + address.id,
            address, { headers: headerConfig }
        );
    }
    createAddress(address: IAddress): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.post(
            environment.profileUrl + '/addresses/user',
            address, { headers: headerConfig }
        );
    }
    getAddresses(): Observable<IAddressResp> {
        if (this.themeSvc.isBrowser) {
            return this.httpClient.get<IAddressResp>(
                environment.profileUrl + '/addresses/user'
            );
        }
        return of({ data: [], totalItemCount: 0 })
    }
    getAddressesById(id: number): Observable<IAddress> {
        return this.httpClient.get<IAddress>(
            environment.profileUrl + '/addresses/user/' + id
        );
    }
    deleteAddress(id: string): Observable<any> {
        let headerConfig = new HttpHeaders();
        headerConfig = headerConfig.set('changeId', UUID())
        return this.httpClient.delete(
            environment.profileUrl + '/addresses/user/' + id, { headers: headerConfig }
        );
    }
    searchByAttributes(attributesKey: string[], pageNum: number, pageSize: number,
        sortBy: string, sortOrder: string): Observable<IProductSimpleNet> {
        return this.httpClient
            .get<IProductSimpleNet>(environment.productUrl + '/products/public'
                + this.getSearchParam(attributesKey) + '&page=num:' + pageNum + ',size:' + pageSize + ',by:' + sortBy + ',order:' + sortOrder);
    }
    private getSearchParam(attr: string[]): string {
        return '?query=attr:' + attr.map(e => e.replace(':', '-')).join('$')
    }
    getProductDetailsById(productId: string): Observable<IProductDetail> {
        return this.httpClient.get<IProductDetail>(
            environment.productUrl + '/products/public/' + productId
        );
    }
}
