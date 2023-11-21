import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { response } from 'express';
import { error } from 'console';
import { ToastController } from '@ionic/angular'; // Import ToastController


@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {

  isEditing: boolean = false; // Add this line
  originalStudent: any = {};
  editedStudent: any = {};

  @ViewChild('fileInput') fileInput: ElementRef;

  selectedFile: any;
  uploadStatus: string;
  uploadedFileUrl: any;
  firstName: any;
  lastName: any;
  gender: any;
  group: any;
  yearOfStudy: any;
  email: any;
  mobileNumber: any;
  address: any;
  updatedStudent: any;
  selectedFileUrl: any;
  // editedStudent: any;
  // originalStudent: {};


  chooseFile() {
    this.fileInput.nativeElement.click();
  }
 
students: any = [];  // Assuming you have an array of student data
// Define a variable to hold the selected student data
// selectedStudent: any;
  content: any;
  password: any;
  uploadInProgressImage: boolean;
  uploadSuccessful: boolean;
  imageUrl: string;
  images: any;
  file: any;
  video: any;
  uploadInProgressVideo: boolean;
  uploadInProgressFile: boolean;
  showLoader: boolean;
  videoUrl: string;
  fileUrl: string;
  uploadStatusImage: boolean;
  uploadStatusVideo: boolean;
  uploadStatusFile: boolean;

  private image: File;

  constructor (private http: HttpClient, private route: ActivatedRoute, private router: Router,  private toastController: ToastController ) { 
    // Retrieve the student data from the state passed by the previous page
     this.route.params.subscribe(abc =>{
      //Retriving the student id from the URL parameters
      console.log(abc);
      console.log(JSON.stringify(abc))
      this.updatedStudent = abc;
      console.log(this.updatedStudent._id);
     
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const studentId = params.get('_id'); // Assuming the parameter is named 'id'
      console.log(studentId);
      console.log(params);
      let studentData: any = params
     this.students.push(studentData.params);
    //  if (studentData) {
    //   this.students = [Object.assign({}, studentData)]; // Clone the object
    // }
     console.log(this.students)
      // Here, you can fetch the student data using the studentId from your data source
      // Replace 'fetchStudentDataById' with the appropriate function to get student data by ID
      this.originalStudent = { /* Student data from your API */ };
      this.editedStudent = { ...this.originalStudent };
    });   
   

// student(){
//  //i'm getting item from blog-post-page..
//  this.content = localStorage.getItem('add-student');
//     let a = JSON.parse(this.content)
//     this.students.push(a)
//     console.log(a.content);
//     };
// // this.http.get<any[]>('http://localhost:3000/addingStudents/student').subscribe((response) => {
// //   this.students = response;
// //   console.log(response)
// //  });
 
}

delete(studentData: any){
  console.log(studentData)
   // now get the document id this student
   let doc_id = studentData._id
   this.http.delete('http://localhost:3000/addingStudents/student/'+doc_id).subscribe((data) => {
  console.log(data);
}
   )
   this.router.navigate(['/tab9']);
}

//update function ....once click the edit icon navigate to updata student profile page
// update(updatedStudent: any){
//   console.log(updatedStudent[0])
//   this.router.navigate(['/update-student-profile', updatedStudent[0]])
  // console.log(student);
  // this.router.navigate(['/update-student-profile'], navigationExtras);



 // Function to handle the "Forgot Password" button click
 forgotPassword(studentPassword: any) {
  console.log(studentPassword[0])
  // Navigate to the forgot password page
  this.router.navigate(['/forgot-password',studentPassword[0]]);
}


toggleEditMode(student: any) {
  this.isEditing = true;
  this.editedStudent = { ...this.updatedStudent }; // Clone the student data for editing
  this.originalStudent = { ...this.updatedStudent }; // Store the original student data
}

cancelEdit() {
  // Discard changes and switch back to view mode
  this.isEditing = false;
  this.editedStudent = {  }; //clear the edited student data
}

saveChanges() {
  const dataToUpdate = { ...this.editedStudent }; // Clone the edited data
  // Save the edited data to the server
  this.http.put<any>(`http://localhost:3000/addingStudents/student/${this.updatedStudent._id}`, this.editedStudent)
    .subscribe(
      (response) => {
        console.log('Student profile updated successfully:', response);
        // Update the originalStudent with the editedStudent data
        this.originalStudent = { ...this.editedStudent };
        this.isEditing = false; // Switch back to view mode
      },
      (error) => {
        console.error('Error updating student profile:', error);
        // Handle the error
      }
    );
}



 // Function to handle file selection
 handleFileInput(event: any) {
   this.selectedFile = event.target.files[0];
 }

 // Function to trigger file upload
 uploadImage( fileType:any, student: any) {

  // var currentFile: File | null = null;
  
  // if(fileType == 'image'){
  // this.selectedFile = this.image
  // }

  if (!this.selectedFile) {
    console.log("No file selected.");
    return;
  }
      // Perform the file upload using HttpClient
   const formData = new FormData();
   formData.append('filename', this.selectedFile);

   this.http.post<any>('http://localhost:3000/addingStudents/uploadfiles', formData).subscribe(
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
        selectedFile = CLOUDFRONT_URL + this.selectedFile.name
        console.log(selectedFile);
        console.log(fileType)
        if(fileType == 'image'){
          // this is i'm getting final url
          this.imageUrl = selectedFile;
          console.log(student);
          this.updateProfileImage(this.imageUrl, student._id );

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
updateProfileImage(imagepath:any, profileId: any) {
  const data = {
    images: imagepath
    //  updatedStudent: this.updatedStudent._id
  };
  // console.log(profileId._id);
  // Make the PUT request to the API endpoint
  console.log(data)
  this.http
    .put<any>(`http://localhost:3000/addingStudents/student/${profileId}`, data)
    .subscribe(
      (response) => {
        console.log(response);
        // Handle the response or show a success message
        console.log(response.updatedStudent);
        this.updatedStudent = response.updatedStudent;
        // For example, show a success toast
        // this.showToast('Student profile updated successfully.');
      },
      (error) => {
        // Handle the error or show an error message
        console.error(error);
        // For example, show an error toast
        // this.showToast('Error updating student profile. Please try again.');
      }
    );
    // this.router.navigate(['/tab9']);
}


 // Function to block a student
 blockStudent(student: any) {
  if (student.status !== 'blocked') {
    // Update the student's status to 'blocked' locally
    student.status = 'blocked';
   
    // Make an API call to updatwew the status on server
    this.http.post(`http://localhost:3000/addingStudents/block/${this.updatedStudent._id}`, {}).subscribe((response) => {
          console.log(response);
    // Handle success and show a pop-up alert
    // this.showAlert('Student is blocked'); 
    // Handle success and show a toasted message
    this.presentToast('Student is blocked', 'danger');
 
    },
    (error) => {
      console.log(error);
    }
    );
  }
}

  // Function to unblock a student
  unblockStudent(student: any) {
    if (student.status === 'blocked') {
      // Update the student's status to 'active' locally
      student.status = 'active';
    
      //Make an API call to update the server
      this.http.post(`http://localhost:3000/addingStudents/unblock/${this.updatedStudent._id}`, {}).subscribe((response) => {
        console.log(response);
        // Handle success and show a pop-up alert
      //  this.showAlert('Student is unblocked'); 
          // Handle success and show a toasted message
          this.presentToast('Student is unblocked', 'success');
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