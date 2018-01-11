import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSpecialComponent } from './table-special.component';

describe('TableSpecialComponent', () => {
  let component: TableSpecialComponent;
  let fixture: ComponentFixture<TableSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
