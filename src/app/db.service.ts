import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Video } from './video.model';
import { BehaviorSubject } from 'rxjs';

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
      return this.afs.collection('videos').snapshotChanges();
  }
}


