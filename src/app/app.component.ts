import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable, Subject } from 'rxjs';
import { throttleTime, debounceTime, elementAt, debounce } from 'rxjs/operators';
import { slideInAnimation, shrinkOutAnimation } from './classes/animation';
import { HttpProxyService } from './services/http-proxy.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        slideInAnimation,
        shrinkOutAnimation,
        trigger(
            'enterAnimation', [
            transition(':enter', [
                style({ height: 0 }),
                animate('250ms', style({ height: '*' }))
            ]),
            transition(':leave', [
                style({ height: '*' }),
                animate('250ms', style({ height: 0 }))
            ])
        ]
        )
        // animation triggers go here
    ]
})
export class AppComponent implements AfterViewInit {
    title = 'mt1-obj-market';
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
    @ViewChild('scrollBody', { static: false }) scrollBody: ElementRef;
    prevScrollpos: number;
    scrollDown: boolean = false;
    scrollOb: Observable<any>;
    constructor(public httpProxy: HttpProxyService) {
    }
    ngAfterViewInit(): void {
        this.prevScrollpos = this.scrollBody.nativeElement.scrollTop;
        this.scrollOb = fromEvent(this.scrollBody.nativeElement, 'scroll');
        let sub = this.scrollOb.pipe(throttleTime(500, undefined, { leading: true, trailing: true })).pipe(debounceTime(100)).subscribe(next => {
            let el: HTMLDivElement = this.scrollBody.nativeElement;
            let currentScrollPos = el.scrollTop;
            if (el.scrollHeight - el.scrollTop < el.clientHeight) {
                /**
                 * stop scrolling to when near bottom to prevent infinite scroll
                 * e.g. scroll up --> show header --> scroll down --> hide header --> scroll up
                 * set to false to make sure top bar always present 
                 */
                this.scrollDown = false;
            } else {
                if (currentScrollPos === 0) {
                    this.scrollDown = false;
                }
                else if (this.prevScrollpos > currentScrollPos) {
                    this.scrollDown = false;
                } else {
                    this.scrollDown = true;

                }
                this.prevScrollpos = currentScrollPos;
            }
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
