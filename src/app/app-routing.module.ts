import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'student-side-courses-page',
    loadChildren: () =>
      import(
        './student-side-courses-page/student-side-courses-page.module'
      ).then((m) => m.StudentSideCoursesPageModule),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },

  {
    path: 'sign-up',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },

  {
    path: 'course-content',
    loadChildren: () =>
      import('./course-content/course-content.module').then(
        (m) => m.CourseContentPageModule
      ),
  },
  {
    path: 'weekly-course',
    loadChildren: () =>
      import('./prof/weekly-course/weekly-course.module').then(
        (m) => m.WeeklyCoursePageModule
      ),
  },
  {
    path: 'm-prof',
    loadChildren: () =>
      import('./prof/m-prof/m-prof.module').then((m) => m.MProfPageModule),
  },
  {
    path: 'prof-course-content/:courseId',
    loadChildren: () =>
      import('./prof/prof-course-content/prof-course-content.module').then(
        (m) => m.ProfCourseContentPageModule
      ),
  },
  {
    path: 'update-week',
    loadChildren: () =>
      import('./prof/update-week/update-week.module').then(
        (m) => m.UpdateWeekPageModule
      ),
  },
  {
    path: 'add-new-week',
    loadChildren: () =>
      import('./prof/add-new-week/add-new-week.module').then(
        (m) => m.AddNewWeekPageModule
      ),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then(
        (m) => m.EditProfilePageModule
      ),
  },

  {
    path: 'add-new-task',
    loadChildren: () =>
      import('./add-new-task/add-new-task.module').then(
        (m) => m.AddNewTaskPageModule
      ),
  },
  {
    path: 'update-task',
    loadChildren: () =>
      import('./update-task/update-task.module').then(
        (m) => m.UpdateTaskPageModule
      ),
  },

  {
    path: 'createblog',
    loadChildren: () =>
      import('./createblog/createblog.module').then(
        (m) => m.CreateblogPageModule
      ),
  },
  {
    path: 'update-blog',
    loadChildren: () =>
      import('./update-blog/update-blog.module').then(
        (m) => m.UpdateBlogPageModule
      ),
  },
  {
    path: 'todo-home',
    loadChildren: () =>
      import('./todo-home/todo-home.module').then((m) => m.TodoHomePageModule),
  },
  {
    path: 'blog-content/:blogId',
    loadChildren: () =>
      import('./blog-content/blog-content.module').then(
        (m) => m.BlogContentPageModule
      ),
  },
  {
    path: 'add-professor',
    loadChildren: () =>
      import('./add-professor/add-professor.module').then(
        (m) => m.AddProfessorPageModule
      ),
  },
  {
    path: 'add-student',
    loadChildren: () =>
      import('./add-student/add-student.module').then(
        (m) => m.AddStudentPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'professor-profile/:id',
    loadChildren: () =>
      import('./professor-profile/professor-profile.module').then(
        (m) => m.ProfessorProfilePageModule
      ),
  },
  {
    path: 'student-profile/:id',
    loadChildren: () =>
      import('./student-profile/student-profile.module').then(
        (m) => m.StudentProfilePageModule
      ),
  },
  {
    path: 'course-register/:studentId/:studentFirstName/:email',
    loadChildren: () =>
      import('./course-register/course-register.module').then(
        (m) => m.CourseRegisterPageModule
      ),
  },
  {
    path: 'enrolled-students/:courseId/:courseName',
    loadChildren: () =>
      import('./enrolled-students/enrolled-students.module').then(
        (m) => m.EnrolledStudentsPageModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
