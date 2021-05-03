import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public pageContent = {
    header: {
      title: 'Location name',
      strapline: ''
    },
    sidebar: 'is on Loc8r because it has accessible Wi-Fi and space to sit down with your laptop and get some work done.\n\nIf you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
  }

}
