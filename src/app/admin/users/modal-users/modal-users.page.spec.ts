import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUsersPage } from './modal-users.page';

describe('ModalUsersPage', () => {
  let component: ModalUsersPage;
  let fixture: ComponentFixture<ModalUsersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
