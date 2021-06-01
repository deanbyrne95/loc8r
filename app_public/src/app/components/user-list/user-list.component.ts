import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Loc8rDataService } from 'src/app/services/loc8r-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public message: string;
  public users: User[]

  constructor(private loc8rDataService: Loc8rDataService) { }

  ngOnInit() {
    this.loc8rDataService.getUserList()
    .then( (users) => {
      this.users = users;
    })
  }

  public pageContent = {
    header: {
      title: 'Loc8r Profiles',
      strapline: 'Look at all the Loc8rs!'
    },
    sidebar: 'Everyone here has signed up to Loc8r.'
  };

}
