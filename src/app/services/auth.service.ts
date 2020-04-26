import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { CONSTANT_I18N } from 'src/locale/constant';
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
    get currentUserAuthInfo() {
        if (localStorage.getItem('jwt') === null)
            return undefined;
        return JSON.parse(localStorage.getItem('jwt')) as ITokenResponse;
    }
    set currentUserAuthInfo(token: ITokenResponse) {
        if (token === null || token === undefined) {
            localStorage.clear()
        } else {
            localStorage.setItem('jwt', JSON.stringify(token))
        }
    }
    get userProfileId() {
        if (localStorage.getItem('userProfileId') === null) {
            this.router.navigate(['/account']);
            this._snackBarSvc.openSnackBar('login_required')
            localStorage.clear();
            /**
             * @note below msg will not get printed out, 
             * { return undefined } can not present here otherwise undefined will be added to url
             */
            throw new Error('userProfileId not exist')
            // return undefined;
        } else {
            return localStorage.getItem('userProfileId')
        }
    };
    set userProfileId(id: string) {
        localStorage.setItem('userProfileId', id)
    };
    constructor(private httpClient: HttpClient, private router: Router, private _snackBarSvc: SnackbarService) { }
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
