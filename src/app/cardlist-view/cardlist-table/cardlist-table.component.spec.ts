import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistTableComponent } from './cardlist-table.component';

describe('CardlistTableComponent', () => {
  let component: CardlistTableComponent;
  let fixture: ComponentFixture<CardlistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
