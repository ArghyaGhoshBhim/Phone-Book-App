import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { category } from 'src/app/model/category.model';
import { Contact, ContactDetails } from 'src/app/model/contact.model';
import { CategoryService } from 'src/app/service/category.service';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss'],
})
export class UpdateContactComponent implements OnInit {
  contactDetails = new ContactDetails();
  categoryList: category[] = [];
  contactForm: FormGroup | any;
  constructor(
    private activateRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private builder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.contactDetails = this.activateRoute.snapshot.data['data'];
    this.getAllCategoryList();
    this.contactForm = this.setFormGroup();
  }
  updateContact() {
    this.contactService
      .updateContact(this.contactDetails.id, this.contactForm.value)
      .subscribe(() => {
        this.router.navigate(['/contact/view-profile', this.contactDetails.id]);
      });
  }
  getAllCategoryList() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categoryList = data;
    });
  }

  setFormGroup() {
    return this.builder.group({
      firstName: [
        this.contactDetails.firstName,
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [this.contactDetails.lastName],
      email: [this.contactDetails.email, [Validators.email]],
      dob: [this.contactDetails.dob],
      primaryNumber: [this.contactDetails.primaryNumber, [Validators.required]],
      secondaryNumber: [this.contactDetails.secondaryNumber],
      categoryId: [
        this.contactDetails.category?.categoryId,
        [Validators.required],
      ],
    });
  }
}
