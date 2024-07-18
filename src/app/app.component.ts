import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PageHeaderComponent} from "../shared/components/page-header/page-header.component";
import {ListViewComponent} from "../shared/components/list-view/list-view.component";
import {AddEditModalComponent} from "../shared/components/add-edit-modal/add-edit-modal.component";
import {Subscription} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageHeaderComponent, ListViewComponent, AddEditModalComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export default class AppComponent implements OnInit, OnDestroy {
  @ViewChild('userModal') userModal: AddEditModalComponent | undefined;
  subscriptions = new Subscription();
  private userService = inject(UserService);
  users: User[] = [];
  title = 'parent-assessment';

  ngOnInit(): void {
    this.getAllUsers();
  }


  getAllUsers() {
    this.subscriptions.add(
      this.userService.getAllUsers().subscribe(res => {
        if (res?.data?.length) {
          this.users = res.data;
        }
      }, error => {
        console.error(error)
      })
    )
  }

  openCreateUserModel() {
    this.userModal?.open();
  }


  handleAddEditUser(user: User) {
    this.users.unshift(user);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
