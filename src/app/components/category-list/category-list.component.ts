import { Component, OnInit } from '@angular/core';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
export interface ICategory {
    title: string;
    routerUrl: string;
}
export interface ICategoryCard {
    name: string;
    attributesKey:string[];
}
export interface ICategoryNet {
    data: ICategoryCard[];
}
@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    public categoriesConfig: ICategory[];
    constructor(
        private httpProxy: HttpProxyService
    ) {
        this.httpProxy.netImpl
            .getCategory()
            .subscribe(next => (this.categoriesConfig = next.data.map(e => <ICategory>{ title: e.name, routerUrl: '/categories/' + e.name })));
    }

    ngOnInit() { }
}
