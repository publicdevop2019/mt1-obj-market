import { Injectable } from '@angular/core';
import { ICatalogCard } from '../components/catalog-list/catalog-list.component';
import { HttpProxyService } from './http-proxy.service';

@Injectable({
    providedIn: 'root'
})
export class ProductListService {
    public currentCategory: ICatalogCard;
    constructor(public httpProxy: HttpProxyService) { }
}
