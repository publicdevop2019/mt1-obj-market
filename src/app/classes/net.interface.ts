import { Observable } from 'rxjs';
import { IOrder } from '../modules/account/card-order/card-order.component';
import { ICategoryNet } from '../components/category-list/category-list.component';
import { IAddress } from '../modules/account/addresses/addresses.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IProductDetail, IProductSimple } from '../pages/product-detail/product-detail.component';
export interface INet {
    searchProduct: (key: string, pageNumber: number, pageSize: number) => Observable<IProductSimple[]>;

    searchProfile: () => Observable<string>;
    createProfile: () => Observable<any>;
    getCategory: () => Observable<ICategoryNet[]>;
    searchByCategory: (category: string, pageNum: number, pageSize: number, sortBy: string, sortOrder: string) => Observable<IProductSimple[]>;
    getProductDetailsById: (productId: string) => Observable<IProductDetail>;

    getCartItems: () => Observable<ICartItem[]>;
    addToCart: (item: ICartItem) => Observable<any>;
    removeFromCart: (id: string) => Observable<any>;

    getOrders: () => Observable<IOrder[]>;
    getOrderById: (id: string) => Observable<IOrder>;
    reserveOrder: (order: IOrder) => Observable<any>;
    replaceOrder: (order: IOrder) => Observable<any>;
    confirmOrder: (orderId: string) => Observable<any>;

    getAddresses: () => Observable<IAddress[]>;
    createAddress: (address: IAddress) => Observable<IAddress>;
    updateAddress: (address: IAddress) => Observable<IAddress>;
    deleteAddress: (id: string) => Observable<any>;
}
