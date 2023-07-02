import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkForecastPage } from './work-forecast.page';

describe('WorkForecastPage', () => {
  let component: WorkForecastPage;
  let fixture: ComponentFixture<WorkForecastPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
