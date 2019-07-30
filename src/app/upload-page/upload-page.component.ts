import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Video } from '../video.model';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  public cats: Array<any> = ['Tech news', 'Trump', 'International', 'Travel'];

  constructor(public db: DbService) {
  }

  ngOnInit() {
  }

  upload(description: string, tags: string, fileInput: any) {
    console.log(fileInput);
    let video = fileInput[0];

    console.log(tags);

    if (fileInput && description && tags){
      this.db.pushUpload(video.name, video);

      this.db.imgObs.subscribe((url) => {
        if (url){
          console.log(tags);
          let vid = new Video(tags.split(','), description, url);
          this.db.addVideo(vid);
        }
      });
    } 
  }

  selectCat(cat: string) {
  }

}
