import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceService} from "./user-service.service";

@Component({
  selector: 'app-protected',
  template: `
    <p>
      Private data:
      <span *ngFor="let row of data | keyvalue">[{{row.key}}:{{row.value}}]</span>
    </p>
  `,
  styles: []
})
export class ProtectedComponent implements OnInit, OnDestroy {
  private data;
  private subs$;

  constructor(private userService: UserServiceService) {
  }

  ngOnInit() {
    this.subs$ = this.userService.sendGet('http://localhost:3000/api/protected')
    .subscribe(res => {
        console.log(res);
        this.data = res
      },
      error => console.error(error));
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
