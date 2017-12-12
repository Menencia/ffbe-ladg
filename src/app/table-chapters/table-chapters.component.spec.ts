import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChaptersComponent } from './table-chapters.component';

describe('TableChaptersComponent', () => {
  let component: TableChaptersComponent;
  let fixture: ComponentFixture<TableChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChaptersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
