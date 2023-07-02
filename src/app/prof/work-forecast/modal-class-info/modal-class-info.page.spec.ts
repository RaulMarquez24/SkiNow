import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalClassInfoPage } from './modal-class-info.page';

describe('ModalClassInfoPage', () => {
  let component: ModalClassInfoPage;
  let fixture: ComponentFixture<ModalClassInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalClassInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
