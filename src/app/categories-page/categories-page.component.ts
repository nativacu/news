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
  subscriptions: Array<string>;
  tags: Array<any>;
  user: any;

  constructor(private db: DbService, private router: Router, public auth: AuthService) {
    this.tags = new Array();

    auth.user.subscribe((us) => {
      this.user = us;
      this.subscriptions = us.subscriptions;
    });

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
    this.router.navigateByUrl('/login-page');
  }

  like(id: string, likes: number) {
    this.db.updateLikes(id, likes);
    document.getElementById('likeButton').setAttribute('disabled', 'true');
  }

  subscribe(cat: string) {
    const cats = this.subscriptions;
    cats.push(cat);
    console.log(cats);
    this.db.updateUserTags(cats, this.user);
  }

  unsubscribe(cat: string) {
    const cats = new Array<string>();
    for (const category of this.subscriptions) {
      if (category !== cat) {
        cats.push(category);
      }
    }
    this.db.updateUserTags(cats, this.user);
  }


}
