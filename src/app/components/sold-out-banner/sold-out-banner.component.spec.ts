import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldOutBannerComponent } from './sold-out-banner.component';

describe('SoldOutBannerComponent', () => {
  let component: SoldOutBannerComponent;
  let fixture: ComponentFixture<SoldOutBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldOutBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldOutBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
