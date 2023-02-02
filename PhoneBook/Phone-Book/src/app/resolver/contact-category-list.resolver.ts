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
export class ContactCategoryListResolver implements Resolve<PagingContact> {
  constructor(private contactService: ContactService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let categoryIdInRoute = route.params['id'];
    let pagingContact = new PagingContact();
    pagingContact.pageIndex = 1;
    pagingContact.pageSize = 10;
    this.contactService.categoryInjectingSubject.next(categoryIdInRoute);
    return this.contactService.getContactByCategory(
      categoryIdInRoute,
      pagingContact
    );
  }
}
