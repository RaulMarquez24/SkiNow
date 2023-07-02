import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddDiscountsPage } from './modal-add-discounts.page';

describe('ModalAddDiscountsPage', () => {
  let component: ModalAddDiscountsPage;
  let fixture: ComponentFixture<ModalAddDiscountsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalAddDiscountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
