import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as UUID from 'uuid/v1';
import { getCookie } from '../classes/utility';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
/**
 * use refresh token if call failed
 */
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    private errorStatus: number[] = [500, 503, 502];
    constructor(
        private router: Router,
        private authSvc: AuthService,
        private snackBarSvc: SnackbarService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (
            this.authSvc.currentUserAuthInfo &&
            this.authSvc.currentUserAuthInfo.access_token
        ) {
            if (req.url.indexOf('auth-svc/oauth/token') === -1 && req.url.indexOf('public') === -1) {
                req = req.clone({
                    setHeaders: {
                        UUID: UUID(),
                        Authorization: `Bearer ${this.authSvc.currentUserAuthInfo.access_token}`
                    }
                });
            }
        }
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    const httpError = error as HttpErrorResponse;
                    if (httpError.status === 401) {
                        this.snackBarSvc.openSnackBar('login_required');
                        localStorage.clear();
                        this.router.navigate(['/account']);
                    } else if (this.errorStatus.indexOf(httpError.status) > -1) {
                        this.snackBarSvc.openSnackBar('server_5xx');
                    } else if (httpError.status === 404) {
                        this.snackBarSvc.openSnackBar('not_found');
                    } else if (httpError.status === 403) {
                        //for csrf request, retry 
                        if (getCookie('XSRF-TOKEN')) {
                            req = req.clone({ setHeaders: { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }, withCredentials: true });
                        } else {
                            this.snackBarSvc.openSnackBar('server_403');
                            return throwError(error);
                        }
                        return next.handle(req).pipe(catchError((errorNew: HttpErrorResponse) => {
                            if (errorNew instanceof HttpErrorResponse) {
                                const httpError = errorNew as HttpErrorResponse;
                                if (httpError.status === 401) {
                                    this.snackBarSvc.openSnackBar('login_required');
                                    localStorage.clear();
                                    this.router.navigate(['/account']);
                                } else if (this.errorStatus.indexOf(httpError.status) > -1) {
                                    this.snackBarSvc.openSnackBar('server_5xx');
                                } else if (httpError.status === 404) {
                                    this.snackBarSvc.openSnackBar('not_found');
                                } else if (httpError.status === 403) {
                                    this.snackBarSvc.openSnackBar('server_403');
                                } else if (httpError.status === 400) {
                                    this.snackBarSvc.openSnackBar('server_400');
                                } else if (httpError.status === 0) {
                                    this.snackBarSvc.openSnackBar('net_error');
                                } else {
                                }
                                return throwError(errorNew);
                            }
                            return throwError(errorNew);
                        }));
                    } else if (httpError.status === 400) {
                        this.snackBarSvc.openSnackBar('server_400');
                    } else if (httpError.status === 0) {
                        this.snackBarSvc.openSnackBar('net_error');
                    } else {
                    }
                    return throwError(error);
                } else {
                    /**
                     * angular in memory api does not return type of HttpErrorResponse when 404 not found
                     */
                    return throwError(error);
                }
            })
        );
    }
}
