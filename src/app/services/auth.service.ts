import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CONSTANT_I18N } from 'src/locale/constant';
import { SnackbarService } from './snackbar.service';
import { ThemeService } from './theme.service';
export interface ITokenResponse {
    access_token: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: string;
    scope?: string;
    uid?: string;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient, private router: Router, private _snackBarSvc: SnackbarService, private themeSvc:ThemeService) {
    }
    get currentUserAuthInfo() {
        if (!this.themeSvc.isBrowser) {
            if (global['login'] === 'true')
                return {} as ITokenResponse;
            return undefined;
        }
        if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined)
            return undefined;
        return JSON.parse(localStorage.getItem('jwt')) as ITokenResponse;
    }
    set currentUserAuthInfo(token: ITokenResponse) {
        if (token === null || token === undefined) {
            localStorage.clear();
            document.cookie = "login=false";
        } else {
            localStorage.setItem('jwt', JSON.stringify(token));
            document.cookie = "login=true";
        }
    }
    // get userProfileId() {
    //     if (localStorage.getItem('userProfileId') === null) {
    //         this.router.navigate(['/account']);
    //         this._snackBarSvc.openSnackBar('login_required')
    //         localStorage.clear();
    //         /**
    //          * @note below msg will not get printed out, 
    //          * { return undefined } can not present here otherwise undefined will be added to url
    //          */
    //         throw new Error('userProfileId not exist')
    //         // return undefined;
    //     } else {
    //         return localStorage.getItem('userProfileId')
    //     }
    // };
    // set userProfileId(id: string) {
    //     localStorage.setItem('userProfileId', id)
    // };
    getToken(code: string): Observable<ITokenResponse> {
        const header = new HttpHeaders().append(
            'Authorization',
            'Basic ' +
            btoa(environment.APP_ID + ':' + environment.APPP_SECRET_PUBLIC)
        );
        const formData = new FormData();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', environment.oauthRedirectUri + CONSTANT_I18N.redirctUrl);
        return this.httpClient.post<ITokenResponse>(
            environment.getTokenUri,
            formData,
            { headers: header }
        );
    }
}
