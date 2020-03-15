import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderComponent } from './card-order.component';

describe('OrderCardComponent', () => {
    let component: CardOrderComponent;
    let fixture: ComponentFixture<CardOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardOrderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
