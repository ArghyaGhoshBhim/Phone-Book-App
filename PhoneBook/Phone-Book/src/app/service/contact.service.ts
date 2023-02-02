import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  BaseUrl,
  Contact,
  ContactDetails,
  PagingContact,
  PagingContactReq,
} from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  categoryInjectingSubject = new BehaviorSubject('');
  searchSubject = new BehaviorSubject('');
  constructor(private httpClient: HttpClient) {}
  addContact(contact: Contact) {
    return this.httpClient.post(BaseUrl.url + `api/contact`, contact);
  }
  getContactByCategory(id: string, pagingContactReq: PagingContactReq) {
    return this.httpClient.post<PagingContact>(
      BaseUrl.url + `category/${id}/get`,
      pagingContactReq
    );
  }

  deleteContact(id: string) {
    return this.httpClient.delete(BaseUrl.url + `api/contact?id=${id}`);
  }

  getContactById(id: string) {
    return this.httpClient.get<ContactDetails>(
      BaseUrl.url + `api/contact/find?id=${id}`
    );
  }
  updateContact(id: string, contact: Contact) {
    return this.httpClient.put(BaseUrl.url + `api/contact/${id}`, contact);
  }
  getContacts(searchKey: string, pageSize: number, pageNumber: number) {
    return this.httpClient.get<PagingContact>(
      BaseUrl.url +
        `api/contact/filter?searchKey=${searchKey}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  }
}
