import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { GhostCardProductComponent } from './components/ghost-card-product/ghost-card-product.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductBasicComponent } from './components/product-basic/product-basic.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { PaymentDetailComponent } from './pages/payment-detail/payment-detail.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SearchComponent } from './pages/search/search.component';
import { CustomHttpInterceptor } from './services/http.interceptor';
import { LoadingInterceptor } from './services/loading.interceptor';
import { SharedModule } from './modules/shared/shared.module';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { OfflineInterceptor } from './services/offline.interceptor';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { SoldOutBannerComponent } from './components/sold-out-banner/sold-out-banner.component';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CartComponent,
        CatalogsComponent,
        HeaderComponent,
        FooterComponent,
        CatalogListComponent,
        ProductDetailComponent,
        CardProductComponent,
        ProductListComponent,
        ProductBasicComponent,
        OrderCompleteComponent,
        FormFilterComponent,
        SearchComponent,
        FormSearchComponent,
        PaymentDetailComponent,
        GhostCardProductComponent,
        SlideshowComponent,
        SoldOutBannerComponent
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
        MatSlideToggleModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        }),
        SharedModule
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
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OfflineInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
