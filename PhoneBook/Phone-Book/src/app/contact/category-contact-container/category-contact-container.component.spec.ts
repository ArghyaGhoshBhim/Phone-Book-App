import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContactContainerComponent } from './category-contact-container.component';

describe('CategoryContactContainerComponent', () => {
  let component: CategoryContactContainerComponent;
  let fixture: ComponentFixture<CategoryContactContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryContactContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryContactContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
