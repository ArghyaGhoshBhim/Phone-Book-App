import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './common/footer/footer.component';
import { CategoryModule } from './category/category.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatrialModule } from './material/material.module';
import { ContactModule } from './contact/contact.module';
@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CategoryModule,
    HttpClientModule,
    MatrialModule,
    ContactModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
