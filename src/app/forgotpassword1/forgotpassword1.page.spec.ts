import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Forgotpassword1Page } from './forgotpassword1.page';

describe('Forgotpassword1Page', () => {
  let component: Forgotpassword1Page;
  let fixture: ComponentFixture<Forgotpassword1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Forgotpassword1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
