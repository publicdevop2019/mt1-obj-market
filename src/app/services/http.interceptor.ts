import {
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpProxyService } from './http-proxy.service';
import { SnackbarService } from './snackbar.service';
import { AuthService } from './auth.service';
/**
 * use refresh token if call failed
 */
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    private errorStatus: number[] = [500, 503, 502];
    constructor(
        private router: Router,
        private httpProxy: HttpProxyService,
        private authSvc:AuthService,
        private snackBarSvc: SnackbarService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (
            this.authSvc.currentUserAuthInfo &&
            this.authSvc.currentUserAuthInfo.access_token
        ) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authSvc.currentUserAuthInfo.access_token}`
                }
            });
        }
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    const httpError = error as HttpErrorResponse;
                    if (httpError.status === 401) {
                        this.openSnackbar('Please login first');
                        return throwError(error);
                    } else if (
                        this.errorStatus.indexOf(httpError.status) > -1
                    ) {
                        this.openSnackbar('Server returns 5xx');
                    } else if (httpError.status === 404) {
                        this.openSnackbar('Product or category not found');
                        return throwError(error);
                    } else if (httpError.status === 403) {
                        this.openSnackbar('Access is not allowed');
                        return throwError(error);
                    } else if (httpError.status === 400) {
                        if(req.url.indexOf('profiles/search')>-1){
                            /**
                             * create profile
                             */
                            this.httpProxy.netImpl.createProfile().subscribe(next=>{
                                this.authSvc.userProfileId=next.headers.get('location')
                            })
                        }else{
                            this.openSnackbar('Bad request');
                        }
                        return throwError(error);
                    } else if (httpError.status === 0) {
                        this.openSnackbar('Network connection failed');
                        return throwError(error);
                    } else {
                        return throwError(error);
                    }
                } else {
                    /**
                     * angular in memory api does not return type of HttpErrorResponse when 404 not found
                     */
                    return throwError(error);
                }
            })
        );
    }
    openSnackbar(message: string) {
        this.snackBarSvc.openSnackBar(message);
    }
}
