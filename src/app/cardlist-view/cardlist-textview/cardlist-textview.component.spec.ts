import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistTextviewComponent } from './cardlist-textview.component';

describe('CardlistTextviewComponent', () => {
  let component: CardlistTextviewComponent;
  let fixture: ComponentFixture<CardlistTextviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistTextviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistTextviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
