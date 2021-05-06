import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  @Input() facilities: any;
  @Input() isLoggedIn: () => void;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
