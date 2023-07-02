import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddReservaPage } from './modal-add-reserva.page';

describe('ModalAddReservaPage', () => {
  let component: ModalAddReservaPage;
  let fixture: ComponentFixture<ModalAddReservaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalAddReservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
