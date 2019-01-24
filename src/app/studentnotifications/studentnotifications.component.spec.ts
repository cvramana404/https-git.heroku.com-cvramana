import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentnotificationsComponent } from './studentnotifications.component';

describe('StudentnotificationsComponent', () => {
  let component: StudentnotificationsComponent;
  let fixture: ComponentFixture<StudentnotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentnotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
