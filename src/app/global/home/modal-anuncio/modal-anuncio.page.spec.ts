import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAnuncioPage } from './modal-anuncio.page';

describe('ModalAnuncioPage', () => {
  let component: ModalAnuncioPage;
  let fixture: ComponentFixture<ModalAnuncioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalAnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
