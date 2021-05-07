import { Component, OnInit } from "@angular/core";
import { User } from "src/app/classes/user";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HistoryService } from "src/app/services/history.service";

@Component({
  selector: "app-framework",
  templateUrl: "./framework.component.html",
  styleUrls: ["./framework.component.css"],
})
export class FrameworkComponent implements OnInit {
  user: User = new User();
  constructor(
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) {}

  ngOnInit() {}

  public logout(): void {
    this.authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    const loggedIn = this.authenticationService.isLoggedIn();
    if (loggedIn) {
      this.getUser();
    }
    return loggedIn;
  }

  public getUser(): void {
    this.user = this.authenticationService.getCurrentUser();
  }
}
