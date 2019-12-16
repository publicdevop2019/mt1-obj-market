import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
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
    public currentUserAuthInfo: ITokenResponse;
    private _userProfileId: string;
    get userProfileId(){
        if(this._userProfileId===null|| this._userProfileId===undefined){
            this.router.navigate(['/account']);
            throw new Error('invalid value')
        }else{
            return this._userProfileId;
        }
    };
    set userProfileId(id:string){
        this._userProfileId=id;
    };
    constructor(private httpClient: HttpClient,private router:Router) {}
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
