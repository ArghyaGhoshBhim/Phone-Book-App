import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { category } from 'src/app/model/category.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  categoryList: category[] = [];
  contactForm: FormGroup;
  constructor(
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private contactService: ContactService,
    private route: Router
  ) {
    this.contactForm = this.setFormGroup();
  }
  ngOnInit(): void {
    this.categoryList = this.activeRoute.snapshot.data['data'];
  }

  addContact() {
    if (!this.contactForm?.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.contactService.addContact(this.contactForm.value).subscribe(() => {
      this.clearFrom();
      this.contactForm = this.setFormGroup();
    });
  }

  setFormGroup() {
    return this.builder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      email: ['', [Validators.email]],
      dob: [''],
      primaryNumber: ['', [Validators.required]],
      secondaryNumber: [''],
      categoryId: ['', [Validators.required]],
    });
  }

  clearFrom() {
    this.contactForm.reset();
  }

  getControl() {
    return this.contactForm.controls;
  }

  isTouchedOrDirty(control: FormControl | any): boolean {
    return control?.touched || control.dirty;
  }
  isFirstNameControlerRequireValid() {
    let controler = this.contactForm.controls['firstName'];
    let touchedOrDirty = this.isTouchedOrDirty(controler);
    if (!touchedOrDirty) {
      return true;
    }
    return !controler.errors?.['required'];
  }

  isFirstNameControlerMinLengthValid() {
    let controler = this.contactForm.controls['firstName'];
    let touchedOrDirty = this.isTouchedOrDirty(controler);

    if (!touchedOrDirty) {
      return true;
    }
    return !controler.errors?.['minlength'];
  }

  isPrimaryNumberControlerRequireValid() {
    let controler = this.contactForm.controls['primaryNumber'];
    let touchedOrDirty = this.isTouchedOrDirty(controler);
    if (!touchedOrDirty) {
      return true;
    }
    return !controler.errors?.['required'];
  }

  isPrimaryNumberControlerLengthValid() {
    let controler = this.contactForm.controls['primaryNumber'];
    let touchedOrDirty = this.isTouchedOrDirty(controler);
    if (!touchedOrDirty) {
      return true;
    }
    return !(
      controler.value.toString().length != 10 &&
      controler.value.toString().length != 0
    );
  }

  isCategoryControlerRequireValid() {
    let controler = this.contactForm.controls['categoryId'];
    let touchedOrDirty = this.isTouchedOrDirty(controler);
    if (!touchedOrDirty) {
      return true;
    }
    return !controler.errors?.['required'];
  }
}
