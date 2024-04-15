import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isStudent = false;
  isPrincipal = false;
  isProfessor = false;

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const userRole = this.roleService.getUserRole();
        console.log(`tabs page - role: ${userRole}`);
        if (userRole) {
          this.updateTabsVisibility(userRole);
        }
      }
    });
  }

  private updateTabsVisibility(userRole: string) {
    this.isStudent = userRole === 'student';
    this.isProfessor = userRole === 'professor';
    this.isPrincipal = userRole === 'principal';

    console.log(`tabs page - isStudent:${this.isStudent}`);
    console.log(`tabs page - isProfessor:${this.isProfessor}`);
    console.log(`tabs page - isPrincipal:${this.isPrincipal}`);
  }
}
