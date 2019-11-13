import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAddressComponent } from './card-address.component';

describe('AddressCardComponent', () => {
    let component: CardAddressComponent;
    let fixture: ComponentFixture<CardAddressComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardAddressComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
