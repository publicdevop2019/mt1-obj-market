import { Component, ViewChild, Inject, LOCALE_ID, ChangeDetectorRef, AfterViewChecked, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { shrinkOutAnimation, slideInAnimation } from './classes/animation';
import { HttpProxyService } from './services/http-proxy.service';
import { ThemeService } from './services/theme.service';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { CONSTANT_I18N } from 'src/locale/constant';
import { OrderService } from './services/order.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation,
        shrinkOutAnimation,
    ]
})
export class AppComponent implements AfterViewChecked {
    title = 'mt1-obj-market';
    @ViewChild('sidenav') sidenav: MatSidenav;
    @ViewChild('contentBody') contentBody: ElementRef<HTMLDivElement>;
    prevScrollpos: number;
    scrollOb: Observable<any>;
    constructor(
        public httpProxy: HttpProxyService,
        public themeSvc: ThemeService,
        @Inject(DOCUMENT) doc: Document,
        @Inject(LOCALE_ID) locale: string,
        private titleService: Title,
        private changeRef: ChangeDetectorRef,
        private orderSvc: OrderService
    ) {
        doc.documentElement.setAttribute('lang', locale);
        this.titleService.setTitle(CONSTANT_I18N.docTitle);
        this.orderSvc.scrollTop.subscribe(() => {
            this.contentBody.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }
    ngAfterViewChecked(): void {
        if (!this.themeSvc.isBrowser) {
            this.changeRef.detectChanges();
        }
    }
    prepareRoute(outlet: RouterOutlet) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData.animation
        );
    }
    close() {
        this.sidenav.close();
    }
}
