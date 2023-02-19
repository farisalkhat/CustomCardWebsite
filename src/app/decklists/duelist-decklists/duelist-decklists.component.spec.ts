import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelistDecklistsComponent } from './duelist-decklists.component';

describe('DuelistDecklistsComponent', () => {
  let component: DuelistDecklistsComponent;
  let fixture: ComponentFixture<DuelistDecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelistDecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuelistDecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
