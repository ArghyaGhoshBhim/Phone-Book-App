import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactDetails } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss'],
})
export class DetailsContactComponent implements OnInit {
  contactDetails: ContactDetails | any;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}
  ngOnInit(): void {
    this.contactDetails = this.activateRoute.snapshot.data['data'];
  }
  deleteSubmit(id: string) {
    if (confirm('Are you sure to delete this record ?')) {
      this.contactService
        .deleteContact(this.contactDetails.id)
        .subscribe(() => {
          this.router.navigate(['contact/home']);
        });
    }
  }
  gotoEdit() {
    let id = this.activateRoute.snapshot.paramMap.get('id');
    this.router.navigate(['/contact/update-profile', id]);
  }
}
