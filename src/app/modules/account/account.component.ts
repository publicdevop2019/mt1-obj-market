import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { CONFIG_ACCOUNT } from 'src/app/classes/app-config';
import { safelyGetValue } from 'src/app/classes/utility';
import { IList } from 'src/app/components/footer/footer.component';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
import { ThemeService } from 'src/app/services/theme.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public accountConfig: IList[] = CONFIG_ACCOUNT;
    public darkThemeCtrl: FormControl;;
    constructor(
        private route: ActivatedRoute,
        public authSvc: AuthService,
        private httpProxy: HttpProxyService,
        private router: Router,
        private cartSvc: CartService,
        private themeSvc: ThemeService
    ) {
        this.darkThemeCtrl = new FormControl(this.themeSvc.isDarkTheme);
        if (!this.authSvc.currentUserAuthInfo) {
            this.route.queryParams
                .pipe(
                    mergeMap(output => {
                        if (output.code === undefined || output.code === null) {
                            /** do nothing, wait for user trigger login */
                            return of(undefined);
                        } else {
                            return this.authSvc.getToken(output.code);
                        }
                    })
                ).pipe(
                    mergeMap(authInfo => {
                        if (authInfo) {
                            this.authSvc.currentUserAuthInfo = authInfo;
                            /** remove one time code to prevent refresh issue */
                            this.router.navigate([], {
                                queryParams: {
                                    code: null,
                                },
                                queryParamsHandling: 'merge'
                            })
                            return this.httpProxy.netImpl.searchProfile()
                        } else {
                            return of(undefined);
                            /** purposely do nothing */
                        }
                    })
                ).pipe(
                    mergeMap(profileId => {
                        if (profileId) {
                            this.authSvc.userProfileId = profileId;
                            return this.httpProxy.netImpl.getCartItems()
                        } else {
                            return of(undefined);
                        }
                    })
                )
                .subscribe(
                    carts => {
                        this.cartSvc.cart = carts || [];
                        if (sessionStorage.getItem('nextUrl')) {
                            this.router.navigateByUrl(sessionStorage.getItem('nextUrl'));
                            sessionStorage.removeItem('nextUrl');
                        }
                    }
                )


        } else {
            /**
             * do nothing
             */
        }
        this.darkThemeCtrl.valueChanges.pipe(debounceTime(250)).subscribe(next => {
            this.themeSvc.isDarkTheme = next;
        })
    }

    ngOnInit() { }
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
        this.cartSvc.cart = [];
    }
}