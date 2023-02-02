import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PagingContact } from '../model/contact.model';
import { ContactService } from '../service/contact.service';

@Injectable({
  providedIn: 'root',
})
export class HomeContactResolver implements Resolve<PagingContact> {
  pageSize = 10;
  pageNumber = 1;
  searchKey: string = '';
  constructor(private contactService: ContactService) {}
  resolve() {
    this.contactService.searchSubject.subscribe((data) => {
      this.searchKey = data;
    });
    return this.contactService.getContacts(
      this.searchKey,
      this.pageSize,
      this.pageNumber
    );
  }
}
