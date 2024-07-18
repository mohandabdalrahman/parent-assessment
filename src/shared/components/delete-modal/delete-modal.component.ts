import {Component, EventEmitter, inject, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";
import {Utilities} from "../../../utilities";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent implements OnDestroy {
  subscriptions = new Subscription();
  @ViewChild('content') modal: TemplateRef<any> | undefined;
  @Input() selectedUser!: User ;
  @Output() deleteUserEvent = new EventEmitter<User>();
  private modalService = inject(NgbModal);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  closeResult = '';


  open() {
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title', }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  deleteUser() {
    this.subscriptions.add(
      this.userService.deleteUser(this.selectedUser?.id).subscribe(res => {
        this.modalService.dismissAll();
        this.deleteUserEvent.emit(this.selectedUser);
        this.toastr.success('User has been deleted successfully');
      }, error => {
        console.error(error);
        this.toastr.error('Failed to delete user');
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
