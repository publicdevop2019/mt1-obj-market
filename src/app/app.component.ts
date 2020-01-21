import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { shrinkOutAnimation, slideInAnimation } from './classes/animation';
import { HeaderService } from './services/header.service';
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
export class AppComponent implements AfterViewInit {
    title = 'mt1-obj-market';
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    @ViewChild('scrollBody', { static: false }) scrollBody: ElementRef;
    prevScrollpos: number;
    scrollOb: Observable<any>;
    constructor(public httpProxy: HttpProxyService, private hSvc: HeaderService) {
    }
    ngAfterViewInit(): void {
        this.prevScrollpos = this.scrollBody.nativeElement.scrollTop;
        this.scrollOb = fromEvent(this.scrollBody.nativeElement, 'scroll');
        let sub = this.scrollOb.
            subscribe(() => {
                let el: HTMLDivElement = this.scrollBody.nativeElement;
                let currentScrollPos = el.scrollTop;
                let scrollAmt = Math.abs(currentScrollPos - this.prevScrollpos);
                if (this.prevScrollpos > currentScrollPos) {
                    let boundary = this.hSvc.maxHeaderHeight;
                    /** scroll up */
                    if (this.hSvc.headerHeight !== boundary) {
                        let nextHeight = this.hSvc.headerHeight + scrollAmt;
                        this.hSvc.headerHeight = nextHeight > boundary ? boundary : nextHeight;
                    }
                } else {
                    /** scroll down */
                    let boundary = this.hSvc.minHeaderHeight;
                    if (this.hSvc.headerHeight !== boundary) {
                        let nextHeight = this.hSvc.headerHeight - scrollAmt;
                        this.hSvc.headerHeight = nextHeight > boundary ? nextHeight : boundary;
                    }
                }
                this.prevScrollpos = currentScrollPos;
            })
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
