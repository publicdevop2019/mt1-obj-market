import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderDetailComponent } from './modules/account/order-detail/order-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderService } from './services/order.service';
import { QRService } from './services/qr.service';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
/**
 * @note remember to add animation in data {} to for new router mapping
 */
const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
        data: { animation: 'home' }
    },
    {
        path: 'catalogs',
        component: CatalogsComponent,
        data: { animation: 'catalogs' }
    },
    {
        path: 'catalogs/:catalog',
        component: ProductListComponent,
        data: { animation: 'catalog' }
    },
    {
        path: 'products/:productId',
        component: ProductDetailComponent,
        data: { animation: 'productDetail' }
    },
    { path: 'search', component: SearchComponent, data: { productListCategory: 'search', animation: 'search' } },
    { path: 'cart', component: CartComponent, data: { animation: 'cart' } },
    { path: 'order', component: OrderDetailComponent, data: { animation: 'order' }, canActivate: [OrderService] },
    { path: 'order-complete', component: OrderCompleteComponent, data: { animation: 'orderComplete' } },
    { path: 'payment', component: PaymentDetailComponent, data: { animation: 'payment' }, canActivate: [QRService] },
    { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
