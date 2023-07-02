import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Code_discount ,DescuentoService } from 'src/app/services/descuento.service';


@Component({
  selector: 'app-modal-add-discounts',
  templateUrl: './modal-add-discounts.page.html',
  styleUrls: ['./modal-add-discounts.page.scss'],
})
export class ModalAddDiscountsPage implements OnInit {
  @Input() id: string | undefined;
  @Input() title: string | undefined;

  code_discount: Code_discount = {
    nombre: '',
    porcentaje: 0,
  }


  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private descuentoService: DescuentoService,
    private router: Router,
  ) { }

  ngOnInit() {

    if (this.id){
    this.descuentoService.getCodeDiscountById(this.id).subscribe(res => {
      this.code_discount = res;
    });
  }
  }

  async deleteCodeDiscount() {
    await this.descuentoService.deleteCodeDiscount(this.code_discount);
    window.location.reload();
    this.router.navigate(['add']);
  }

  async updateCodeDiscount() {
    await this.descuentoService.updateCodeDiscount(this.code_discount);

    const toast = await this.toastCtrl.create({
      message: '¡Codigo Actualizado!.',
      duration: 2000
    });
    toast.present();
    window.location.reload();
    this.router.navigate(['add']);
  }

  async addCodeDiscount() {
    await this.descuentoService.addCodeDiscount(this.code_discount);

    const toast = await this.toastCtrl.create({
      message: '¡Codigo Creado!.',
      duration: 2000
    });
    toast.present();
    window.location.reload();
    this.router.navigate(['add']);
	}

  dismiss() {
    this.modalCtrl.dismiss();
  }

}