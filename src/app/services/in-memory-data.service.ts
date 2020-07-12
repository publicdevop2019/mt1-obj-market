import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { RandomUtility } from '../classes/random';
import { IProductSimple } from '../pages/product-detail/product-detail.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { IOrder } from '../modules/account/card-order/card-order.component';

@Injectable({
    providedIn: 'root'
})
export class InmemoryDataService implements InMemoryDbService {
    constructor() {}
    createDb(reqInfo?: RequestInfo) {
        const productTotal: IProductSimple[] = [];
        let productTotalDetails: IProductSimple[] = [];
        const carts: ICartItem[] = RandomUtility.randomCartOrders(0);
        const catalogs = RandomUtility.randomCatalogs();
        const addresses: IAddress[] = RandomUtility.randomAddressList();
        const orders: IOrder[] = RandomUtility.randomSuccessOrderList();

        catalogs.forEach(category => {
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
            catalogs: catalogs,
            productTop,
            productTotal,
            productTotalDetails,
            carts,
            addresses,
            orders
        };
    }
    genId(): string {
        return RandomUtility.randomInt(0, 9999).toString();
    }
}
