import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Clase, ClassesService } from 'src/app/services/classes.service';
import { ModalClassInfoPage } from 'src/app/prof/work-forecast/modal-class-info/modal-class-info.page';
import { ModalInfoReservasPage } from './modal-info-reservas/modal-info-reservas.page';
import { ModalAddReservaPage } from './modal-add-reserva/modal-add-reserva.page';

@Component({
	selector: 'app-reservas',
	templateUrl: './reservas.page.html',
	styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
	profile: any = null;
	classes: Clase[] = [];
	listClasses: Clase[] = [];
	searchTerm:string='';


	constructor(
		private router: Router,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private cd: ChangeDetectorRef,
		private modalCtrl: ModalController,
		private classesService: ClassesService,
	) {

		const storedProfile = localStorage.getItem('profile');
		if (!storedProfile) {
			localStorage.removeItem('profile');
			this.router.navigateByUrl('/login', { replaceUrl: true });
		} else {
			this.profile = JSON.parse(storedProfile);
		}

		this.classesService.getClasses().subscribe(res => {
			this.classes = res;
			this.classes.forEach(c => {
				if (c.datos_titular.id_titular == this.profile.id) {
					this.listClasses.push(c);
				}
			})
			this.cd.detectChanges();
		});
	}

	ngOnInit() {

	}

	calculateEndTime(startTime: string, duration: number): string {
		const [hours, minutes] = startTime.split(':').map(Number); // Convertir la hora en formato de texto a números
		const startTimeObj = new Date();
		startTimeObj.setHours(hours, minutes); // Establecer la hora de inicio

		const endTimeObj = new Date(startTimeObj.getTime() + duration * 60 * 60 * 1000); // Sumar la duración en milisegundos
		const endTime = `${endTimeObj.getHours()}:${endTimeObj.getMinutes().toString().padStart(2, '0')}`; // Formatear la hora de fin como texto
		return endTime;
	}

	async openInfo() {
		const modal = await this.modalCtrl.create({
			component: ModalInfoReservasPage,
			// componentProps: { id: '', title: '' },
		});
		await modal.present();
	}

	async addReserva() {
		const modal = await this.modalCtrl.create({
			component: ModalAddReservaPage,
			// componentProps: { id: '', title: '' },
		});
		await modal.present();
	}

	async openClasses(clase: Clase, title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalClassInfoPage,
			componentProps: { id: clase.id, title },
		});
		await modal.present();
	}

	clasesTitular(){
		this.classesService.getClassesByTitularId(this.searchTerm).subscribe(res => {
			const clases = res;
			this.listClasses=[];
			clases.forEach(n => {
				this.listClasses.push(n);
			})
			this.cd.detectChanges();
		});
	}

	clearSearch() {
		this.listClasses=[];
		this.searchTerm='';
	}

}