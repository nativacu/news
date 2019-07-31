import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Video } from './video.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private uploadTask: firebase.storage.UploadTask;
  public imgObs: BehaviorSubject<string>;
  constructor(private afs: AngularFirestore) {
    this.imgObs = new BehaviorSubject(null);
  }

  pushUpload(name: string, file: any) {
    const storageRef =  firebase.storage().ref();
    this.uploadTask = storageRef.child(`${name}`).put(file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log(error);
         },
      () => {
        storageRef.child(`${name}`).getDownloadURL().then((url) => {
          this.imgObs.next(url);
        });
      });
  }

  getVideoById(id: string) {
    return this.afs.collection('videos').doc(id).snapshotChanges();
  }

  updateLikes(id: string, likes: number) {
    likes++;

    const data: any = {
      likes
    };
    this.afs.collection('videos').doc(id).update(data);
  }

  addVideo(video: Video) {

    const data: any = {
      tags: video.tags,
      description: video.description,
      url: video.url
    };

    return new Promise<any>((resolve, reject) => {
      this.afs
          .collection('videos')
          .add(data)
          .then(res => {
          }, err => reject(err));
    });
  }

  getVideos() {
      return this.afs.collection('videos').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return a.payload.doc.data() as Video;
        }))
      );
  }

  getTags() {
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data() as Tag;
      }))
    );
  }

  addTags(tags: Array<string>) {
    const ts = Array<any>();
    this.getTags().subscribe((currTags) => {
      for (const x of currTags) {
        ts.push(x.cat);
      }
      for (const t of tags) {
        if (!ts.includes(t)) {
          return new Promise<any>((resolve, reject) => {
            this.afs
                .collection('categories')
                .add({cat: t})
                .then(res => {
                }, err => reject(err));
          });
        }
      }
    });
    return;
  }
}


