import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  public isFormVisible = false;

  public userForm: User = {
    _id: "",
    name: "",
    email: "",
    admin: false,
    editor: true
  }

  constructor() { }

  public editUser(bool: boolean): void {
    this.isFormVisible = bool;
    if(this.isFormVisible) {
      this.userForm = {
        _id: this.user._id,
        name: this.user.name,
        email: this.user.email,
        admin: this.user.admin,
        editor: this.user.editor
      }
    } else {
      this.userForm = new User();
    }
  }

  ngOnInit() {
  }

}
