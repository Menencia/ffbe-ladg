import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryEventComponent } from './story-event.component';

describe('StoryEventComponent', () => {
  let component: StoryEventComponent;
  let fixture: ComponentFixture<StoryEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
