import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryContactContainerComponent } from './category-contact-container/category-contact-container.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { DetailsContactComponent } from './details-contact/details-contact.component';
import { NavigationContactComponent } from './navigation-contact/navigation-contact.component';
import { ContactContainerComponent } from './contact-container/contact-container.component';
import { MatrialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeContactComponent } from './home-contact/home-contact.component';

@NgModule({
  declarations: [
    CategoryContactContainerComponent,
    AddContactComponent,
    UpdateContactComponent,
    DetailsContactComponent,
    NavigationContactComponent,
    ContactContainerComponent,
    ContactListComponent,
    HomeContactComponent,
  ],
  imports: [
    CommonModule,
    MatrialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ContactModule {}
