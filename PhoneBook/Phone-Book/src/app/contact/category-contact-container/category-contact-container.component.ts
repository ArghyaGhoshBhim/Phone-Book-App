import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import {
  Contact,
  PagingContact,
  PagingContactReq,
} from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-category-contact-container',
  templateUrl: './category-contact-container.component.html',
  styleUrls: ['./category-contact-container.component.scss'],
})
export class CategoryContactContainerComponent implements OnInit {
  pageNumber = 0;
  pageSize = 0;
  categoryId: string = '';
  pagingContact: PagingContact = new PagingContact();
  contactData: Contact[] = [];
  totalCount = 0;
  constructor(
    private activateRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.pagingContact = this.activateRoute.snapshot.data['data'];
    this.contactData = this.pagingContact.contactsData;
    this.pageNumber = this.pagingContact.pageIndex;
    this.pageSize = this.pagingContact.pageSize;
    this.totalCount = this.pagingContact.totalCount;
    this.categoryId = this.activateRoute.snapshot.paramMap?.get('id') + '';
    this.changeCategoryList();
  }

  changeCategoryList() {
    this.contactService.categoryInjectingSubject.subscribe((data) => {
      this.categoryId = data;
      this.getContactList();
    });
  }

  changePage(event: number) {
    this.pageNumber = event;
    this.getContactList();
  }

  getContactList() {
    let pagingContactReq = new PagingContactReq();
    pagingContactReq.pageIndex = this.pageNumber;
    this.pagingContact.pageSize = this.pageSize;
    this.contactService
      .getContactByCategory(this.categoryId, pagingContactReq)
      .subscribe((data) => {
        this.pagingContact = data;
        this.contactData = this.pagingContact.contactsData;
        this.pageNumber = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
      });
  }
}
