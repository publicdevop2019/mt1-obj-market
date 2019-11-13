import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetPaymentPickerComponent } from './bottom-sheet-payment-picker.component';

describe('BottomSheetPaymentPickerComponent', () => {
    let component: BottomSheetPaymentPickerComponent;
    let fixture: ComponentFixture<BottomSheetPaymentPickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BottomSheetPaymentPickerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BottomSheetPaymentPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
