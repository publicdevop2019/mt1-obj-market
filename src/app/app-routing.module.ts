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

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: {
            productListCategory: 'top',
            listView: 'simple',
            animation: 'HomePage'
        }
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        data: { listView: 'full', animation: 'CategoriesPage' }
    },
    {
        path: 'categories/:category',
        component: ProductListComponent,
        data: { productListCategory: 'byCategory' }
    },
    {
        path: 'categories/:category/:productId',
        component: ProductDetailComponent,
        data: { fab: 'goBack' }
    },
    { path: 'cart', component: CartComponent, data: { animation: 'CartPage' } },
    {
        path: 'account',
        component: AccountComponent,
        data: { animation: 'AccountPage' }
    },
    { path: 'order', component: OrderDetailComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/:orderId', component: OrderDetailComponent },
    { path: 'order-complete', component: OrderCompleteComponent },
    { path: 'payment', component: FormPaymentComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: 'payments/:paymentId', component: FormPaymentComponent },
    { path: 'address', component: FormAddressComponent },
    { path: 'addresses', component: AddressesComponent },
    { path: 'addresses/:addressId', component: FormAddressComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
