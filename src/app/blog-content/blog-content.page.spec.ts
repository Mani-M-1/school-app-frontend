import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogContentPage } from './blog-content.page';

describe('BlogContentPage', () => {
  let component: BlogContentPage;
  let fixture: ComponentFixture<BlogContentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BlogContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
