import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContactComponent } from './navigation-contact.component';

describe('NavigationContactComponent', () => {
  let component: NavigationContactComponent;
  let fixture: ComponentFixture<NavigationContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
