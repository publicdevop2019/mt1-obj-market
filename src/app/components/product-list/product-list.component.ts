import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProductSimpleNet } from 'src/app/classes/net.interface';
import { IProductSimple } from 'src/app/pages/product-detail/product-detail.component';
import { FilterService } from 'src/app/services/filter.service';
import { GhostService } from 'src/app/services/ghost.service';
import { ProductService } from 'src/app/services/product.service';
import { ICatalogCard } from '../catalog-list/catalog-list.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    endOfPages = false;
    private pageNum = -1;
    private pageSize = 20;
    private sub1: Subscription;
    public productSimpleList: IProductSimple[];
    private catalogs: ICatalogCard[];
    constructor(
        public productSvc: ProductService,
        private activatedRoute: ActivatedRoute,
        private ghostSvc: GhostService,
        private filterSvc: FilterService
    ) {
    }

    ngOnInit() {
        this.sub1 = this.ghostSvc.productCardGhostObser
            .pipe(switchMap(() => {
                return this.getProductOb();
            })).subscribe(next => {
                if (next.data.length < this.pageSize)
                    this.endOfPages = true;
                if (!this.productSimpleList)
                    this.productSimpleList = [];
                this.productSimpleList.push(...next.data);
            })
    }
    ngOnDestroy(): void {
        if (this.sub1)
            this.sub1.unsubscribe();
    }
    private getProductOb(): Observable<IProductSimpleNet> {
        this.pageNum++;
        return this.activatedRoute.paramMap.pipe(
            switchMap((params: ParamMap) => {
                if (params.get('catalog')) {
                    return this.productSvc.httpProxy.netImpl.getCatalog()
                        .pipe(switchMap(next => {
                            this.catalogs = next.data;
                            let var1 = next.data.find(e => e.name === params.get('catalog'));
                            return this.productSvc.httpProxy.netImpl.searchByCatalog(this.loadAttributes(var1), this.pageNum, this.pageSize, this.filterSvc.defaultSortBy, this.filterSvc.defaultSortOrder)
                        }))
                } else {
                    return this.firstCategory().pipe(switchMap(first => {
                        return this.productSvc.httpProxy.netImpl.searchByCatalog(this.loadAttributes(first), this.pageNum, this.pageSize, this.filterSvc.defaultSortBy, this.filterSvc.defaultSortOrder)
                    }))
                }
            }));
    }
    private firstCategory(): Observable<ICatalogCard> {
        return this.productSvc.httpProxy.netImpl
            .getCatalog().pipe(switchMap(next => {
                this.catalogs = next.data;
                return of(next.data[0])
            }))
    }
    public loadAttributes(attr: ICatalogCard) {
        let tags: string[] = [];
        tags.push(...attr.attributesKey);
        while (attr.parentId !== null && attr.parentId !== undefined) {
            let nextId = attr.parentId;
            attr = this.catalogs.find(e => e.id === nextId);
            tags.push(...attr.attributesKey);
        }
        return tags;
    }
}
