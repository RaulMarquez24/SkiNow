import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-privacity',
  templateUrl: './modal-privacity.page.html',
  styleUrls: ['./modal-privacity.page.scss'],
})
export class ModalPrivacityPage {

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
}
