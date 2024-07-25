import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectDemoComponent } from './multiselect-demo.component';

describe('MultiselectDemoComponent', () => {
  let component: MultiselectDemoComponent;
  let fixture: ComponentFixture<MultiselectDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiselectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
