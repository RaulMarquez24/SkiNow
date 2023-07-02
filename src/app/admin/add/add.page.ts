import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { user, Auth } from '@angular/fire/auth';
import { User } from '../../services/user-data.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Anuncio } from 'src/app/services/anuncio.service';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { ModalController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { ModalAddPage } from './modal-add-ads/modal-add-ads.page';
import { ModalAddClassesPage } from './modal-add-classes/modal-add-classes.page';
import { ModalAddDiscountsPage } from './modal-add-discounts/modal-add-discounts.page';
import { Clase, ClassesService } from 'src/app/services/classes.service';
import { Code_discount, DescuentoService } from 'src/app/services/descuento.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.page.html',
	styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
	profile: any = null;
	users: User[] = [];
	ads: Anuncio[] = [];
	codes_discounts: Code_discount[] = [];
	searchTerm: string = '';
	listAds: Anuncio[] = [];
	filteredAds: any[] = [];
	adsVisible: boolean = false;
	codesDisVisible: boolean = false;
	listCodesDiscounts: Code_discount[] = [];
	fliteredCodesDiscounts: any[] = [];

	classes: Clase[] = [];
	listClasses: Clase[] = [];
	filteredClasses: any[] = [];
	classesVisible: boolean = false;
	calendarVisible: boolean = true;
	dateClass: string = "";
	dateSelected: string = "";

	isDarkMode: boolean = false;
	isIos: boolean = false;

	handleRefresh(event: any) {
		setTimeout(() => {
			// Any calls to load data go here
			event.target.complete();
			location.reload();
		}, 2000);
	}

	constructor(
		private authService: AuthService,
		private router: Router,
		private cd: ChangeDetectorRef,
		private modalCtrl: ModalController,
		private adsService: AnuncioService,
		private classesService: ClassesService,
		private descuentoService: DescuentoService,
		private platform: Platform,
	) {

		this.classesService.getClasses().subscribe(res => {
			this.classes = res;
			this.classes.forEach(n => {
				this.listClasses.push(n);
			})
			this.cd.detectChanges();
		});

		this.adsService.getAds().subscribe(res => {
			this.ads = res;
			this.ads.forEach(n => {
				this.listAds.push(n);
			})
			this.cd.detectChanges();
		});

		this.descuentoService.getCodesDiscounts().subscribe(res => {
			this.codes_discounts = res;
			this.codes_discounts.forEach(n => {
				this.listCodesDiscounts.push(n);
			})
			this.cd.detectChanges();
		});

		this.filteredClasses = this.listClasses;
		this.filteredAds = this.listAds;
		this.fliteredCodesDiscounts = this.listCodesDiscounts;

		this.dateClass = this.getTodayWithFixedTime()
	}
	ngOnInit() {
		this.detectThemePreference();
	}

	detectThemePreference() {
		this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (this.platform.is('ios')) {
			this.isIos = true
		} else {
			this.isIos = false
		}
	}

	getMinDate(): string {
		const currentYear = new Date().getFullYear();
		return `${currentYear}-01-01`;
  	}
  	getMaxDate(): string {
		const currentYear = new Date().getFullYear()+1;
		return `${currentYear}-12-31`;
  	}

	classesChangeVisible() {
		if (this.classesVisible) {
			this.classesVisible = false;
		} else {
			this.classesVisible = true;
		}
	}

	adsChangeVisible() {
		if (this.adsVisible) {
			this.adsVisible = false;
		} else {
			this.adsVisible = true;
		}
	}

	codesDisChangeVisible() {
		if (this.codesDisVisible) {
			this.codesDisVisible = false;
		} else {
			this.codesDisVisible = true;
		}
	}

	applyFilters() {
		this.filterClasses()
		this.filterAds()
		this.filterCodesDiscounts()
	}

	filterClasses() {

		this.filteredClasses = [];

		this.filteredClasses = this.listClasses.filter(classes => {
			return classes.datos_titular.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				classes.datos_titular.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				classes.modalidad.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				classes.hora.toLowerCase().includes(this.searchTerm.toLowerCase())
		});
	}

	filterAds() {

		this.filteredAds = [];

		this.filteredAds = this.listAds.filter(ads => {
			return ads.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				ads.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				ads.img.toLowerCase().includes(this.searchTerm.toLowerCase());
		});
	}

	filterCodesDiscounts() {

		this.fliteredCodesDiscounts = [];

		this.fliteredCodesDiscounts = this.listCodesDiscounts.filter(code_discount => {
			return code_discount.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
				// || code_discount.porcentaje.toLowerCase().includes(this.searchTerm.toLowerCase())
				|| code_discount.porcentaje.toString().includes(this.searchTerm)
		});
	}

	clearSearch() {
		this.filteredAds = this.listAds;
		this.filteredClasses = this.listClasses;
		this.fliteredCodesDiscounts = this.listCodesDiscounts;
	}

	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

	async addClasses(title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalAddClassesPage,
			componentProps: { title },
		});
		await modal.present();
	}

	async addAds(title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalAddPage,
			componentProps: { title },
		});
		await modal.present();
	}

	async addCodeDiscount(title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalAddDiscountsPage,
			componentProps: { title },
		});
		await modal.present();
	}

	async openClasses(clase: Clase, title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalAddClassesPage,
			componentProps: { id: clase.id, title },
		});
		await modal.present();
	}

	async openAds(ads: Anuncio, title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalAddPage,
			componentProps: { id: ads.id, title },
		});
		await modal.present();
	}

	async openCodeDiscount(code: Code_discount, title: string) {
		const modal = await this.modalCtrl.create({
			component: ModalAddDiscountsPage,
			componentProps: { id: code.id, title },
		});
		await modal.present();
	}

	closeCalendar() {
		if (this.calendarVisible) {
			this.calendarVisible = false;
		} else {
			this.calendarVisible = true;
		}
	}

	getTodayWithFixedTime(): string {
		const today = new Date(); // Obtiene la fecha y hora actuales
		const year = today.getFullYear(); // Obtiene el año actual
		const month = today.getMonth() + 1; // Obtiene el mes actual (se suma 1 porque los meses se indexan desde 0)
		const day = today.getDate(); // Obtiene el día del mes actual

		// Crea una nueva fecha con la hora fija en 12:00:00
		const fixedTime = new Date(year, month - 1, day, 10, 0, 0); // La hora se establece en 12:00:00 (12 horas, 0 minutos, 0 segundos)

		return fixedTime.toISOString(); // Devuelve la fecha y hora en formato ISO string (ejemplo: "2023-05-22T12:00:00.000Z")
	}

	handleDateChange() {
		const selectedDate = new Date(this.dateClass);
		this.dateSelected = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
		console.log('Fecha seleccionada:', this.dateSelected);
	}
}