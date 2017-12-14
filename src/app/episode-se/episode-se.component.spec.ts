import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSEComponent } from './episode-se.component';

describe('EpisodeSeComponent', () => {
  let component: EpisodeSEComponent;
  let fixture: ComponentFixture<EpisodeSEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeSEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeSEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
