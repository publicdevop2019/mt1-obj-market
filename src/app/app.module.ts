import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatToolbarModule } from '@angular/material';
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
import { CardProductComponent } from './components/card-product/card-product.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormAddressComponent } from './components/form-address/form-address.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { GhostCardProductComponent } from './components/ghost-card-product/ghost-card-product.component';
import { HeaderComponent } from './components/header/header.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
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
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SearchComponent } from './pages/search/search.component';
import { CustomHttpInterceptor } from './services/http.interceptor';
import { LoadingInterceptor } from './services/loading.interceptor';
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
        CardAddressComponent,
        OrderDetailComponent,
        ProductBasicComponent,
        BottomSheetPaymentPickerComponent,
        OrderCompleteComponent,
        CardOrderComponent,
        BtnComponent,
        FormFilterComponent,
        SearchComponent,
        FormSearchComponent,
        LazyImageComponent,
        PaymentDetailComponent,
        GhostCardProductComponent
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
        MatTabsModule,
        MatSlideToggleModule,
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
