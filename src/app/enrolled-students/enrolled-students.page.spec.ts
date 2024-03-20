import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrolledStudentsPage } from './enrolled-students.page';

describe('EnrolledStudentsPage', () => {
  let component: EnrolledStudentsPage;
  let fixture: ComponentFixture<EnrolledStudentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnrolledStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
