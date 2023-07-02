import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPrivacityPage } from './modal-privacity.page';

describe('ModalPrivacityPage', () => {
  let component: ModalPrivacityPage;
  let fixture: ComponentFixture<ModalPrivacityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalPrivacityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
