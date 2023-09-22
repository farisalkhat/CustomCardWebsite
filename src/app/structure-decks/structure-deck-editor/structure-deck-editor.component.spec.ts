import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDeckEditorComponent } from './structure-deck-editor.component';

describe('StructureDeckEditorComponent', () => {
  let component: StructureDeckEditorComponent;
  let fixture: ComponentFixture<StructureDeckEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDeckEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDeckEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
