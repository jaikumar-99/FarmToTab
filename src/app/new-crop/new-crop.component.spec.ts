import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCropComponent } from './new-crop.component';

describe('NewCropComponent', () => {
  let component: NewCropComponent;
  let fixture: ComponentFixture<NewCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
