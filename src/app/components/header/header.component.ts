import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public onHomePage: boolean = true;
    public onCatalogsPage: boolean = false;
    public onSearchPage: boolean = false;
    @Output() filterClick = new EventEmitter<void>();
    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private location: Location,
    ) {
        (router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        ) as Observable<NavigationEnd>).subscribe(next => {
            this.onCatalogsPage = router.routerState.snapshot.url.includes('catalogs');
            this.onHomePage = router.routerState.snapshot.url.includes('home');
            this.onSearchPage = router.routerState.snapshot.url.includes('search');
        });
    }

    ngOnInit() { }
    navBack() {
        this.location.back();
    }
    public emitEvent() {
        this.filterClick.emit();
    }
}
