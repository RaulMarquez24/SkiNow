import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ModalController, Platform } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

import { ChangeDetectorRef } from '@angular/core';
import { PuenteUserService } from '../../services/puente-user.service';
import Swiper, { Navigation, Autoplay, Pagination } from 'swiper';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { Anuncio } from 'src/app/services/anuncio.service';
import { ModalAnuncioPage } from './modal-anuncio/modal-anuncio.page';
import { Photo } from '@capacitor/camera';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
	@ViewChild(IonContent) content: IonContent | undefined;
	@ViewChild('swiper')
	swiperRef:ElementRef | undefined;
	swiper?:Swiper;

	profile: any;
	nameInput: any;
	LastNameInput: any;
	ads: Anuncio[] = [];
	listAds: any[] = [];

	isDarkMode: boolean =false;
	isIos:boolean=false;

	isIconClicked: boolean = false;

	handleRefresh(event: any) {
		setTimeout(() => {
			// Any calls to load data go here
			event.target.complete();
			location.reload();
		}, 2000);
	}

	constructor(
		private router: Router,
		private cd: ChangeDetectorRef,
		private auth: Auth,
		public puente: PuenteUserService,
		private adsService: AnuncioService,
		private modalController: ModalController,
		private platform: Platform,
	) {
		// Get profile from localStorage (if exist)
		const storedProfile = localStorage.getItem('profile');

		// Verify if profile exist on localStorage
		if (!storedProfile) {
			localStorage.removeItem('profile');
			this.router.navigateByUrl('/login', { replaceUrl: true });
		} else { // Get Profile if exists
			this.profile = JSON.parse(storedProfile);
		}

		this.adsService.getAds().subscribe(res => {
			this.ads = res;
			this.ads.forEach(n => {
				this.listAds.push(n);
			})
			this.cd.detectChanges();
		});

		console.log("Auth: " + auth.currentUser?.email);
		console.log("Profile: " + this.profile?.contactos?.email);
	}

	ngOnInit() {
		this.detectThemePreference();
	}

	detectThemePreference() {
		this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if(this.platform.is('ios')){
			this.isIos=true
		}else{
			this.isIos=false
		}
	}

	swiperReady(){
		this.swiper = this.swiperRef?.nativeElement.swiper;
	}

	goNext(){
		this.swiper?.slideNext();
	}

	goPrev(){
		this.swiper?.slidePrev();
	}

	async goAds(ads:Anuncio){
		const modal = await this.modalController.create({
			component: ModalAnuncioPage,
			componentProps: { 
				ads: ads
			},
			// breakpoints: [0, 0.5, 0.8],
			initialBreakpoint: 0.8,
			// showBackdrop:true,
			// cssClass: 'modal-wrapper',
		});
		await modal.present();
	}

	swiperSlideChange(e: any){
		console.log("Changed ", e)
	}

	goWebClothes() {
		window.location.href = 'https://canadian-bacon.com';
	}	  
	goWebMaterials(){
		window.location.href = 'https://www.deporvillage.com';
	}
}