import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSSEComponent } from './episode-sse.component';

describe('EpisodeSeComponent', () => {
  let component: EpisodeSSEComponent;
  let fixture: ComponentFixture<EpisodeSSEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeSSEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeSSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
