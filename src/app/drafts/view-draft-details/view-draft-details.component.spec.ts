import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDraftDetailsComponent } from './view-draft-details.component';

describe('ViewDraftDetailsComponent', () => {
  let component: ViewDraftDetailsComponent;
  let fixture: ComponentFixture<ViewDraftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDraftDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDraftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
