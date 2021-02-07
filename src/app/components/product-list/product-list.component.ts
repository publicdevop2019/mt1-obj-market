import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProductSimple } from 'src/app/pages/product-detail/product-detail.component';
import { FilterService } from 'src/app/services/filter.service';
import { GhostService } from 'src/app/services/ghost.service';
import { ProductListService } from 'src/app/services/product.service';
import { ICatalogCard } from '../catalog-list/catalog-list.component';
import { IProductSimpleNet } from 'src/app/services/http-proxy.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    endOfPages = false;
    private pageNum = -1;
    private pageSize = 20;
    private subs: Subscription = new Subscription();
    public productSimpleList: IProductSimple[];
    private catalogs: ICatalogCard[];
    constructor(
        public productSvc: ProductListService,
        private activatedRoute: ActivatedRoute,
        private ghostSvc: GhostService,
        private filterSvc: FilterService
    ) {
    }

    ngOnInit() {
        this.filterSvc.filterForm.get('filterValue').reset([])
        const sub = this.ghostSvc.productCardGhostObser
            .pipe(switchMap(() => {
                return this.getProductOb();
            })).subscribe(next => {
                if (next.data.length < this.pageSize) {
                    this.endOfPages = true;
                }
                if (!this.productSimpleList) {
                    this.productSimpleList = [];
                }
                this.productSimpleList.push(...next.data);
            })
        const sub2 = this.filterSvc.applyFilter.subscribe(() => {
            let filterValue = this.filterSvc.filterForm.get('filterValue').value as string[];
            filterValue = this.combileSame(filterValue)
            const defaultValue = this.loadAttributes(this.productSvc.currentCategory);
            defaultValue.push(...filterValue)
            this.productSvc.httpProxy.searchByAttributes(defaultValue,
                this.pageNum, this.pageSize, this.filterSvc.sortBy, this.filterSvc.sortOrder).subscribe(next => {
                    this.productSimpleList = next.data
                })
        })
        this.subs.add(sub)
        this.subs.add(sub2)
    }
    combileSame(filterValue: string[]): string[] {
        const key = filterValue.map(e => e.split(':')[0]);
        const ret: Set<string> = new Set(key);
        const var1: string[] = []
        ret.forEach(e => {
            const combined = filterValue.filter(el => el.includes(e + ':')).map(ee => ee.split(':')[1]).join('.');
            var1.push(e + ':' + combined)
        });
        return var1;
    }
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
    private getProductOb(): Observable<IProductSimpleNet> {
        this.pageNum++;
        return this.activatedRoute.paramMap.pipe(
            switchMap((params: ParamMap) => {
                if (params.get('catalog')) {
                    return this.productSvc.httpProxy.getCatalog()
                        .pipe(switchMap(next => {
                            this.catalogs = next.data;
                            const var1 = next.data.find(e => String(e.id) === params.get('catalog'));
                            this.productSvc.currentCategory = var1;
                            return this.productSvc.httpProxy.
                                searchByAttributes(this.loadAttributes(var1),
                                    this.pageNum, this.pageSize, this.filterSvc.sortBy, this.filterSvc.sortOrder)
                        }))
                } else {
                    return this.firstCategory().pipe(switchMap(first => {
                        return this.productSvc.httpProxy.searchByAttributes(
                            this.loadAttributes(first), this.pageNum, this.pageSize, this.filterSvc.sortBy, this.filterSvc.sortOrder)
                    }))
                }
            }));
    }
    private firstCategory(): Observable<ICatalogCard> {
        return this.productSvc.httpProxy
            .getCatalog().pipe(switchMap(next => {
                this.catalogs = next.data;
                return of(next.data[0])
            }))
    }
    public loadAttributes(attr: ICatalogCard) {
        const tags: string[] = [];
        tags.push(...attr.attributes);
        while (attr.parentId !== null && attr.parentId !== undefined) {
            const nextId = attr.parentId;
            attr = this.catalogs.find(e => e.id === nextId);
            tags.push(...attr.attributes);
        }
        return tags;
    }
}
