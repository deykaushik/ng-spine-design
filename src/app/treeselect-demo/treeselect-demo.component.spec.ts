import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeselectDemoComponent } from './treeselect-demo.component';

describe('TreeselectDemoComponent', () => {
  let component: TreeselectDemoComponent;
  let fixture: ComponentFixture<TreeselectDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeselectDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeselectDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
