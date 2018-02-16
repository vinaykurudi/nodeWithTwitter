import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterDetailsComponent } from './twitter-details.component';

describe('TwitterDetailsComponent', () => {
  let component: TwitterDetailsComponent;
  let fixture: ComponentFixture<TwitterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
