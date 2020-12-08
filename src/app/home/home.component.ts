import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageObject = [{
      image: 'assets/Account_Opening.jpg',
      thumbImage: 'assets/Account_Opening.jpg',
      title: 'Angel Broking Authorized Partner'
  }, 
  {
      image: 'assets/Account_Opening_1.jpg',
      thumbImage: 'assets/Account_Opening_1.jpg',
      title: 'Angel Broking Authorized Partner'
  },
  {
      image: 'assets/Angel_Image_1.jpg',
      thumbImage: 'assets/Angel_Image_1.jpg',
      title: 'Angel Broking Authorized Partner'
  },
  {
      image: 'assets/Angel_Image_2.jpg',
      thumbImage: 'assets/Angel_Image_2.jpg',
      title: 'Angel Broking Authorized Partner'
  }];

  constructor() { }

  ngOnInit(): void {

  }

}
