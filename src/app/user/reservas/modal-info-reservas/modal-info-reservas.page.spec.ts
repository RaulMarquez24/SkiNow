import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalInfoReservasPage } from './modal-info-reservas.page';

describe('ModalInfoReservasPage', () => {
  let component: ModalInfoReservasPage;
  let fixture: ComponentFixture<ModalInfoReservasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalInfoReservasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
