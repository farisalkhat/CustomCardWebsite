import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckMasterComponent } from './deck-master.component';

describe('DeckMasterComponent', () => {
  let component: DeckMasterComponent;
  let fixture: ComponentFixture<DeckMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
