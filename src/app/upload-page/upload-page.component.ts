import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Video } from '../video.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  public cats: Array<any>;

  constructor(public db: DbService, private router: Router) {
    this.cats = new Array<any>();
  }

  ngOnInit() {
    this.db.getTags().subscribe((tags) => {
      for (const cat of tags) {
        this.cats.push(cat.cat);
      }
    });
  }

  upload(description: string, tags: string, fileInput: any) {
    console.log(fileInput);
    const video = fileInput[0];

    const tagsA = tags.split(',');
    console.log(tags);

    if (fileInput && description && tags){
      this.db.pushUpload(video.name, video);
      this.db.imgObs.subscribe((url) => {
        this.db.addTags(tagsA);
        if (url) {
          console.log(tags);
          const vid = new Video(tagsA, description, url);
          this.db.addVideo(vid);

          const resetForm = document.getElementById('form') as HTMLFormElement;
          resetForm.reset();
          window.alert('Succesfully uploaded video');
          setTimeout(() => {
            this.router.navigate(['/home-page']);
          }, 5000);
        }
      });
    }
  }

  selectCat(cat: string) {
  }

}
