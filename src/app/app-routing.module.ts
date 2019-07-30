import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent},
  { path: 'categories-page', component: CategoriesPageComponent},
  { path: 'account-info', component: AccountInfoComponent},
  { path: 'login-page', component: LoginPageComponent},
  { path: 'all-videos', component: AllVideosComponent},
  { path: 'upload-page', component: UploadPageComponent},
  { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
