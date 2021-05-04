import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Loc8rDataService } from "src/app/services/loc8r-data.service";
import { Location } from "../home-list/home-list.component";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.css"],
})
export class DetailsPageComponent implements OnInit {
  location: Location;

  constructor(
    private loc8rDataService: Loc8rDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get("locationId");
          return this.loc8rDataService.getLocationById(id);
        })
      )
      .subscribe((location: Location) => {
        this.location = location;
        this.pageContent.header.title = location.name;
        this.pageContent.sidebar = `${location.name} is on Loc8r because it has accessible Wi-Fi and space to sit down with your laptop and get some work done.\n\nIf you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.`;
      });
  }

  public pageContent = {
    header: {
      title: "",
      strapline: "",
    },
    sidebar: "",
  };
}
