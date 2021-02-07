import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductListService } from './product.service';
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
    public sortBy = 'lowestPrice';
    public sortOrder = 'asc';
    public applyFilter: Subject<void> = new Subject();
    public filterForm: FormGroup = new FormGroup({
        sortBy: new FormControl('', []),
        filterValue: new FormControl([], []),
    });
    constructor(private productSvc: ProductListService, private httpProxy: HttpProxyService) {
        this.filterForm.get('sortBy').valueChanges.subscribe(next => {
            if (next === 'price_low_to_high') {
                this.sortBy = 'lowestPrice';
                this.sortOrder = 'asc';
            } else if (next === 'price_high_to_low') {
                this.sortBy = 'lowestPrice'
                this.sortOrder = 'desc';
            } else if (next === 'name_A_Z') {
                this.sortBy = 'name'
                this.sortOrder = 'asc';
            } else if (next === 'name_Z_A') {
                this.sortBy = 'name'
                this.sortOrder = 'desc';
            } else if (next === 'sales_low_to_high') {
                this.sortBy = 'sales'
                this.sortOrder = 'asc';
            } else if (next === 'sales_high_to_low') {
                this.sortBy = 'sales'
                this.sortOrder = 'desc';
            } else {
                throw new Error('unknown sort type ' + next);
            }
        });
    }
    public getFilterForCatalog() {
        return this.httpProxy.getFilterForCatalog(this.productSvc.currentCategory.id)
    }

}
