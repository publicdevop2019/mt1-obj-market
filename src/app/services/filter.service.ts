import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './product.service';
import { HttpProxyService } from './http-proxy.service';
import { Subject } from 'rxjs';
export interface IFilterDetails {
    data: IFilter[]
}
export interface IFilter {
    id: number,
    name: string,
    values: string[]
}
@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public filter: IFilter[] = []
    public defaultSortBy = 'price';
    public defaultSortOrder = 'asc';
    public applyFilter: Subject<void> = new Subject();
    public filterForm: FormGroup = new FormGroup({
        sortBy: new FormControl('', []),
        filterValue: new FormControl([], []),
    });
    constructor(private productSvc: ProductService, private httpProxy: HttpProxyService) {
        // this.filterForm.get('sortBy').valueChanges.pipe(switchMap(next => {
        //     if (next === 'price_low_to_high') {
        //         this.defaultSortBy = 'price';
        //         this.defaultSortOrder = 'asc';
        //     } else if (next === 'price_high_to_low') {
        //         this.defaultSortBy = 'price'
        //         this.defaultSortOrder = 'desc';
        //     } else if (next === 'name_A_Z') {
        //         this.defaultSortBy = 'name'
        //         this.defaultSortOrder = 'asc';
        //     } else if (next === 'name_Z_A') {
        //         this.defaultSortBy = 'name'
        //         this.defaultSortOrder = 'desc';
        //     } else {
        //         throw new Error('unknown sort type ' + next);
        //     }
        //     return this.productSvc.httpProxy.searchByCatalog(this.productSvc.currentCategory.attributes, 0, 20, this.defaultSortBy, this.defaultSortOrder);
        // })).subscribe(next => {
        //     // this.productSvc.productSimpleList = next.data;
        // });
    }
    public getFilterForCatalog() {
        return this.httpProxy.getFilterForCatalog(this.productSvc.currentCategory.id)
    }

}
