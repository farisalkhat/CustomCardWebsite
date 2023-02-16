import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNavigationComponent } from './player-navigation.component';

describe('PlayerNavigationComponent', () => {
  let component: PlayerNavigationComponent;
  let fixture: ComponentFixture<PlayerNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
