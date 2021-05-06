import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { User } from "src/app/classes/user";
import { Loc8rDataService } from "src/app/services/loc8r-data.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  user: User;
  public pageContent = {
    header: {
      title: "Your Profile",
      strapline: "",
    },
    sidebar: "",
  };

  constructor(
    private loc8rDataService: Loc8rDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
        let id = params.get("userId");
        return this.loc8rDataService.getUserById(id);
      })
    )
    .subscribe((user: User) => {
      this.user = user;
      this.pageContent.header.strapline = "Welcome back, " + user.name;
      this.pageContent.sidebar = "Seize the day, " + user.name + "!";
    });
  }
}
