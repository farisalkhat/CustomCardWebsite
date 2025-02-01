import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistViewComponent } from './cardlist-view.component';

describe('CardlistViewComponent', () => {
  let component: CardlistViewComponent;
  let fixture: ComponentFixture<CardlistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
