import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  create(arg0: { message: string; duration: number; position: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor(public toastController: ToastController) { }

  async presentToast(infoMessage: string){
    const toast = await this.toastController.create({
      message: infoMessage,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

}
