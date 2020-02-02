import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SignInComponent} from "./sign-in.component";
import {SignUpComponent} from "./sign-up.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
const MyRoutes : Routes = [
  {path:"signin", component: SignInComponent},
  {path:"signup", component: SignUpComponent}
];
@NgModule({
  declarations: [
    AppComponent, SignUpComponent, SignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(MyRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
