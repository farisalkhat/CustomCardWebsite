import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindersComponent } from './binders.component';

describe('BindersComponent', () => {
  let component: BindersComponent;
  let fixture: ComponentFixture<BindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
