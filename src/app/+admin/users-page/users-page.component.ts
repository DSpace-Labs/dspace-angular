import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EPersonDataService } from '../../core/data/eperson-data.service';
import { PaginatedList } from '../../core/data/paginated-list';
import { RemoteData } from '../../core/data/remote-data';
import { EPerson } from '../../core/shared/eperson.model';
import { fadeInOut } from '../../shared/animations/fade';

@Component({
  selector: 'ds-users-page',
  styleUrls: ['./users-page.component.scss'],
  templateUrl: './users-page.component.html',
  animations: [fadeInOut]
})
export class UsersPageComponent implements OnInit {
  users$: Observable<RemoteData<PaginatedList<EPerson>>>;

  constructor(private epds: EPersonDataService) {

  }

  ngOnInit(): void {
    this.users$ = this.epds.findAll();
  }

}
