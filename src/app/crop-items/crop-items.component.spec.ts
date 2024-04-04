import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropItemsComponent } from './crop-items.component';

describe('CropItemsComponent', () => {
  let component: CropItemsComponent;
  let fixture: ComponentFixture<CropItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CropItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
