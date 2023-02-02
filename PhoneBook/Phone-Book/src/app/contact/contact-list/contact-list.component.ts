import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact, PagingContact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  @Output() emitter = new EventEmitter();
  @Input() pageNumber: number = 1;
  @Input() contactList: Contact[] | undefined = [];
  @Input() pageSize = 10;
  @Input() totalNumberOfData: number | undefined;
  @Input() totalCount: number = 0;
  nextDisable = false;
  prevDisable = true;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  deleteSubmit(id: string) {
    if (confirm('Are you sure to delete this record ?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.emitter.emit(this.pageNumber);
      });
    }
  }
  viewProfile(id: string) {
    this.router.navigate(['/contact/view-profile', id]);
  }
  nextClick() {
    this.pageNumber += 1;
    this.prevDisable = false;
    if (Math.ceil(this.totalCount / this.pageSize) == this.pageNumber) {
      this.nextDisable = true;
    }
    this.emitter.emit(this.pageNumber);
  }
  previousClick() {
    this.pageNumber -= 1;
    this.nextDisable = false;
    if (this.pageNumber == 1) {
      this.prevDisable = true;
    }
    this.emitter.emit(this.pageNumber);
  }

  gotoEdit(id: string) {
    this.router.navigate(['/contact/update-profile', id]);
  }
}
