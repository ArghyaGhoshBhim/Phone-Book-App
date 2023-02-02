import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ContactDetails } from '../model/contact.model';
import { ContactService } from '../service/contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactFindByIdResolver implements Resolve<ContactDetails> {
  constructor(private contactService: ContactService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.contactService.getContactById(route.params['id']);
  }
}
