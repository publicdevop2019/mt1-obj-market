import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { INet } from '../classes/net.interface';
import { OfflineNetImpl } from '../classes/offline-net.impl';
import { HttpClient } from '@angular/common/http';
import { OnlineNetImpl } from '../classes/online-net.impl';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';

@Injectable({
    providedIn: 'root'
})
export class HttpProxyService {
    public netImpl: INet;
    public inProgress = false;
    constructor(private http: HttpClient, private authSvc: AuthService, private themeSvc: ThemeService) {
        this.netImpl = new OnlineNetImpl(this.http, this.authSvc, this.themeSvc);
        // if (environment.mode === 'offline') {
        //     this.netImpl = new OfflineNetImpl(this.http, this.authSvc);
        // } else {
        //     this.netImpl = new OnlineNetImpl(this.http, this.authSvc, this.themeSvc);
        // }
    }
}
