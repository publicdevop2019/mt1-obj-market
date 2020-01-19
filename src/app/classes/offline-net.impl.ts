import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICategory } from '../components/category-list/category-list.component';
import { IOrder } from '../components/card-order/card-order.component';
import { IAddress } from '../pages/addresses/addresses.component';
import { ICartItem } from '../pages/cart/cart.component';
import {
    IProductDetail,
    IProductSimple
} from '../pages/product-detail/product-detail.component';
import { INet } from './net.interface';
import { RandomUtility } from './random';
import { ITokenResponse, AuthService } from '../services/auth.service';

export class OfflineNetImpl implements INet {
    confirmOrder(orderId: string): Observable<any> {
        return of({'paymentStatus':true}).pipe(
            delay(this.defaultDelay)
        );
    };
    searchProduct(key: string): Observable<IProductSimple[]> {
        return new Observable<IProductSimple[]>(el => {
            this.httpClient
                .get<IProductSimple[]>('http://localhost:8080/api/productTotal')
                .subscribe(next => {
                    el.next(next.filter(e => e.name === key));
                });
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
    searchProfile(): Observable<string> {
        return of('100').pipe(
            delay(this.defaultDelay)
        );
    };
    calcShipptingCost(
        product: IProductDetail,
        address: IAddress
    ): Observable<number> {
        return of(RandomUtility.randomPrice(0, 999)).pipe(
            delay(this.defaultDelay)
        );
    }
    calcTax(product: IProductDetail, address: IAddress): Observable<number> {
        return of(RandomUtility.randomPrice(0, 999)).pipe(
            delay(this.defaultDelay)
        );
    }
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
    getCategory(): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>(
            'http://localhost:8080/api/categories'
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
    getTopProducts(): Observable<IProductSimple[]> {
        return this.httpClient.get<IProductSimple[]>(
            'http://localhost:8080/api/productTop'
        );
    }
    /**
     * @temp this should be replaced by real api
     */
    searchByCategory(category: string): Observable<IProductSimple[]> {
        return new Observable<IProductSimple[]>(el => {
            this.httpClient
                .get<IProductSimple[]>('http://localhost:8080/api/productTotal')
                .subscribe(next => {
                    el.next(next.filter(e => e.category === category));
                });
        });
    }
    getProductDetailsById(productId: string): Observable<IProductDetail> {
        return this.httpClient.get<IProductDetail>(
            'http://localhost:8080/api/productTotalDetails/' + productId
        );
    }
}
