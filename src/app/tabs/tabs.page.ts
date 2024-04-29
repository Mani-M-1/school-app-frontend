// // old logic

// import { Component } from '@angular/core';
// import { NavigationEnd, Router } from '@angular/router';
// import { RoleService } from '../role.service';

// @Component({
//   selector: 'app-tabs',
//   templateUrl: 'tabs.page.html',
//   styleUrls: ['tabs.page.scss'],
// })
// export class TabsPage {
//   isStudent = false;
//   isPrincipal = false;
//   isProfessor = false;

//   constructor(private roleService: RoleService, private router: Router) {}

//   ngOnInit() {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         const userRole = this.roleService.getUserRole();
//         console.log(`tabs page - role: ${userRole}`);
//         if (userRole) {
//           this.updateTabsVisibility(userRole);
//         }
//       }
//     });
//   }

//   private updateTabsVisibility(userRole: string) {
//     this.isStudent = userRole === 'student';
//     this.isProfessor = userRole === 'professor';
//     this.isPrincipal = userRole === 'principal';

//     console.log(`tabs page - isStudent:${this.isStudent}`);
//     console.log(`tabs page - isProfessor:${this.isProfessor}`);
//     console.log(`tabs page - isPrincipal:${this.isPrincipal}`);
//   }
// }

// latest logic

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isStudent = false;
  isPrincipal = false;
  isProfessor = false;
  isAdmin = false;

  // for checking "userRole"
  isRoleChecked = false;

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit() {
    // Check user role when component initializes
    this.checkUserRole();

    // Subscribe to router events to update role if necessary
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUserRole();
      }
    });
  }

  private checkUserRole() {
    const url = this.router.url;
    console.log('Current URL Path:', url);

    const userRole = this.roleService.getUserRole();
    if (userRole) {
      this.updateTabsVisibility(userRole);
      this.isRoleChecked = true;
    } else if (url !== '/forgot-password') {
      // avoiding navigation to "sign-in" page when we click on forgot-password button in sign-in page
      this.router.navigate(['/sign-in']);
    }
  }

  private updateTabsVisibility(userRole: string) {
    this.isStudent = userRole === 'student';
    this.isProfessor = userRole === 'professor';
    this.isPrincipal = userRole === 'principal';
    this.isAdmin = userRole === 'admin';

    console.log(`tabs page - isStudent:${this.isStudent}`);
    console.log(`tabs page - isProfessor:${this.isProfessor}`);
    console.log(`tabs page - isPrincipal:${this.isPrincipal}`);
    console.log(`tabs page - isAdmin:${this.isAdmin}`);
  }
}
