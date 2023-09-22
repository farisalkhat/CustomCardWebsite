import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDeckEditComponent } from './structure-deck-edit.component';

describe('StructureDeckEditComponent', () => {
  let component: StructureDeckEditComponent;
  let fixture: ComponentFixture<StructureDeckEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDeckEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDeckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
