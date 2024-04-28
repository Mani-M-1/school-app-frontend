import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  principals: any[] = [];

  searchValue: any = '';

  isOptionsVisible: boolean[] = [];

  isModalVisible: boolean = false; // for "details" and "edit"

  isDeleteModalVisible: boolean = false; // for "delete"

  isEditable: boolean = false;

  // principal details
  principalId: any;
  firstName: any;
  lastName: any;
  phone: any;
  email: any;
  gender: any;
  emergency: any;
  password: any;
  school: any;

  // for delete modal
  deletePrincipalDetails: any;

  constructor(private http: HttpClient, private router: Router) {
    // let login_state = localStorage.getItem('isLoggedIn');
    // let userRole = localStorage.getItem('userRole');
    // console.log(`admin panel login_state: ${login_state}`);
    // if (login_state == 'true' && userRole === 'admin') {
    //   console.log('log in is succesful');
    // } else {
    //   this.router.navigate(['/sign-in']);
    // }
  }

  ngOnInit() {
    this.getPrincipals();
  }

  showModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  closeDeleteModal() {
    console.log('delete modal');
    console.log(this.isDeleteModalVisible);
    this.isDeleteModalVisible = !this.isDeleteModalVisible;
  }

  stopEventPropogation(event: any) {
    event.stopPropagation();
  }

  stopEventPropogationInDeleteModal(event: any) {
    event.stopPropagation();
  }

  searchPrincipals(event: any) {
    this.searchValue = event.target.value;
    console.log(`searchValue: ${this.searchValue}`);

    // triggering getPrincipals for getting latest data
    this.getPrincipals();
  }

  getPrincipals() {
    console.log(`searchValue: ${this.searchValue}`);
    this.http
      .get<any>(
        `${this.apiUrl}/user/principals?searchValue=${this.searchValue}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.principals = response.principals;
          console.log(this.principals);
          // Initialize visibility state for each item
          this.isOptionsVisible = new Array(this.principals.length).fill(false);
          console.log(this.isOptionsVisible);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  optionsFunc(index: number) {
    // this.isOptionsVisible = true;
    // Toggle visibility for the clicked item
    this.isOptionsVisible[index] = !this.isOptionsVisible[index];
    console.log(index);
  }

  handleOnclickAddBtn() {
    this.router.navigate(['/add-principal']);
  }

  handleOnclickDetails(principal: any, index: number) {
    this.isOptionsVisible[index] = false;
    this.isModalVisible = true;
    this.isEditable = false;

    // setting values to show in popup
    this.firstName = principal.firstName;
    this.lastName = principal.lastName;
    this.phone = principal.mobileNo;
    this.email = principal.email;
    this.gender = principal.gender;
    this.emergency = principal.emergency;
    this.password = principal.password;
    this.school = principal.school;
  }

  handleOnclickEdit(principal: any, index: number) {
    this.isOptionsVisible[index] = false;
    this.isModalVisible = true;
    this.isEditable = true;

    // getting principal id for updation
    this.principalId = principal._id;

    // setting values to show in popup
    this.firstName = principal.firstName;
    this.lastName = principal.lastName;
    this.phone = principal.mobileNo;
    this.email = principal.email;
    this.gender = principal.gender;
    this.emergency = principal.emergency;
    this.password = principal.password;
    this.school = principal.school;
  }

  handleOnclickDelete(principal: any, index: number) {
    this.isOptionsVisible[index] = false;

    this.isDeleteModalVisible = true;

    this.deletePrincipalDetails = principal;
  }

  deletionConfirmed(principalId: any) {
    this.http
      .delete<any>(`${this.apiUrl}/user/profile/${principalId}`)
      .subscribe(
        (response) => {
          console.log(response);

          this.isDeleteModalVisible = false;
          // triggering this function to get latest data
          this.getPrincipals();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updatePrincipal() {
    // update call to backend

    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNo: this.phone,
      email: this.email,
      gender: this.gender,
      emergency: this.emergency,
      password: this.password,
      school: this.school,
    };

    this.http
      .put<any>(`${this.apiUrl}/user/profile/update/${this.principalId}`, body)
      .subscribe(
        (response) => {
          console.log(response);
          this.isModalVisible = false;

          // triggering this function to get latest data
          this.getPrincipals();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
