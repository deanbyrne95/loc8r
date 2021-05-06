import { Component, Input, OnInit } from "@angular/core";
import { Location } from "src/app/classes/location";
import { Review } from "src/app/classes/review";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Loc8rDataService } from "src/app/services/loc8r-data.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-location-details",
  templateUrl: "./location-details.component.html",
  styleUrls: ["./location-details.component.css"],
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;
  public formError: string;

  public apiKey: string = environment.mapsApiKey;

  public isFormVisible = false;
  public newReview: Review = {
    _id: "",
    author: "",
    rating: 5,
    reviewText: "",
    createdOn: new Date(),
  };

  constructor(
    private loc8rDataService: Loc8rDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public toggleReview(bool: boolean): void {
    this.formError = "";
    this.isFormVisible = bool;
    this.newReview = new Review
  }

  private isFormValid(review: Review): boolean {
    if (
      review.author &&
      review.rating &&
      review.reviewText
    ) {
      return true;
    } else {
      return false;
    }
  }

  public refreshLocation(location: Location) {
    this.loc8rDataService
      .getLocationById(location._id)
      .then((location: Location) => {
        this.location = location;
      });
  }

  public submitReview(): void {
    this.newReview.author = this.getUsername();
    if (this.isFormValid(this.newReview)) {
      this.loc8rDataService
        .addReviewByLocationId(this.location._id, this.newReview)
        .then(() => {
          this.refreshLocation(this.location);
          this.toggleReview(false);
        });
    } else {
      console.error("Not valid");
      this.formError = "All fields required, please try again";
    }
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : "Guest";
  }
}
