import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-reservas',
  templateUrl: './modal-info-reservas.page.html',
  styleUrls: ['./modal-info-reservas.page.scss'],
})
export class ModalInfoReservasPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
    // window.location.reload();
  }
}
