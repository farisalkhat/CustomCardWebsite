import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDeckEditorComponent } from './collection-deck-editor.component';

describe('CollectionDeckEditorComponent', () => {
  let component: CollectionDeckEditorComponent;
  let fixture: ComponentFixture<CollectionDeckEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionDeckEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDeckEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
