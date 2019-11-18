import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CONFIG_ACCOUNT } from 'src/app/classes/app-config';
import { safelyGetValue } from 'src/app/classes/utility';
import { IList } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public accountConfig: IList[] = CONFIG_ACCOUNT;
    constructor(
        private route: ActivatedRoute,
        public authSvc: AuthService,
        private router: Router
    ) {
        if (!this.authSvc.currentUserAuthInfo) {
            this.route.queryParams
                .pipe(
                    switchMap(output => {
                        if (output.code === undefined || output.code === null) {
                            /**
                             * do nothing, wait for user trigger login
                             */
                            return of(undefined);
                        } else {
                            return this.authSvc.getToken(output.code);
                        }
                    })
                )
                .subscribe(next => {
                    if (next) {
                        this.authSvc.currentUserAuthInfo = next;
                        if (sessionStorage.getItem('nextUrl')) {
                            this.router.navigateByUrl(
                                sessionStorage.getItem('nextUrl')
                            );
                            sessionStorage.removeItem('nextUrl');
                        }
                    } else {
                        /** purposely do nothing */
                    }
                });
        } else {
            /**
             * do nothing
             */
        }
    }

    ngOnInit() {}
    getUsername(): string {
        return safelyGetValue<string>(
            () => this.authSvc.currentUserAuthInfo.uid,
            ''
        );
    }
    login() {
        location.replace(
            `${environment.authorzieUrl}client_id=${environment.APP_ID}&redirect_uri=${environment.oauthRedirectUri}&state=login`
        );
    }
    logout() {
        this.authSvc.currentUserAuthInfo = undefined;
    }
}
