import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCardImagesComponent } from './upload-card-images.component';

describe('UploadCardImagesComponent', () => {
  let component: UploadCardImagesComponent;
  let fixture: ComponentFixture<UploadCardImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCardImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCardImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
