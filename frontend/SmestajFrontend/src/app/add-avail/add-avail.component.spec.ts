import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailComponent } from './add-avail.component';

describe('AddAvailComponent', () => {
  let component: AddAvailComponent;
  let fixture: ComponentFixture<AddAvailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAvailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
