import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export interface ITokenResponse {
    access_token: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: string;
    scope?: string;
    user_name?: string;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUserAuthInfo: ITokenResponse;
    constructor(private httpClient: HttpClient) {}
    getToken(code: string): Observable<ITokenResponse> {
        const header = new HttpHeaders().append(
            'Authorization',
            'Basic ' +
                btoa(environment.APP_ID + ':' + environment.APPP_SECRET_PUBLIC)
        );
        const formData = new FormData();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', environment.oauthRedirectUri);
        return this.httpClient.post<ITokenResponse>(
            environment.getTokenUri,
            formData,
            { headers: header }
        );
    }
}
