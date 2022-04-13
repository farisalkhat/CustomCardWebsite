import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMakerComponent } from './draft-maker.component';

describe('DraftMakerComponent', () => {
  let component: DraftMakerComponent;
  let fixture: ComponentFixture<DraftMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
