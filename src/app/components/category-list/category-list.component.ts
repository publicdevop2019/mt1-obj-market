import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProxyService } from 'src/app/services/http-proxy.service';
export interface ICategory {
    url: string;
    title: string;
    routerUrl: string;
}
export interface ICategoryNet {
    url: string;
    title: string;
}
@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    public categoriesConfig: ICategory[];
    public isHomePage = false;
    public isCategories = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private httpProxy: HttpProxyService
    ) {
        this.activatedRoute.data.subscribe(next => {
            if (next.listView === 'simple') {
                this.isHomePage = true;
            } else if (next.listView === 'full') {
                this.isCategories = true;
            } else {
                throw new Error('unknown page found');
            }
        });
        this.httpProxy.netImpl
            .getCategory()
            .subscribe(next => (this.categoriesConfig = next.map(e=><ICategory>{title:e.title,url:e.url,routerUrl: '/categories/' + e.title})));
    }

    ngOnInit() {}
}
