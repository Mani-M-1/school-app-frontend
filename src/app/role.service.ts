import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor() {}

  setUserRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): any {
    return localStorage.getItem('userRole');
  }

  clearUserRole() {
    localStorage.removeItem('userRole');
  }
}
