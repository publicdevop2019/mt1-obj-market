import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCartComponent } from './card-cart.component';

describe('CartItemComponent', () => {
    let component: CardCartComponent;
    let fixture: ComponentFixture<CardCartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CardCartComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardCartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
