import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomcardDbComponent } from './customcard-db.component';

describe('CustomcardDbComponent', () => {
  let component: CustomcardDbComponent;
  let fixture: ComponentFixture<CustomcardDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomcardDbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomcardDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
