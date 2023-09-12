import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserRole() {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Check if the logged-in user is a student
  isStudent(): boolean {
    return localStorage.getItem('role') === 'student';
  }

  // Check if the logged-in user is a professor
  isProfessor(): boolean {
    return localStorage.getItem('role') === 'professor';
  }
}