import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Location } from "src/app/classes/location";
import { Review } from "src/app/classes/review";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Loc8rDataService } from "src/app/services/loc8r-data.service";

@Component({
  selector: "app-user-reviews",
  templateUrl: "./user-reviews.component.html",
  styleUrls: ["./user-reviews.component.css"],
})
export class UserReviewsComponent implements OnInit {
  @Input() location: Location;
  @Input() review: Review;
  @Output() deletedReview = new EventEmitter<Review>();
  public owner: boolean;
  public formError = "";

  constructor(
    private authenticationService: AuthenticationService,
    private loc8rDataService: Loc8rDataService
  ) {}

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : "Guest";
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private checkOwnership(name: string): void {
    if (this.isLoggedIn()) {
      const author: string = this.getUsername();
      this.owner = name === author;
    }
  }

  ngOnInit() {
    this.checkOwnership(this.review.author);
  }

  public deleteReview(): void {
    this.formError = "";
    this.loc8rDataService
      .deleteReviewById(this.location._id, this.review._id)
      .then(() => {
        this.deletedReview.emit(this.review);
      })
      .catch((err) => {
        this.formError = err;
      });
  }
}
