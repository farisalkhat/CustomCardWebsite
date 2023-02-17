import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMatchesComponent } from './player-matches.component';

describe('PlayerMatchesComponent', () => {
  let component: PlayerMatchesComponent;
  let fixture: ComponentFixture<PlayerMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
