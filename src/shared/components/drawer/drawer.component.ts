import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {User} from "../../models/user.model";

@Component({
  selector: 'drawer',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {
  @Input() userDetails!: User | null;
  @Output() deleteUserEvent = new EventEmitter<User>();
  @Output() editUserEvent = new EventEmitter<User>();

  closeDrawer() {
    this.userDetails = null;
  }
}
