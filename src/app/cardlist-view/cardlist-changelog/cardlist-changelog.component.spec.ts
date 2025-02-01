import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlistChangelogComponent } from './cardlist-changelog.component';

describe('CardlistChangelogComponent', () => {
  let component: CardlistChangelogComponent;
  let fixture: ComponentFixture<CardlistChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlistChangelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlistChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
