import { Component, OnInit } from '@angular/core';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
export interface ICategory {
    title: string;
    routerUrl: string;
}
export interface ICategoryCard {
    title: string;
}
export interface ICategoryNet {
    categoryList: ICategoryCard[];
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
            .subscribe(next => (this.categoriesConfig = next.categoryList.map(e => <ICategory>{ title: e.title, routerUrl: '/categories/' + e.title })));
    }

    ngOnInit() { }
}
