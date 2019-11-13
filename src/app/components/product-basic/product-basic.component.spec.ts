import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBasicComponent } from './product-basic.component';

describe('ProductBasicComponent', () => {
    let component: ProductBasicComponent;
    let fixture: ComponentFixture<ProductBasicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductBasicComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductBasicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
