import { IList } from '../components/footer/footer.component';

export const CONFIG_FOOTER: IList[] = [
    {
        icon: 'home',
        title: 'Home',
        routerUrl: 'home'
    },
    {
        icon: 'category',
        title: 'Categories',
        routerUrl: 'categories'
    },
    {
        icon: 'shopping_cart',
        title: 'Cart',
        routerUrl: 'cart'
    },
    {
        icon: 'account_box',
        title: 'Account',
        routerUrl: 'account'
    }
];

export const CONFIG_ACCOUNT: IList[] = [
    {
        icon: 'local_shipping',
        title: 'Shipping Address',
        routerUrl: 'addresses'
    },
    {
        icon: 'assignment',
        title: 'Orders',
        routerUrl: 'orders'
    }
];
