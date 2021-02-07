import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { mockAddresses } from 'src/assets/mocks/mock-addresses';
import { mockCatalog } from 'src/assets/mocks/mock-catalog';
import { mockOrders } from 'src/assets/mocks/mock-orders';
import { mockProductDetail } from 'src/assets/mocks/mock-product-detail';
import { mockProductSimple } from 'src/assets/mocks/mock-product-simples';
import { mockCart } from 'src/assets/mocks/mock-cart';
import { mockOrder } from 'src/assets/mocks/mock-order';
import { mockFilter } from 'src/assets/mocks/mock-filter';
import { mockAddress } from 'src/assets/mocks/mock-address';
/**
 * use refresh token if call failed
 */
@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
    private DEFAULT_DELAY = 1000;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.mode === 'offline') {
            if (['delete', 'put', 'post', 'patch'].includes(req.method.toLowerCase())) {
                if (req.url.includes('/oauth/token')) {
                    const mockedToken = {
                        access_token: 'mockTokenString',
                        refresh_token: 'mockTokenString2'
                    };
                    return of(new HttpResponse({ status: 200, body: mockedToken })).pipe(delay(this.DEFAULT_DELAY));
                }
                if (req.url.includes('orders/')) {
                    const header = new HttpHeaders();
                    const var0 = header.set('Location', `weixin?//wxpay/bizpayurl?appid=wx2421b1c4370ec43b&mch_id=10000100
                    &nonce_str=aa43681f1b804d2eacfb2f9e0107aa59&product_id=836202480025600
                    &time_stamp=1415949957&sign=512F68131DD251DA4A45DA79CC7EFE9D`)
                    return of(new HttpResponse({ status: 200, headers: var0, body: { paymentStatus: true } }))
                    .pipe(delay(this.DEFAULT_DELAY))
                }
                return of(new HttpResponse({ status: 200 })).pipe(delay(this.DEFAULT_DELAY));
            }
            if (['get'].includes(req.method.toLowerCase())) {
                if (req.url.includes('/profiles/search')) {
                    return of(new HttpResponse({ status: 200, body: 100 })).pipe(delay(this.DEFAULT_DELAY));
                }
                if (req.url.includes('/cart')) {
                    return of(new HttpResponse({ status: 200, body: mockCart })).pipe(delay(this.DEFAULT_DELAY));
                }
                if (req.url.includes('/products?')) {
                    return of(new HttpResponse({ status: 200, body: mockProductSimple })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('/products/public/')) {
                    return of(new HttpResponse({ status: 200, body: mockProductDetail })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('/products/public')) {
                    return of(new HttpResponse({ status: 200, body: mockProductSimple })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('catalogs')) {
                    return of(new HttpResponse({ status: 200, body: mockCatalog })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('addresses/user/')) {
                    return of(new HttpResponse({ status: 200, body: mockAddress })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('addresses/user')) {
                    return of(new HttpResponse({ status: 200, body: mockAddresses })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('orders/user/')) {
                    return of(new HttpResponse({ status: 200, body: mockOrder })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('orders/user')) {
                    return of(new HttpResponse({ status: 200, body: mockOrders })).pipe(delay(this.DEFAULT_DELAY))
                }
                if (req.url.includes('filters')) {
                    return of(new HttpResponse({ status: 200, body: mockFilter })).pipe(delay(this.DEFAULT_DELAY))
                }
            }
        }
        return next.handle(req);
    }
}