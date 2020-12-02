import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtopicsComponent } from './addtopics.component';

describe('AddtopicsComponent', () => {
  let component: AddtopicsComponent;
  let fixture: ComponentFixture<AddtopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
