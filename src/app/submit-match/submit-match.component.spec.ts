import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitMatchComponent } from './submit-match.component';

describe('SubmitMatchComponent', () => {
  let component: SubmitMatchComponent;
  let fixture: ComponentFixture<SubmitMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
