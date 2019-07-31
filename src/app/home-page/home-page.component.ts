import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  videos: Array<any>;
  vid1: string;
  vid2: string;
  vid3: string;
  tags: Array<any>;

  constructor(private db: DbService, private router: Router, private auth: AuthService) {
    this.tags = new Array();
    db.getVideos().subscribe((vids) => {

      this.videos = vids;
      this.vid1 = this.videos[0].url;
      this.vid2 = this.videos[1].url;
      this.vid3 = this.videos[2].url;

    });

    db.getTags().subscribe((tags) => {
      console.log(tags);
      for (const tag of tags) {
        this.tags.push(tag.cat);
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('/login-page');
  }

  logout() {
    this.auth.signOut();
  }

  like(id: string, likes: number) {
    this.db.updateLikes(id, likes);
    document.getElementById('likeButton').setAttribute('disabled', 'true');
  }

}
