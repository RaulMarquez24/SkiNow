import { Component, Input, OnInit } from '@angular/core';
import { User, UserDataService } from '../../../services/user-data.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Anuncio, AnuncioService } from 'src/app/services/anuncio.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-add-ads',
  templateUrl: './modal-add-ads.page.html',
  styleUrls: ['./modal-add-ads.page.scss'],
})
export class ModalAddPage implements OnInit {
  image: any;
  @Input() id: string | undefined;
  @Input() title: string | undefined;
  ads: Anuncio = {
    titulo: '',
    descripcion: '',
    img: ''
  };


  constructor(
    private userDataService: UserDataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private auth: Auth,
    private adsService: AnuncioService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {

    if (this.id){
    this.adsService.getAdsById(this.id).subscribe(res => {
      this.ads = res;
    });
  }
  }

  async deleteAds() {
    await this.adsService.deleteAds(this.ads);
    window.location.reload();
    this.router.navigate(['add']);
  }

  async updateAds() {
    await this.adsService.updateAds(this.ads);
    await this.changeImage();

    const toast = await this.toastCtrl.create({
      message: '¡Anuncio Actualizado!.',
      duration: 2000
    });
    toast.present();
    window.location.reload();
    this.router.navigate(['add']);
  }

  async addAds() {
    await this.adsService.addAds(this.ads);

    const toast = await this.toastCtrl.create({
      message: '¡Anuncio Creado!.',
      duration: 2000
    });
    toast.present();
    window.location.reload();
    this.router.navigate(['add']);
	}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async saveImage() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if (this.image) {
      this.ads.img = 'data:image/jpeg;base64,' + this.image.base64String;
    }
  }

  async changeImage() {
    if (this.image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.adsService.uploadImage(this.ads, this.image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
}