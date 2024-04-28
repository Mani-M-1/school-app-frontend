import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPrincipalPage } from './add-principal.page';

describe('AddPrincipalPage', () => {
  let component: AddPrincipalPage;
  let fixture: ComponentFixture<AddPrincipalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPrincipalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
