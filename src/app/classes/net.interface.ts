import { Observable } from 'rxjs';
import { IOrder } from '../components/card-order/card-order.component';
import { ICategory } from '../components/category-list/category-list.component';
import { IAddress } from '../pages/addresses/addresses.component';
import { ICartItem } from '../pages/cart/cart.component';
import { IPayment } from '../pages/payments/payments.component';
import { IProductDetail, IProductSimple } from '../pages/product-detail/product-detail.component';
export interface INet {
    searchProfile:() =>Observable<string>;
    createProfile:()=>Observable<any>;
    getCategory: () => Observable<ICategory[]>;
    searchByCategory: (category: string) => Observable<IProductSimple[]>;
    getTopProducts: () => Observable<IProductSimple[]>;
    getProductDetailsById: (productId: string) => Observable<IProductDetail>;

    getCartItems: () => Observable<ICartItem[]>;
    addToCart: (item: ICartItem) => Observable<any>;
    removeFromCart: (id: string) => Observable<any>;

    getOrders: () => Observable<IOrder[]>;
    getOrderById: (id: string) => Observable<IOrder>;
    createOrder: (order: IOrder) => Observable<any>;

    getPayments: () => Observable<IPayment[]>;
    createPayment: (payment: IPayment) => Observable<IPayment>;
    updatePayment: (payment: IPayment) => Observable<IPayment>;
    deletePayment: (id: string) => Observable<any>;

    getAddresses: () => Observable<IAddress[]>;
    createAddress: (address: IAddress) => Observable<IAddress>;
    updateAddress: (address: IAddress) => Observable<IAddress>;
    deleteAddress: (id: string) => Observable<any>;

    calcShipptingCost: (
        product: IProductDetail,
        address: IAddress
    ) => Observable<number>;
    calcTax: (product: IProductDetail, address: IAddress) => Observable<number>;
}
