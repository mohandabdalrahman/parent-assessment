import {Component, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {DrawerComponent} from "../drawer/drawer.component";
import {User} from "../../models/user.model";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {AddEditModalComponent} from "../add-edit-modal/add-edit-modal.component";

@Component({
  selector: 'list-view',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DrawerComponent,
    NgForOf,
    DeleteModalComponent,
    NgIf,
    NgClass,
    AddEditModalComponent
  ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnDestroy {

  subscriptions = new Subscription();
  @ViewChild('deleteModal') deleteModal: DeleteModalComponent | undefined;
  @ViewChild('userModal') userModal: AddEditModalComponent | undefined;
  @Input() users: User[] = [];
  private userService = inject(UserService);
  selectedUser!: User;
  userDetails!: User | null;

  openDeleteModal(selectedUser: User) {
    this.selectedUser = selectedUser;
    this.deleteModal?.open();
  }

  openModal(selectedUser: User, modalName: string) {
    this.selectedUser = selectedUser;
    this.userDetails= null
    // @ts-ignore
    this[modalName].open();
  }

  handleDeleteUser(user: User) {
    this.users = this.users.filter(item => item.id !== user.id);
  }


  fetchUserDetails(user: User) {
    this.selectedUser = user;
    this.subscriptions.add(
      this.userService.getUserById(user.id).subscribe(res => {
        // @ts-ignore
        this.userDetails = res['data']
      }, error => {
        console.error(error);
      })
    )
  }

  handleAddEditUser(user: User) {
    const index = this.users.findIndex(item => item.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }

  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
