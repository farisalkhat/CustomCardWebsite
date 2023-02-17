import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCollectionComponent } from './player-collection.component';

describe('PlayerCollectionComponent', () => {
  let component: PlayerCollectionComponent;
  let fixture: ComponentFixture<PlayerCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
