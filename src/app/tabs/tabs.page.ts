import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  // loggedInUser: any;
  // userRole: 'student';
  isStudent = false;
  isPrincipal = false;
  isProfessor = false;
  // isLoggedin = false;
  //  selectedTab: string = 'tab1'; // Initialize with the default selected tab
  // @ViewChild(IonTabs, { static: true }) ionTabs: IonTabs;

  constructor(private roleService: RoleService, private router: Router) {
    // var role = localStorage.getItem('userRole');
    // console.log(role);
    // this.isStudent = role === 'student';
    // this.isPrincipal = role === 'principal';
    // this.isProfessor = role === 'professor';
    // if (role == 'student'){
    //   this.isStudent = true;
    // }else{
    //   this.isStudent = false;
    // }
    //this.userRole = this.roleService.getUserRole();
    //  if(role == 'student'){
    //   this.isLoggedin = false;
    //  }else if(role == 'professor'){
    //   this.isLoggedin = false;
    //  }else{
    //   this.router.navigate(['/sign-in'])
    //  }
  }

  //for tabs
  // ngAfterViewInit() {
  //   this.overrideTabContainer();
  // }

  // private overrideTabContainer() {
  //   setTimeout(() => {
  //     const routerOutlet = (this.ionTabs.outlet as any).nativeEl as HTMLElement;
  //     const container = routerOutlet.querySelector('ion-content');
  //     if (container) {
  //       container.style.setProperty('--padding-bottom', '90px');
  //     }
  //   });
  // }

  // selectTab(tabName: string) {
  //   this.selectedTab = tabName; // Update the selectedTab when a tab is clicked
  // }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const userRole = this.roleService.getUserRole();
        if (userRole) {
          this.updateTabsVisibility(userRole);
        }
      }
    });

    // const userRole = this.roleService.getUserRole();
    // console.log(userRole);
    // if (userRole) {
    //   this.updateTabsVisibility(userRole);
    // }
  }

  private updateTabsVisibility(userRole: string) {
    this.isStudent = userRole === 'student';
    this.isProfessor = userRole === 'professor';
    this.isPrincipal = userRole === 'principal';
  }
}
