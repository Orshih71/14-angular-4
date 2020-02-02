import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a [routerLink]="['signin']">Sign in</a><br>
    <a [routerLink]="['signup']">Sign up</a>
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class AppComponent {

}
