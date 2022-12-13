import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductMessageComponent } from './add-product-message.component';

describe('AddProductMessageComponent', () => {
  let component: AddProductMessageComponent;
  let fixture: ComponentFixture<AddProductMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
