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
    author: "",
    rating: 5,
    reviewText: "",
  };

  constructor(
    private loc8rDataService: Loc8rDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  private isFormValid(): boolean {
    if (
      this.newReview.author &&
      this.newReview.rating &&
      this.newReview.reviewText
    ) {
      return true;
    } else {
      return false;
    }
  }

  private resetAndHideReviewForm(): void {
    this.isFormVisible = false;
    this.newReview.author = "";
    this.newReview.rating = 5;
    this.newReview.reviewText = "";
  }

  public submitReview(): void {
    this.formError = "";
    this.newReview.author = this.getUsername();
    if (this.isFormValid()) {
      this.loc8rDataService
        .addReviewByLocationId(this.location._id, this.newReview)
        .then((review: Review) => {
          let reviews = this.location.reviews.slice(0);
          reviews.unshift(review);
          this.location.reviews = reviews;
          this.resetAndHideReviewForm();
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
