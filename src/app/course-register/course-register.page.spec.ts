import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CourseRegisterPage } from './course-register.page';

describe('CourseRegisterPage', () => {
  let component: CourseRegisterPage;
  let fixture: ComponentFixture<CourseRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CourseRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
