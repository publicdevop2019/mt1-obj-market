import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAddressComponent } from './components/form-address/form-address.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AccountComponent } from './pages/account/account.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
/**
 * @note remember to add animation in data {} to for new router mapping
 */
const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent,
        data: {
            productListCategory: 'top',
            listView: 'simple',
            animation: 'home'
        }
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        data: { listView: 'full', animation: 'categories' }
    },
    {
        path: 'categories/:category',
        component: ProductListComponent,
        data: { productListCategory: 'byCategory', animation: 'category' }
    },
    {
        path: 'categories/:category/:productId',
        component: ProductDetailComponent,
        data: { fab: 'goBack', animation: 'productDetail' }
    },
    { path: 'cart', component: CartComponent, data: { animation: 'cart' } },
    {
        path: 'account',
        component: AccountComponent,
        data: { animation: 'AccountPage' }
    },
    { path: 'order', component: OrderDetailComponent, data: { animation: 'order' } },
    { path: 'orders', component: OrdersComponent, data: { animation: 'orders' } },
    { path: 'orders/:orderId', component: OrderDetailComponent, data: { animation: 'orderDetail' } },
    { path: 'order-complete', component: OrderCompleteComponent, data: { animation: 'orderComplete' } },
    { path: 'payment', component: FormPaymentComponent, data: { animation: 'payment' } },
    { path: 'payments', component: PaymentsComponent, data: { animation: 'payments' } },
    { path: 'payments/:paymentId', component: FormPaymentComponent, data: { animation: 'paymentDetail' } },
    { path: 'address', component: FormAddressComponent, data: { animation: 'address' } },
    { path: 'addresses', component: AddressesComponent, data: { animation: 'addresses' } },
    { path: 'addresses/:addressId', component: FormAddressComponent, data: { animation: 'addressDetail' } },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
