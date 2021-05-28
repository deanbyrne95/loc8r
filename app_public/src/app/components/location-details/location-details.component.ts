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
    name: "",
    email: "",
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
      review.name &&
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
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public submitReview(): void {
    this.newReview.name = this.getUsername();
    this.newReview.email = this.getEmail();
    console.log(this.newReview);
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
    const user = this.authenticationService.getCurrentUser();
    return user.name ? user.name : "Guest";
  }

  public getEmail(): string {
    const user = this.authenticationService.getCurrentUser();
    return user.email ? user.email : "Guest@email.com";
  }
}
