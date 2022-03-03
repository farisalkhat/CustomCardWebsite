import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDbComponent } from './download-db.component';

describe('DownloadDbComponent', () => {
  let component: DownloadDbComponent;
  let fixture: ComponentFixture<DownloadDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
