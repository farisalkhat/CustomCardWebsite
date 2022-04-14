import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackMakerComponent } from './pack-maker.component';

describe('PackMakerComponent', () => {
  let component: PackMakerComponent;
  let fixture: ComponentFixture<PackMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
