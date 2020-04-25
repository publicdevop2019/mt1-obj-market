import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { shrinkOutAnimation, slideInAnimation } from './classes/animation';
import { HttpProxyService } from './services/http-proxy.service';
import { ThemeService } from './services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation,
        shrinkOutAnimation,
    ]
})
export class AppComponent {
    title = 'mt1-obj-market';
    @ViewChild('sidenav') sidenav: MatSidenav;
    prevScrollpos: number;
    scrollOb: Observable<any>;
    constructor(public httpProxy: HttpProxyService, public themeSvc: ThemeService, @Inject(DOCUMENT) doc: Document, @Inject(LOCALE_ID) locale: string) {
        doc.documentElement.setAttribute('lang', locale)
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
