import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftFormComponent } from './draft-form.component';

describe('DraftFormComponent', () => {
  let component: DraftFormComponent;
  let fixture: ComponentFixture<DraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
