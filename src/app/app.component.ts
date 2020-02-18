import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { shrinkOutAnimation, slideInAnimation } from './classes/animation';
import { HttpProxyService } from './services/http-proxy.service';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation,
        shrinkOutAnimation,
    ]
})
export class AppComponent{
    title = 'mt1-obj-market';
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    prevScrollpos: number;
    scrollOb: Observable<any>;
    constructor(public httpProxy: HttpProxyService,public themeSvc:ThemeService) {
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
