import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./shared/layout/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  template: `
    <navbar></navbar>
    <router-outlet></router-outlet>`
})
export class RootComponent {
}
