import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterComponent } from './chapter.component';
import { LoadingComponent } from '../loading/loading.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChapterComponent', () => {
  let component: ChapterComponent;
  let fixture: ComponentFixture<ChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterComponent, LoadingComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
