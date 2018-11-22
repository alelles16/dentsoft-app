import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistsPage } from './dentists.page';

describe('DentistsPage', () => {
  let component: DentistsPage;
  let fixture: ComponentFixture<DentistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentistsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
