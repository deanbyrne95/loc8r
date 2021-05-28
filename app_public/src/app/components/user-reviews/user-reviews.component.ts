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
  @Output() updatedReview = new EventEmitter<Review>();

  public isFormVisible = false;
  public owner: boolean;
  public formError = "";
  public reviewForm: Review = {
    _id: "",
    name: "",
    email: "",
    rating: 0,
    reviewText: "",
    createdOn: new Date(),
  };

  constructor(
    private authenticationService: AuthenticationService,
    private loc8rDataService: Loc8rDataService
  ) {}

  public getUsername(): string {
    const user = this.authenticationService.getCurrentUser();
    return user.name ? user.name : "Guest";
  }

  public isAdminUser(): boolean {
    const user = this.authenticationService.getCurrentUser();
    return user.admin;
  }

  public getEmail(): string {
    const user = this.authenticationService.getCurrentUser();
    return user.email ? user.email : "Guest@email.com";
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private checkOwnership(email: string): void {
    if (this.isLoggedIn()) {
      const authorEmail: string = this.getEmail();
      this.owner = (email === authorEmail || this.isAdminUser());
    }
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

  public editReview(bool: boolean): void {
    this.isFormVisible = bool;
    this.formError = "";
    if (this.isFormVisible) {
      this.reviewForm = {
        _id: this.review._id,
        name: this.review.name,
        email: this.review.email,
        rating: this.review.rating,
        reviewText: this.review.reviewText,
        createdOn: this.review.createdOn,
      };
    } else {
      this.reviewForm = new Review();
    }
  }

  ngOnInit() {
    this.checkOwnership(this.review.email);
  }

  public deleteReview(): void {
    this.formError = "";
    this.loc8rDataService
      .deleteReviewById(this.location._id, this.review._id)
      .then(() => {
        this.updatedReview.emit(this.review);
      })
      .catch((err) => {
        this.formError = err;
      });
  }

  public updateReview(): void {
    this.formError = "";
    if (this.isFormValid(this.reviewForm)) {
      this.loc8rDataService
      .updateReviewById(this.location._id, this.reviewForm)
      .then(() => {
        this.updatedReview.emit(this.review);
        this.editReview(false);
      });
    } else {
      console.error("Not valid");
      this.formError = "All fields required, please try again";
    }
  }
}
