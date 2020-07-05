import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICatalogNet } from '../components/catalog-list/catalog-list.component';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { IOrder } from '../modules/account/card-order/card-order.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IProductDetail, IProductSimple } from '../pages/product-detail/product-detail.component';
import { AuthService, ITokenResponse } from '../services/auth.service';
import { INet, IProductSimpleNet } from './net.interface';

export class OfflineNetImpl implements INet {
    replaceOrder(order: IOrder): Observable<any> {
        return this.httpClient.put('http://localhost:8080/api/orders' + order.id, order);
    };
    confirmOrder(orderId: string): Observable<any> {
        return of({ 'paymentStatus': true }).pipe(
            delay(this.defaultDelay)
        );
    };
    searchProduct(key: string): Observable<IProductSimpleNet> {
        return new Observable<IProductSimpleNet>(el => {
            this.httpClient
                .get<IProductSimpleNet>('http://localhost:8080/api/productTotal')
        });
    };
    createProfile(): Observable<any> {
        return of('100').pipe(
            delay(this.defaultDelay)
        );
    }
    private defaultDelay = 1000;
    constructor(public httpClient: HttpClient, public authSvc: AuthService) {
        /** add mock auth info */
        localStorage.setItem('jwt', JSON.stringify(<ITokenResponse>{
            'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwIiwiYXVkIjpbImVkZ2UtcHJveHkiLCJvYXV0aDItaWQiXSwidXNlcl9uYW1lIjoicm9vdEBnbWFpbC5jb20iLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NzU5NTM1MzQsImlhdCI6MTU3NTk1MzQxNCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ST09UIiwiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJqdGkiOiI4OGVjYWRiYi1jN2EwLTRlYzMtYTNmOC01YjA3MTk3NDhhYzkiLCJjbGllbnRfaWQiOiJsb2dpbi1pZCJ9.lf19Ii1TcpWyVvaCBSJqijN2TA7HB5g7fMULjrAjgx0Ew2qdvlmb-unvRg3tOBarRu57GThWCVnEBGXXKKZ38VnZV1I14JDHDJxuOODnrPMDVUMdP0dMxtvGZ0AatHe6HQvWlzsGKMpGSHYLa2eX-3SGUNjWTRKIWFwdtQUnaYU4Tga4dOnRQYf7zd8kJmgRZE70fSY3hXzy3huqcemNuCZBW6nuEqHDnv-GbHaL8MXzPDaI8wt3QPAFPpYF4nGBdgoujHpSRFBZDDtR18pzHOBhwkke2FuTdRIoQBVCR5-mIQ5tYAD8psRASFrKlFxGsIKki5kDwzSMDCzQXWSuw',
            'refresh_token': 'string',
            'token_type': 'bearer',
            'expires_in': 'string',
            'scope': 'string',
            'uid': 'root'
        }))
    }
    getOrderId(): Observable<any> {
        return of({});
    };
    searchProfile(): Observable<string> {
        return of('100').pipe(
            delay(this.defaultDelay)
        );
    };
    deletePayment(id: string): Observable<any> {
        return this.httpClient.delete(
            'http://localhost:8080/api/payments/' + id
        );
    }
    deleteAddress(id: string): Observable<any> {
        return this.httpClient.delete(
            'http://localhost:8080/api/addresses/' + id
        );
    }
    removeFromCart(id: string): Observable<any> {
        return this.httpClient.delete('http://localhost:8080/api/carts/' + id);
    }
    getCatalog(): Observable<ICatalogNet> {
        return this.httpClient.get<ICatalogNet>(
            'http://localhost:8080/api/catalogs'
        );
    }
    reserveOrder(order: IOrder): Observable<any> {
        return this.httpClient.post('http://localhost:8080/api/orders', order);
    }
    getOrderById(id: string): Observable<IOrder> {
        return this.httpClient.get<IOrder>(
            'http://localhost:8080/api/orders/' + id
        );
    }
    addToCart(item: ICartItem): Observable<any> {
        return this.httpClient.post('http://localhost:8080/api/carts', item);
    }

    getOrders(): Observable<IOrder[]> {
        return this.httpClient.get<IOrder[]>(
            'http://localhost:8080/api/orders'
        );
    }
    updateAddress(address: IAddress): Observable<any> {
        return this.httpClient.put(
            'http://localhost:8080/api/addresses/' + address.id,
            address
        );
    }
    createAddress(address: IAddress): Observable<any> {
        return this.httpClient.post(
            'http://localhost:8080/api/addresses',
            address
        );
    }
    getAddresses(): Observable<IAddress[]> {
        return this.httpClient.get<IAddress[]>(
            'http://localhost:8080/api/addresses'
        );
    }
    getCartItems(): Observable<ICartItem[]> {
        return this.httpClient.get<ICartItem[]>(
            'http://localhost:8080/api/carts'
        );
    }
    searchByCatalog(attributesKey: string[]): Observable<IProductSimpleNet> {
        return new Observable<IProductSimpleNet>(el => {
            this.httpClient
                .get<IProductSimple[]>('http://localhost:8080/api/productTotal')
        });
    }
    getProductDetailsById(productId: string): Observable<IProductDetail> {
        return this.httpClient.get<IProductDetail>(
            'http://localhost:8080/api/productTotalDetails/' + productId
        );
    }
}
