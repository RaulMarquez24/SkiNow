import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginFirePage } from './login-fire.page';

describe('LoginFirePage', () => {
  let component: LoginFirePage;
  let fixture: ComponentFixture<LoginFirePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
