import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDeckMakerComponent } from './structure-deck-maker.component';

describe('StructureDeckMakerComponent', () => {
  let component: StructureDeckMakerComponent;
  let fixture: ComponentFixture<StructureDeckMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDeckMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDeckMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
