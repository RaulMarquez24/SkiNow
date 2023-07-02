import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetpassFirePage } from './resetpass-fire.page';

describe('ResetpassFirePage', () => {
  let component: ResetpassFirePage;
  let fixture: ComponentFixture<ResetpassFirePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResetpassFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
