import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalogNet } from '../components/catalog-list/catalog-list.component';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { IOrder } from '../modules/account/card-order/card-order.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IProductDetail, IProductSimple } from '../pages/product-detail/product-detail.component';
import { AuthService } from '../services/auth.service';
import { INet, IProductSimpleNet } from './net.interface';
import { ThemeService } from '../services/theme.service';
/**
 * only send http request if running in browser
 */
export class OnlineNetImpl implements INet {
    constructor(public httpClient: HttpClient, public authSvc: AuthService, private themeSvc: ThemeService) { }
    searchProduct(key: string, pageNumber: number, pageSize: number): Observable<IProductSimple[]> {
        return this.httpClient.get<IProductSimple[]>(environment.productUrl + '/productDetails/search?key=' + key + '&pageNum=' + pageNumber + '&pageSize=' + pageSize);
    };
    createProfile(): Observable<any> {
        return this.httpClient.post(environment.profileUrl + '/profiles', null, { observe: 'response' });
    };
    searchProfile(): Observable<string> {
        return this.httpClient.get<string>(environment.profileUrl + '/profiles/search');
    };
    getCatalog(): Observable<ICatalogNet> {
        return this.httpClient.get<ICatalogNet>(
            environment.productUrl + '/public/catalogs'
        );
    }
    removeFromCart(id: string): Observable<any> {
        return this.httpClient.delete(environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/cart/' + id);
    }
    getCartItems(): Observable<ICartItem[]> {
        if (this.themeSvc.isBrowser)
            return this.httpClient.get<ICartItem[]>(
                environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/cart'
            );
        return of([])
    }
    addToCart(item: ICartItem): Observable<any> {
        return this.httpClient.post(environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/cart', item);
    }
    reserveOrder(order: IOrder): Observable<any> {
        return this.httpClient.post(environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/orders/' + order.id, order, { observe: 'response' });
    }
    replaceOrder(order: IOrder): Observable<any> {
        return this.httpClient.put(environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/orders/' + order.id + '/replace', order, { observe: 'response' });
    };
    getOrderId(): Observable<any> {
        return this.httpClient.get(environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/orders/id', { observe: 'response' });
    };
    confirmOrder(orderId: string): Observable<any> {
        return this.httpClient.get(environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/orders/' + orderId + '/confirm');
    };
    getOrderById(id: string): Observable<IOrder> {
        return this.httpClient.get<IOrder>(
            environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/orders/' + id
        );
    }
    getOrders(): Observable<IOrder[]> {
        if (this.themeSvc.isBrowser)
            return this.httpClient.get<IOrder[]>(
                environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/orders'
            );
        return of([])
    }
    updateAddress(address: IAddress): Observable<any> {
        return this.httpClient.put(
            environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/addresses/' + address.id,
            address
        );
    }
    createAddress(address: IAddress): Observable<any> {
        return this.httpClient.post(
            environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/addresses',
            address
        );
    }
    getAddresses(): Observable<IAddress[]> {
        if (this.themeSvc.isBrowser)
            return this.httpClient.get<IAddress[]>(
                environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/addresses'
            );
        return of([])
    }
    deleteAddress(id: string): Observable<any> {
        return this.httpClient.delete(
            environment.profileUrl + '/profiles/' + this.authSvc.userProfileId + '/addresses/' + id
        );
    }
    searchByCatalog(attributesKey: string[], pageNum: number, pageSize: number, sortBy: string, sortOrder: string): Observable<IProductSimpleNet> {
        return this.httpClient
            .get<IProductSimpleNet>(environment.productUrl + '/public/productDetails?attributes=' + attributesKey.join(',') + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&sortBy=' + sortBy + '&sortOrder=' + sortOrder);
    }
    getProductDetailsById(productId: string): Observable<IProductDetail> {
        return this.httpClient.get<IProductDetail>(
            environment.productUrl + '/public/productDetails/' + productId
        );
    }
}
