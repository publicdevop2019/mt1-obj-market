import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { onCategoriesPageHeader, onHomeHeader } from 'src/app/classes/utility';
import { Location } from '@angular/common';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public onCategoriesPage: boolean;
    public onHomePage: boolean;
    public searchInput: AbstractControl = new FormControl('', []);
    @Output() filterClick = new EventEmitter<void>();
    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        private location: Location
    ) {
        (router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        ) as Observable<NavigationEnd>).subscribe(next => {
            this.onCategoriesPage = onCategoriesPageHeader();
            this.onHomePage = onHomeHeader();
        });
    }

    ngOnInit() {}
    navBack() {
        this.location.back();
    }
    public emitEvent() {
        this.filterClick.emit();
    }
}
