import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistReportComponent } from './cardlist-report.component';

describe('CardlistReportComponent', () => {
  let component: CardlistReportComponent;
  let fixture: ComponentFixture<CardlistReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
