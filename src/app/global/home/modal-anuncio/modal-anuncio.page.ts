import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Anuncio } from 'src/app/services/anuncio.service';

@Component({
  selector: 'app-modal-anuncio',
  templateUrl: './modal-anuncio.page.html',
  styleUrls: ['./modal-anuncio.page.scss'],
})
export class ModalAnuncioPage implements OnInit {

  @Input() ads:Anuncio | undefined

  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
