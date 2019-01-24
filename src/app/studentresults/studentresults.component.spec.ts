import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentresultsComponent } from './studentresults.component';

describe('StudentresultsComponent', () => {
  let component: StudentresultsComponent;
  let fixture: ComponentFixture<StudentresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
