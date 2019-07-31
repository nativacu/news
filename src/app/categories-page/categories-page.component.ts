import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  videos: Array<any>;
  latestURL: string;
  latestCat: Array<string>;
  tags: Array<any>;

  constructor(private db: DbService, private router: Router, private auth: AuthService) {
    this.tags = new Array();
    db.getVideos().subscribe((vids) => {
      this.videos = vids;
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
