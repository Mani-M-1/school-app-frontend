import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.page.html',
  styleUrls: ['./professor-profile.page.scss'],
})
export class ProfessorProfilePage implements OnInit {
  isEditing: boolean = false; // Add this line
  originalProfessor: any = {};
  editedProfessor: any = {};

  // professor: any = [];
  mobileNumber: any;
  firstName: any;
  lastName: any;
  subjects: any;
  email: any;
  gender: any;
  address: any;
  // professor: any;

  @ViewChild('fileInput') fileInput: ElementRef; // Using any type for now

  professorId: any;
  professor: any;
  updatedProfessor: any;

  private image: File;
  selectedFile: any;
  uploadStatus: string;
  imageUrl: any;
  updatedprofessor: any;

  chooseFile() {
    this.fileInput.nativeElement.click();
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  getprofessor() {
    this.route.params.subscribe((params) => {
      this.professorId = params['id']; // Assuming the parameter is named 'id'
      console.log(this.professorId);
    });
    this.http
      .get(
        `http://localhost:3000/addingprofessors/professors/${this.professorId}`
      )
      .subscribe(
        (response) => {
          this.professor = response;

          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    // this.getprofessor();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getprofessor();
      }
    });
  }

  // ionViewDidEnter() {
  //   this.mobileNumber = localStorage.getItem('mobileNumber');
  //   this.firstName = localStorage.getItem('firstName');
  //   this.lastName = localStorage.getItem('lastName');
  //   this.subjects = localStorage.getItem('subjects');
  //   this.email = localStorage.getItem('email');
  //   this.gender = localStorage.getItem('gender');
  //   this.address = localStorage.getItem('address');

  // }

  delete(professorData: any) {
    // console.log('clickdeletebutton')
    console.log(professorData);
    // now get the document id this professor
    let doc_id = professorData._id;
    this.http
      .delete('http://localhost:3000/addingProfessors/professors/' + doc_id)
      .subscribe((data) => {
        console.log(data);
        // Optionally, you can remove the deleted professor from the array to update the UI
        //  this.professors = this.professors.filter(
        //   (professor: any) => professor._id !== professorData
        // );
      });
    this.router.navigate(['/tabs/tab10']);
  }

  // edit(professor:any){
  //   console.log(professor[0]);
  //   this.router.navigate(['/update-professor-profile', professor[0]]);

  // }

  forgotPassword(professorPassword: any) {
    console.log(professorPassword[0]);
    this.router.navigate(['/forgotpassword1', professorPassword[0]]);
  }

  //edit function
  toggleEditMode(professor: any) {
    this.isEditing = true;
    this.editedProfessor = { ...this.professor }; // Clone the professor data for editing
    this.originalProfessor = { ...this.professor }; // Store the original professor data
  }

  cancelEdit() {
    // Discard changes and switch back to view mode
    this.isEditing = false;
    this.editedProfessor = {}; //clear the edited professor data
  }

  //we can update any profile data ,and submit save button this function will be called and data updated in database
  saveChanges() {
    // Save the edited data to the server
    this.http
      .put<any>(
        `http://localhost:3000/addingProfessors/professors/${this.professorId}`,
        this.editedProfessor
      )
      .subscribe(
        (response) => {
          console.log('professor profile updated successfully:', response);
          // Update the originalprofessor with the editedprofessor data
          // this.professor = { ...response };
          this.getprofessor();
          this.isEditing = false; // Switch back to view mode
        },
        (error) => {
          console.error('Error updating professor profile:', error);
          // Handle the error
        }
      );
  }

  // Function to handle file selection
  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Function to trigger file upload
  uploadImage(fileType: any, professor: any) {
    // var currentFile: File | null = null;

    // if(fileType == 'image'){
    // this.selectedFile = this.image
    // }

    if (!this.selectedFile) {
      console.log('No file selected.');
      return;
    }
    // Perform the file upload using HttpClient
    const formData = new FormData();
    formData.append('filename', this.selectedFile);

    this.http
      .post<any>('http://localhost:3000/addingProfessors/uploadfiles', formData)
      .subscribe(
        async (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.uploadStatus = 'File uploaded successfully';
            // Store the uploaded file URL in the variable
            // this.uploadedFileUrl = response.message;
            // //we have to call update profile function here
            console.log('Uploaded File URL:', this.selectedFile);
            let selectedFile = response.message;

            // Construct the CloudFront URL with the file name
            const CLOUDFRONT_URL = 'https://d2ax4codf16e0h.cloudfront.net/';
            selectedFile = CLOUDFRONT_URL + this.selectedFile.name;
            console.log(selectedFile);
            console.log(fileType);
            if (fileType == 'image') {
              // this is i'm getting final url
              this.imageUrl = selectedFile;
              console.log(professor);
              this.updateProfileImage(this.imageUrl, professor._id);
            }
          } else {
            this.uploadStatus = 'File upload failed';
          }
        },
        (error) => {
          console.error('File upload error', error);
          this.uploadStatus = 'File upload failed';
        }
      );
  }

  //duplicate function for uploading image
  updateProfileImage(imagepath: any, profileId: any) {
    const data = {
      images: imagepath,
      //  updatedprofessor: this.updatedprofessor._id
    };
    // console.log(profileId._id);
    // Make the PUT request to the API endpoint
    console.log(data);
    this.http
      .put<any>(
        `http://localhost:3000/addingProfessors/professors/${profileId}`,
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
          // Handle the response or show a success message
          // this.updatedProfessor = response.updatedProfessor;
          // For example, show a success toast
          // this.showToast('professor profile updated successfully.');
          this.getprofessor();
        },
        (error) => {
          // Handle the error or show an error message
          console.error(error);
          // For example, show an error toast
          // this.showToast('Error updating professor profile. Please try again.');
        }
      );
    // this.router.navigate(['/tab9']);
  }

  // Function to block a professor
  blockprofessor(professor: any) {
    if (professor.status !== 'blocked') {
      // Update the professor's status to 'blocked' locally
      professor.status = 'blocked';

      // Make an API call to updatwew the status on server
      this.http
        .post(
          `http://localhost:3000/addingProfessors/block/${this.professorId}`,
          {}
        )
        .subscribe(
          (response) => {
            console.log(response);
            // Handle success and show a pop-up alert
            // this.showAlert('professor is blocked');
            // Handle success and show a toasted message
            this.presentToast('professor is blocked', 'danger');
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // Function to unblock a professor
  unblockprofessor(professor: any) {
    if (professor.status === 'blocked') {
      // Update the professor's status to 'active' locally
      professor.status = 'active';

      //Make an API call to update the server
      this.http
        .post(
          `http://localhost:3000/addingProfessors/unblock/${this.professorId}`,
          {}
        )
        .subscribe(
          (response) => {
            console.log(response);
            // Handle success and show a pop-up alert
            //  this.showAlert('professor is unblocked');
            // Handle success and show a toasted message
            this.presentToast('professor is unblocked', 'success');
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // showAlert(message: string){
  //   alert(message); // display a pop-up alert with the provided message
  // }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds (2 seconds in this example)
      color: color, // set the color based on the massege type
    });
    toast.present();
  }
}
