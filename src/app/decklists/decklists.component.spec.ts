import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklistsComponent } from './decklists.component';

describe('DecklistsComponent', () => {
  let component: DecklistsComponent;
  let fixture: ComponentFixture<DecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
