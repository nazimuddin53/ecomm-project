import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDeleteProductsComponent } from './seller-delete-products.component';

describe('SellerDeleteProductsComponent', () => {
  let component: SellerDeleteProductsComponent;
  let fixture: ComponentFixture<SellerDeleteProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDeleteProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDeleteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
