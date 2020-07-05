import { Component, OnInit } from '@angular/core';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
export interface ICatalog {
    title: string;
    routerUrl: string;
}
export interface ICatalogCard {
    name: string;
    attributesKey:string[];
}
export interface ICatalogNet {
    data: ICatalogCard[];
}
@Component({
    selector: 'app-catalog-list',
    templateUrl: './catalog-list.component.html',
    styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
    public catalogsConfig: ICatalog[];
    constructor(
        private httpProxy: HttpProxyService
    ) {
        this.httpProxy.netImpl
            .getCatalog()
            .subscribe(next => (this.catalogsConfig = next.data.map(e => <ICatalog>{ title: e.name, routerUrl: '/catalogs/' + e.name })));
    }

    ngOnInit() { }
}
