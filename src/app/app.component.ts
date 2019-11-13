import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './classes/animation';
import { HttpProxyService } from './services/http-proxy.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation
        // animation triggers go here
    ]
})
export class AppComponent {
    title = 'mt1-obj-market';
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    constructor(public httpProxy: HttpProxyService) {}
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
