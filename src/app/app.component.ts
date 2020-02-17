import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { shrinkOutAnimation, slideInAnimation } from './classes/animation';
import { HttpProxyService } from './services/http-proxy.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation,
        shrinkOutAnimation,
        // animation triggers go here
    ]
})
export class AppComponent{
    title = 'mt1-obj-market';
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    prevScrollpos: number;
    scrollOb: Observable<any>;
    constructor(public httpProxy: HttpProxyService) {
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
