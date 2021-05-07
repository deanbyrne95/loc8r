import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/classes/user";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Loc8rDataService } from "src/app/services/loc8r-data.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  @Input() object: any;
  @Input() function: (args: any) => void;

  constructor(
    private loc8rDataService: Loc8rDataService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}
}
