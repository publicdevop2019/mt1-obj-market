import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
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
            // transition('* => void', [
            //     style({ height: '*' }),
            //     animate(250, style({ height: 0 }))
            // ])
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
        this.scrollOb.pipe(throttleTime(500, undefined, { leading: true, trailing: true })).subscribe(next => {
            let currentScrollPos = this.scrollBody.nativeElement.scrollTop;
            if (this.prevScrollpos > currentScrollPos) {
                this.scrollDown = false;
            } else {
                this.scrollDown = true;
                // this.scrollBody.nativeElement.style.top="-50px"

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
