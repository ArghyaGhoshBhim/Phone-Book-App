import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { category } from 'src/app/model/category.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
})
export class ContactContainerComponent implements OnInit {
  categoryList: category[] = [];
  search = '';
  panelOpenState = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}
  ngOnInit(): void {
    this.categoryList = this.activeRoute.snapshot.data['data'];
  }
  onSearch() {
    setTimeout(() => {
      this.router.navigate(['contact/home']);
      this.contactService.searchSubject.next(this.search);
    }, 1000);
  }
}
