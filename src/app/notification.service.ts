// notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  storeNotification(notification: any) {
    let notifications: any[] = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    );
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  getNotifications(): any[] {
    const notifications = localStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : [];
  }

  deleteNotification(deleteNotification: any): any {
    console.log(`notification service: ${deleteNotification}`);
    const notificationsFromLocalStorage = localStorage.getItem('notifications');

    if (notificationsFromLocalStorage !== null) {
      const notifications = JSON.parse(notificationsFromLocalStorage);
      notifications.pop(deleteNotification);
      console.log(`notification service: ${JSON.stringify(notifications)}`);
      localStorage.setItem('notifications', JSON.stringify(notifications));

      return notifications;
    }
  }

  deleteAllNotification(): any {
    localStorage.setItem('notifications', JSON.stringify([]));

    return [];
  }
}
