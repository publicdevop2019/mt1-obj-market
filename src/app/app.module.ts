import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomSheetAddressPickerComponent } from './components/bottom-sheet-address-picker/bottom-sheet-address-picker.component';
import { BottomSheetPaymentPickerComponent } from './components/bottom-sheet-payment-picker/bottom-sheet-payment-picker.component';
import { BtnComponent } from './components/btn/btn.component';
import { CardAddressComponent } from './components/card-address/card-address.component';
import { CardCartComponent } from './components/card-cart/card-cart.component';
import { CardOrderComponent } from './components/card-order/card-order.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormAddressComponent } from './components/form-address/form-address.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { FormPaymentComponent } from './components/form-payment/form-payment.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductBasicComponent } from './components/product-basic/product-basic.component';
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
import { SearchComponent } from './pages/search/search.component';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { FilterService } from './services/filter.service';
import { HttpProxyService } from './services/http-proxy.service';
import { CustomHttpInterceptor } from './services/http.interceptor';
import { LoadingInterceptor } from './services/loading.interceptor';
import { ProductService } from './services/product.service';
import { SnackbarService } from './services/snackbar.service';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InmemoryDataService } from './services/in-memory-data.service';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CartComponent,
        CategoriesComponent,
        AccountComponent,
        HeaderComponent,
        FooterComponent,
        CategoryListComponent,
        ProductDetailComponent,
        CardProductComponent,
        ProductListComponent,
        CardCartComponent,
        AddressesComponent,
        OrdersComponent,
        FormAddressComponent,
        BottomSheetAddressPickerComponent,
        PaymentsComponent,
        FormPaymentComponent,
        CardAddressComponent,
        OrderDetailComponent,
        ProductBasicComponent,
        CardPaymentComponent,
        BottomSheetPaymentPickerComponent,
        OrderCompleteComponent,
        CardOrderComponent,
        BtnComponent,
        FormFilterComponent,
        SearchComponent,
        FormSearchComponent,
        LazyImageComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatChipsModule,
        MatSelectModule,
        MatBottomSheetModule,
        MatSnackBarModule,
        MatRadioModule,
        MatBadgeModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatRippleModule,
        // InMemoryWebApiModule.forRoot(InmemoryDataService, {
        //     delay: 2000,
        //     passThruUnknownUrl: true
        // }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    entryComponents: [
        BottomSheetAddressPickerComponent,
        BottomSheetPaymentPickerComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        ProductService,
        HttpProxyService,
        CartService,
        SnackbarService,
        AuthService,
        FilterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
