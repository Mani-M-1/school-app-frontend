import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.page.html',
  styleUrls: ['./professor-profile.page.scss'],
})
export class ProfessorProfilePage implements OnInit {
  private apiUrl: string = environment.apiUrl;

  isEditing: boolean = false; // Add this line
  originalProfessor: any = {};
  editedProfessor: any = {};

  mobileNumber: any;
  firstName: any;
  lastName: any;
  subjects: any;
  email: any;
  gender: any;
  address: any;

  @ViewChild('fileInput') fileInput: ElementRef; // Using any type for now

  professorId: any;
  professor: any;
  updatedProfessor: any;

  private image: File;
  selectedFile: any;
  uploadStatus: string;
  imageUrl: any;
  updatedprofessor: any;

  // Modify this method to check if fileInput is not null
  chooseFile() {
    // Check if fileInput is not null
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
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
    this.http.get(`${this.apiUrl}/user/details/${this.professorId}`).subscribe(
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getprofessor();
      }
    });
  }

  delete(professorData: any) {
    console.log(professorData);
    // now get the document id this professor
    let doc_id = professorData._id;
    this.http
      .delete(`${this.apiUrl}/user/profile/${doc_id}`)
      .subscribe((data) => {
        console.log(data);
      });
    this.router.navigate(['/tabs/tab10']);
  }

  forgotPassword(professorPassword: any) {
    console.log(professorPassword[0]);
    this.router.navigate(['/forgotpassword1', professorPassword[0]]);
  }

  //edit function
  toggleEditMode() {
    this.isEditing = !this.isEditing;
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
        `${this.apiUrl}/user/profile/${this.professorId}`,
        this.editedProfessor
      )
      .subscribe(
        (response) => {
          console.log('professor profile updated successfully:', response);

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
    if (!this.selectedFile) {
      console.log('No file selected.');
      return;
    }
    // Perform the file upload using HttpClient
    const formData = new FormData();
    formData.append('filename', this.selectedFile);

    this.http
      .post<any>(`${this.apiUrl}/user/profile/uploadfiles`, formData)
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
      profile: imagepath,
    };

    console.log(data);
    this.http
      .put<any>(`${this.apiUrl}/user/profile/update/${profileId}`, data)
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
        .post(`${this.apiUrl}/user/block/${this.professorId}`, {})
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
        .post(`${this.apiUrl}/user/unblock/${this.professorId}`, {})
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

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds (2 seconds in this example)
      color: color, // set the color based on the massege type
    });
    toast.present();
  }
}
