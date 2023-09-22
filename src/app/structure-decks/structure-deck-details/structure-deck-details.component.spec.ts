import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDeckDetailsComponent } from './structure-deck-details.component';

describe('StructureDeckDetailsComponent', () => {
  let component: StructureDeckDetailsComponent;
  let fixture: ComponentFixture<StructureDeckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDeckDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDeckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
