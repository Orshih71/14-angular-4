import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignInComponent} from "./sign-in.component";
import {SignUpComponent} from "./sign-up.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProtectedComponent} from "./protected.component";
import {AppHttpInterceptor} from "./app.http-interceptor";
import {TokenCheckGuard} from "./token-check.guard";

const MyRoutes: Routes = [
  {path: "signin", component: SignInComponent},
  {path: "signup", component: SignUpComponent},
  {path: "client/protected",  component: ProtectedComponent, canActivate:[TokenCheckGuard]}
];

@NgModule({
  declarations: [
    AppComponent, SignUpComponent, SignInComponent, ProtectedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(MyRoutes)
  ],
  providers: [[{provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true}]],
  bootstrap: [AppComponent]
})
export class AppModule {
}
