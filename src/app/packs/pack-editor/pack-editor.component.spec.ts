import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackEditorComponent } from './pack-editor.component';

describe('PackEditorComponent', () => {
  let component: PackEditorComponent;
  let fixture: ComponentFixture<PackEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
