import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsItemsComponent } from './products-items.component';

describe('ProductsItemsComponent', () => {
  let component: ProductsItemsComponent;
  let fixture: ComponentFixture<ProductsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
