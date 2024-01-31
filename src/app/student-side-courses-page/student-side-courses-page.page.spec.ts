import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StudentSideCoursesPage } from './student-side-courses-page.page';

describe('StudentSideCoursesPage', () => {
  let component: StudentSideCoursesPage;
  let fixture: ComponentFixture<StudentSideCoursesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSideCoursesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSideCoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
