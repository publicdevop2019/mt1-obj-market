import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { RandomUtility } from '../classes/random';
import { IProductSimple } from '../pages/product-detail/product-detail.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IPayment } from '../pages/payments/payments.component';
import { IAddress } from '../pages/addresses/addresses.component';
import { IOrder } from '../components/card-order/card-order.component';

@Injectable({
    providedIn: 'root'
})
export class InmemoryDataService implements InMemoryDbService {
    constructor() {}
    createDb(reqInfo?: RequestInfo) {
        const productTotal: IProductSimple[] = [];
        let productTotalDetails: IProductSimple[] = [];
        const carts: ICartItem[] = RandomUtility.randomCartOrders(0);
        const payments: IPayment[] = RandomUtility.randomPaymentList();
        const categories = RandomUtility.randomCategories();
        const addresses: IAddress[] = RandomUtility.randomAddressList();
        const orders: IOrder[] = RandomUtility.randomSuccessOrderList();

        categories.forEach(category => {
            productTotal.push(
                ...RandomUtility.randomProductSimpleListFromCategory(category)
            );
        });

        productTotalDetails = productTotal.map(product =>
            RandomUtility.randomProductDetailFromSimple(product)
        );

        const productTop = productTotal.slice(
            0,
            RandomUtility.randomInt(0, productTotal.length)
        );

        return {
            categories,
            productTop,
            productTotal,
            productTotalDetails,
            carts,
            payments,
            addresses,
            orders
        };
    }
    genId(): string {
        return RandomUtility.randomInt(0, 9999).toString();
    }
}
