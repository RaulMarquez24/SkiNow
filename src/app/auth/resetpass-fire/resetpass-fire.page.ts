import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resetpass-fire',
  templateUrl: './resetpass-fire.page.html',
  styleUrls: ['./resetpass-fire.page.scss'],
})
export class ResetpassFirePage {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  async OnSubmit() {

    console.log(this.email);
    if (this.credentials.valid) {
      const { email } = this.credentials.value;
      this.authService.requestPassword(email).then(() => this.router.navigate(['/login-fire']));
    }
  }

  async login() {
    await this.router.navigate(['/login-fire']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
