import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, PagingContact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-home-contact',
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.scss'],
})
export class HomeContactComponent implements OnInit {
  pageNumber = 1;
  searchKey = '';
  pageSize = 10;
  totalCount = 0;
  contactList: Contact[] = [];
  pagingContactData: PagingContact = new PagingContact();
  constructor(
    private activeRout: ActivatedRoute,
    private contactService: ContactService
  ) {}
  ngOnInit(): void {
    this.pagingContactData = this.activeRout.snapshot.data['data'];
    this.contactList = this.pagingContactData.contactsData;
    this.pageSize = this.pagingContactData.pageSize;
    this.pageNumber = this.pagingContactData.pageIndex;
    this.totalCount = this.pagingContactData.totalCount;
    this.searchContact();
  }

  changePage(event: number) {
    this.pageNumber = event;
    this.getContactList();
  }
  searchContact() {
    this.contactService.searchSubject.subscribe((data) => {
      this.searchKey = data;
      this.getContactList();
    });
  }
  getContactList() {
    this.contactService
      .getContacts(this.searchKey, this.pageSize, this.pageNumber)
      .subscribe((data) => {
        this.pagingContactData = data;
        this.contactList = this.pagingContactData.contactsData;
        this.pageSize = this.pagingContactData.pageSize;
        this.pageNumber = this.pagingContactData.pageIndex;
      });
  }
}
