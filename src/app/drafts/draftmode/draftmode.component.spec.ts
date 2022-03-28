import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftmodeComponent } from './draftmode.component';

describe('DraftmodeComponent', () => {
  let component: DraftmodeComponent;
  let fixture: ComponentFixture<DraftmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftmodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
