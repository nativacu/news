import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CategoriesPageComponent,
    AccountInfoComponent,
    LoginPageComponent,
    AllVideosComponent,
    UploadPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
