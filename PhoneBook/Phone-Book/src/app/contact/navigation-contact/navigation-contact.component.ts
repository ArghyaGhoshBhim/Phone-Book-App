import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { category } from 'src/app/model/category.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-navigation-contact',
  templateUrl: './navigation-contact.component.html',
  styleUrls: ['./navigation-contact.component.scss'],
})
export class NavigationContactComponent {
  @Input() categoryList: category[] | undefined;
  constructor(private contactService: ContactService, private router: Router) {}
  onRouteClick(id: string) {
    this.contactService.categoryInjectingSubject.next(id);
    this.router.navigate(['contact/category/', id]);
  }
}
