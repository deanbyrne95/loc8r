import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HistoryService } from "src/app/services/history.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public formError: string = "";

  public credentials = {
    _id: "",
    name: "",
    email: "",
    password: "",
    admin: false,
    editor: true,
  };

  public pageContent = {
    header: {
      title: "Create a new account",
      strapline: "Become a great Loc8r",
    },
    sidebar: "To get started, please enter in all the details in the form",
    register: "Register",
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) {}

  public submitRegister(): void {
    this.formError = "";
    if (
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = "All fields are required, please try again.";
    } else {
      this.register();
    }
  }

  public register() {
    this.authenticationService
      .register(this.credentials)
      .then(() => {
        this.router.navigateByUrl(this.historyService.getLastNonLoginUrl());
      })
      .catch((message) => {
        this.formError = message;
      });
  }

  ngOnInit() {}
}
