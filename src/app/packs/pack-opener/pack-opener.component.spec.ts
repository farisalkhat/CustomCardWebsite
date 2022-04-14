import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackOpenerComponent } from './pack-opener.component';

describe('PackOpenerComponent', () => {
  let component: PackOpenerComponent;
  let fixture: ComponentFixture<PackOpenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackOpenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
