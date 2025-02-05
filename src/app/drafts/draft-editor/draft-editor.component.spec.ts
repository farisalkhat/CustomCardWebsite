import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftEditorComponent } from './draft-editor.component';

describe('DraftEditorComponent', () => {
  let component: DraftEditorComponent;
  let fixture: ComponentFixture<DraftEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
