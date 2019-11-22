import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLyricsComponent } from './complete-lyrics.component';

describe('CompleteLyricsComponent', () => {
  let component: CompleteLyricsComponent;
  let fixture: ComponentFixture<CompleteLyricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteLyricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteLyricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
