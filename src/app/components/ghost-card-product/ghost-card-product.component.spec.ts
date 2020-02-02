import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostCardProductComponent } from './ghost-card-product.component';

describe('GhostCardProductComponent', () => {
  let component: GhostCardProductComponent;
  let fixture: ComponentFixture<GhostCardProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostCardProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostCardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
