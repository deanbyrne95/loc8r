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
  constructor(
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) {}

  ngOnInit() {}

  public logout(): void {
    this.authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : "Guest";
  }
}
