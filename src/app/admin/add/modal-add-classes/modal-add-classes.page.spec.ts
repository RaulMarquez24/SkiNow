import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddClassesPage } from './modal-add-classes.page';

describe('ModalAddClassesPage', () => {
  let component: ModalAddClassesPage;
  let fixture: ComponentFixture<ModalAddClassesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalAddClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
