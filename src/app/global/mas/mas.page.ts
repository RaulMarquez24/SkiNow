import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { ModalPrivacityPage } from './modal-privacity/modal-privacity.page';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-mas',
  templateUrl: './mas.page.html',
  styleUrls: ['./mas.page.scss'],
})
export class MasPage{
  handleRefresh(event: any) {
		setTimeout(() => {
			// Any calls to load data go here
			event.target.complete();
			location.reload();
		}, 2000);
	}
  constructor(
    private toastCtrl: ToastController,
    private platform: Platform,
    private modalController: ModalController,
    ) {}

  callPhoneNumber(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`);
  }

  sendEmail(emailAddress: string) {
    window.open(`mailto:${emailAddress}`);
  }

  async customerSupport() {
    const toast = await this.toastCtrl.create({
      message: 'Esta opción se encuentra en mantenimiento',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  clickHandler(socialMedia: string) {
    let url: string = '';
    switch (socialMedia) {
      case 'Facebook':
        url = 'https://www.facebook.com'; // Reemplaza con el id de tu página de Facebook
        break;
      case 'Twitter':
        url = 'https://www.twitter.com'; // Reemplaza con el username de tu cuenta de Twitter
        break;
      case 'YouTube':
        url = 'https://www.youtube.com'; // Reemplaza con el id de tu canal de YouTube
        break;
      case 'Instagram':
        url = 'https://www.instagram.com'; // Reemplaza con el username de tu cuenta de Instagram
        break;
      default:
        break;
    }
    if (url) {
        window.location.href = url;
    }
  }

  async openPrivacyModal() {
    const modal = await this.modalController.create({
      component: ModalPrivacityPage,
      cssClass: 'modal-privacity-modal',
    });
    return await modal.present();
  }
}