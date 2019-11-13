import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    public filterForm: FormGroup = new FormGroup({
        sortBy: new FormControl('', [])
    });
    constructor(private productSvc: ProductService) {
        this.filterForm.get('sortBy').valueChanges.subscribe(value => {
            if (value === 'price_low_to_high') {
                this.productSvc.productSimpleList.sort((a, b) => {
                    return +a.price - +b.price;
                });
            } else if (value === 'price_high_to_low') {
                this.productSvc.productSimpleList.sort((a, b) => {
                    return +b.price - +a.price;
                });
            } else {
                throw new Error('unknown sort type ' + value);
            }
        });
    }
}
