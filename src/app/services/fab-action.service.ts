import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FabActionService {
    public display = false;

    constructor(public router: Router) {
        (router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        ) as Observable<NavigationEnd>).subscribe(next => {
            // this.onCategoriesPage = onCategoriesPageHeader();
        });
    }
}
