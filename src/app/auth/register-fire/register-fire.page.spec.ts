import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFirePage } from './register-fire.page';

describe('RegisterFirePage', () => {
  let component: RegisterFirePage;
  let fixture: ComponentFixture<RegisterFirePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
