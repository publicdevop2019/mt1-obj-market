import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFilterComponent } from './form-filter.component';

describe('FormFilterComponent', () => {
    let component: FormFilterComponent;
    let fixture: ComponentFixture<FormFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormFilterComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
