import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportxmlComponent } from './exportxml.component';

describe('ExportxmlComponent', () => {
  let component: ExportxmlComponent;
  let fixture: ComponentFixture<ExportxmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportxmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportxmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
