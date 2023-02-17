import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDecklistsComponent } from './player-decklists.component';

describe('PlayerDecklistsComponent', () => {
  let component: PlayerDecklistsComponent;
  let fixture: ComponentFixture<PlayerDecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerDecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
