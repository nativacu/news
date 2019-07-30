import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  videos: Array<any>;
  latestURL: string;
  latestCat: Array<string>;
  constructor(private db: DbService) {
    db.getVideos().subscribe((vids) => {
      this.videos = vids;
      this.latestURL = this.videos[1].payload.doc._document.proto.fields.url.stringValue;
      this.latestCat = this.videos[5].payload.doc._document.proto.fields.tags;

      
      console.log(this.latestCat);
      console.log(this.latestURL); });
  }

  ngOnInit() {
  }

}
