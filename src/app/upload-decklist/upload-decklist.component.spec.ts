import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDecklistComponent } from './upload-decklist.component';

describe('UploadDecklistComponent', () => {
  let component: UploadDecklistComponent;
  let fixture: ComponentFixture<UploadDecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
