import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VariousTableMenuComponent } from './various-table-menu.component';

describe('VariousTableMenuComponent', () => {
  let component: VariousTableMenuComponent;
  let fixture: ComponentFixture<VariousTableMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariousTableMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariousTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
