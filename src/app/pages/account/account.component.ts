import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CONFIG_ACCOUNT } from 'src/app/classes/app-config';
import { safelyGetValue } from 'src/app/classes/utility';
import { IList } from 'src/app/components/footer/footer.component';
import { AuthService, ITokenResponse } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpProxyService } from 'src/app/services/http-proxy.service';

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
        private httpProxy:HttpProxyService,
        private router: Router
    ) {
        if (!this.authSvc.currentUserAuthInfo) {
            this.route.queryParams
                .pipe(
                    switchMap(output => {
                        if(environment.mode==='online'){
                            return of(<ITokenResponse>{
                                'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwIiwiYXVkIjpbImVkZ2UtcHJveHkiLCJvYXV0aDItaWQiXSwidXNlcl9uYW1lIjoicm9vdEBnbWFpbC5jb20iLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NzU5NTM1MzQsImlhdCI6MTU3NTk1MzQxNCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ST09UIiwiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJqdGkiOiI4OGVjYWRiYi1jN2EwLTRlYzMtYTNmOC01YjA3MTk3NDhhYzkiLCJjbGllbnRfaWQiOiJsb2dpbi1pZCJ9.lf19Ii1TcpWyVvaCBSJqijN2TA7HB5g7fMULjrAjgx0Ew2qdvlmb-unvRg3tOBarRu57GThWCVnEBGXXKKZ38VnZV1I14JDHDJxuOODnrPMDVUMdP0dMxtvGZ0AatHe6HQvWlzsGKMpGSHYLa2eX-3SGUNjWTRKIWFwdtQUnaYU4Tga4dOnRQYf7zd8kJmgRZE70fSY3hXzy3huqcemNuCZBW6nuEqHDnv-GbHaL8MXzPDaI8wt3QPAFPpYF4nGBdgoujHpSRFBZDDtR18pzHOBhwkke2FuTdRIoQBVCR5-mIQ5tYAD8psRASFrKlFxGsIKki5kDwzSMDCzQXWSuw',
                                'refresh_token': 'string',
                                'token_type': 'bearer',
                                'expires_in': 'string',
                                'scope': 'string',
                                'uid': 'root'
                            })
                        }
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
                        /**
                         * search profile 
                         */
                        this.httpProxy.netImpl.searchProfile().subscribe(
                            next=>{
                                this.authSvc.userProfileId=next;
                            }
                        )

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
