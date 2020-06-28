import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public defaultSortBy = 'price';
    public defaultSortOrder = 'asc';
    public filterForm: FormGroup = new FormGroup({
        sortBy: new FormControl('', [])
    });
    constructor(private productSvc: ProductService) {
        this.filterForm.get('sortBy').valueChanges.pipe(switchMap(next => {
            if (next === 'price_low_to_high') {
                this.defaultSortBy = 'price';
                this.defaultSortOrder = 'asc';
            } else if (next === 'price_high_to_low') {
                this.defaultSortBy = 'price'
                this.defaultSortOrder = 'desc';
            } else if (next === 'name_A_Z') {
                this.defaultSortBy = 'name'
                this.defaultSortOrder = 'asc';
            } else if (next === 'name_Z_A') {
                this.defaultSortBy = 'name'
                this.defaultSortOrder = 'desc';
            } else {
                throw new Error('unknown sort type ' + next);
            }
            return this.productSvc.httpProxy.netImpl.searchByCategory(this.productSvc.currentCategory.attributesKey, 0, 20, this.defaultSortBy, this.defaultSortOrder);
        })).subscribe(next => {
            this.productSvc.productSimpleList = next.data;
        });
    }
}
