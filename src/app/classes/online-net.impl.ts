import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICategory } from '../components/category-list/category-list.component';
import { IOrder } from '../components/card-order/card-order.component';
import { IAddress } from '../pages/addresses/addresses.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IPayment } from '../pages/payments/payments.component';
import {
    IProductDetail,
    IProductSimple
} from '../pages/product-detail/product-detail.component';
import { INet} from './net.interface';
import { RandomUtility } from './random';
import { ITokenResponse, AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

export class OnlineNetImpl implements INet {
    private defaultDelay = 1000;
    constructor(public httpClient: HttpClient,public authSvc:AuthService) {}
    createProfile() : Observable<any>{
        return this.httpClient.post(environment.profileUrl+'/api/profiles',null,{observe:'response'});
    };
    searchProfile():Observable<string>{
        return this.httpClient.get<string>(environment.profileUrl+'/api/profiles/search');
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
    getCategory(): Observable<ICategory[]> {
        return this.httpClient.get<ICategory[]>(
            environment.productUrl+'/api/categories'
            );
        }
    removeFromCart(id: string): Observable<any> {
        return this.httpClient.delete(environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/cart/' + id);
    }
    getCartItems(): Observable<ICartItem[]> {
        return this.httpClient.get<ICartItem[]>(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/cart'
        );
    }
    addToCart(item: ICartItem): Observable<any> {
        return this.httpClient.post(environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/cart', item);
    }
    createPayment(payment: IPayment): Observable<any> {
        return this.httpClient.post(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/payments',
            payment
        );
    }
    updatePayment(payment: IPayment): Observable<any> {
        return this.httpClient.put(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/payments/' + payment.id,
            payment
        );
    }
    getPayments(): Observable<IPayment[]> {
        return this.httpClient.get<IPayment[]>(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/payments'
        );
    }
    deletePayment(id: string): Observable<any> {
        return this.httpClient.delete(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/payments/' + id
        );
    }
    createOrder(order: IOrder): Observable<any> {
        return this.httpClient.post(environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/orders', order,{observe:'response'});
    }
    getOrderById(id: string): Observable<IOrder> {
        return this.httpClient.get<IOrder>(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/orders/' + id
        );
    }
    getOrders(): Observable<IOrder[]> {
        return this.httpClient.get<IOrder[]>(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/orders'
        );
    }
    updateAddress(address: IAddress): Observable<any> {
        return this.httpClient.put(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/addresses/' + address.id,
            address
        );
    }
    createAddress(address: IAddress): Observable<any> {
        return this.httpClient.post(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/addresses',
            address
        );
    }
    getAddresses(): Observable<IAddress[]> {
        return this.httpClient.get<IAddress[]>(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/addresses'
        );
    }
    deleteAddress(id: string): Observable<any> {
        return this.httpClient.delete(
            environment.profileUrl+'/api/profiles/'+this.authSvc.userProfileId+'/addresses/' + id
        );
    }
    getTopProducts(): Observable<IProductSimple[]> {
        return this.httpClient.get<IProductSimple[]>(
            environment.productUrl+'/api/categories/demo1'
        );
    }
    /**
     * @temp this should be replaced by real api
     */
    searchByCategory(category: string): Observable<IProductSimple[]> {
        return new Observable<IProductSimple[]>(el => {
            this.httpClient
                .get<IProductSimple[]>(environment.productUrl+'/api/categories/'+category)
                .subscribe(next => {
                    el.next(next.filter(e => e.category === category));
                });
        });
    }
    getProductDetailsById(productId: string): Observable<IProductDetail> {
        return this.httpClient.get<IProductDetail>(
            environment.productUrl+'/api/productDetails/' + productId
        );
    }
}
