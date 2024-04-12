import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DustingCollectionComponent } from './dusting-collection.component';

describe('DustingCollectionComponent', () => {
  let component: DustingCollectionComponent;
  let fixture: ComponentFixture<DustingCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DustingCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DustingCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
