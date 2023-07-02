import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import { IonButton } from '@ionic/angular';
import { getLocaleDateFormat } from '@angular/common';
import { Clase, ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  daysOfWeek: string[] = ['lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.', 'dom.'];
  weeks: number[][] = [];
  todayDate: Date;
  date: Date;
  year: number;
  month: number;
  monthName: string;
  idProf: any;
  monthClass: any;

  totalDuration: number = 0;
  totalToSettle: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private classesService: ClassesService,
  ) {
    this.todayDate = new Date();
    this.date = new Date(this.todayDate);
    this.year = getYear(this.date);
    this.month = getMonth(this.date);
    this.monthName = this.getMonthName(this.month);

    this.genCalendar();
  }

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  genCalendar() {
    this.weeks = [];
    this.totalDuration = 0;
    this.totalToSettle = 0;
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      this.idProf = profile.id;
    }

    this.classesService.getClassesByMonthAndIdProf(this.year, this.month + 1, this.idProf).subscribe((classes: Clase[]) => {
      // Aquí puedes manejar las clases obtenidas
      this.monthClass = classes;
      this.getMoneyToSettle();
    });

    const daysInMonth = getDaysInMonth(new Date(this.year, this.month));

    let week: number[] = [];
    let firstDayOfWeek = new Date(this.year, this.month, 1).getDay();
    if (firstDayOfWeek === 0) {
      firstDayOfWeek = 7; // Si el primer día de la semana es domingo, cambiamos su valor a 7
    }

    // Agregar días vacíos para completar la primera semana
    for (let i = 1; i < firstDayOfWeek; i++) {
      week.push(0);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);

      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    // Agregar días vacíos para completar la última semana
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(0);
      }
      this.weeks.push(week);
    }

  }

  getMoneyToSettle() {
    this.monthClass.forEach((clase: any) => {
      this.totalDuration += clase.duracion;
    });

    this.totalToSettle = this.totalDuration * 16;
  }

  getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('es-ES', { month: 'long' });
  }

  changeMonth(event: any) {

    if (event.target.id == 'back') {
      this.date.setMonth(this.date.getMonth() - 1);
    } else if (event.target.id == 'forward') {
      this.date.setMonth(this.date.getMonth() + 1);
    } else {
      this.date = new Date(this.todayDate);
    }

    this.year = getYear(this.date);
    this.month = getMonth(this.date);
    this.monthName = this.getMonthName(this.month);

    this.weeks = [];
    this.genCalendar();
  }
}
