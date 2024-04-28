import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'student-side-courses-page',
        loadChildren: () =>
          import(
            '../student-side-courses-page/student-side-courses-page.module'
          ).then((m) => m.StudentSideCoursesPageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'tab4',
        loadChildren: () =>
          import('../tab4/tab4.module').then((m) => m.Tab4PageModule),
      },
      {
        path: 'tab5',
        loadChildren: () =>
          import('../tab5/tab5.module').then((m) => m.Tab5PageModule),
      },
      {
        path: 'tab6',
        loadChildren: () =>
          import('../tab6/tab6.module').then((m) => m.Tab6PageModule),
      },
      {
        path: 'tab7',
        loadChildren: () =>
          import('../tab7/tab7.module').then((m) => m.Tab7PageModule),
      },
      {
        path: 'tab8',
        loadChildren: () =>
          import('../tab8/tab8.module').then((m) => m.Tab8PageModule),
      },
      {
        path: 'tab9',
        loadChildren: () =>
          import('../tab9/tab9.module').then((m) => m.Tab9PageModule),
      },
      {
        path: 'tab10',
        loadChildren: () =>
          import('../tab10/tab10.module').then((m) => m.Tab10PageModule),
      },

      {
        path: 'tab11',
        loadChildren: () =>
          import('../tab11/tab11.module').then((m) => m.Tab11PageModule),
      },
      {
        path: '',
        redirectTo: '/student-side-courses-page',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/student-side-courses-page',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
