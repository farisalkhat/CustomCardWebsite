import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklistDetailsComponent } from './decklist-details.component';

describe('DecklistDetailsComponent', () => {
  let component: DecklistDetailsComponent;
  let fixture: ComponentFixture<DecklistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecklistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecklistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
