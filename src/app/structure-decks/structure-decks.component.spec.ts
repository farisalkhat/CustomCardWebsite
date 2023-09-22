import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDecksComponent } from './structure-decks.component';

describe('StructureDecksComponent', () => {
  let component: StructureDecksComponent;
  let fixture: ComponentFixture<StructureDecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureDecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
