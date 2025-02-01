import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistImageviewComponent } from './cardlist-imageview.component';

describe('CardlistImageviewComponent', () => {
  let component: CardlistImageviewComponent;
  let fixture: ComponentFixture<CardlistImageviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistImageviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistImageviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
