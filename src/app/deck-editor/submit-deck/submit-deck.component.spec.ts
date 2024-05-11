import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDeckComponent } from './submit-deck.component';

describe('SubmitDeckComponent', () => {
  let component: SubmitDeckComponent;
  let fixture: ComponentFixture<SubmitDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
