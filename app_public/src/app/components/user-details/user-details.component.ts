import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/classes/user";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Loc8rDataService } from "src/app/services/loc8r-data.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  @Output() updatedUser = new EventEmitter<User>();

  public formError: string;
  public isFormVisible = false;

  public userForm: User = {
    _id: "",
    name: "",
    email: "",
    admin: false,
    editor: true,
  };

  constructor(
    private loc8rDataService: Loc8rDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public editUser(bool: boolean): void {
    this.formError = "";
    this.isFormVisible = bool;
    if (this.isFormVisible) {
      this.userForm = {
        _id: this.user._id,
        name: this.user.name,
        email: this.user.email,
        admin: this.user.admin,
        editor: this.user.editor,
      };
    } else {
      this.userForm = new User();
    }
  }

  private isFormValid(user: User): boolean {
    if (user.name && user.email && (user.admin ? true : user.editor)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {}

  public updateUser() {
    this.formError = "";
    if (this.isFormValid(this.userForm)) {
      this.loc8rDataService
        .updateUserById(this.userForm)
        .then((user: User) => {
          this.authenticationService.refreshUser(user);
          this.updatedUser.emit(user);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.error("INVALID!");
      this.formError = "Error";
    }
    this.editUser(false);
  }

  public deleteUser() {
    this.formError = "";
    this.loc8rDataService.deleteUserById(this.user);
    this.authenticationService.logout();
    this.router.navigateByUrl("/");
  }
}
