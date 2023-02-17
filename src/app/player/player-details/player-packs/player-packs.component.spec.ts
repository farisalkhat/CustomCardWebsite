import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPacksComponent } from './player-packs.component';

describe('PlayerPacksComponent', () => {
  let component: PlayerPacksComponent;
  let fixture: ComponentFixture<PlayerPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
