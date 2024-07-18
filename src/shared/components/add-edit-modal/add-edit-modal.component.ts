import {
  Component,
  EventEmitter,
  inject,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User, UserFormType} from "../../models/user.model";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {JsonPipe, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'add-edit-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.scss'
})
export class AddEditModalComponent implements OnInit, OnDestroy, OnChanges {
  subscriptions = new Subscription();
  @ViewChild('content') modal: TemplateRef<any> | undefined;
  @Input() selectedUser!: User;
  @Input() isEditMode = false;
  @Output() addEditUserEvent = new EventEmitter<User>();
  private modalService = inject(NgbModal);
  private nonNullableFormBuilder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);

  closeResult = '';
  userForm!: FormGroup<UserFormType>;


  ngOnInit(): void {
    this.initUserForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'].currentValue) {
      this.userForm.patchValue({
        name: changes['selectedUser'].currentValue.first_name,
        job: changes['selectedUser'].currentValue.last_name
      })

    }
  }

  initUserForm() {
    this.userForm = this.nonNullableFormBuilder.group({
      name: this.nonNullableFormBuilder.control('', [Validators.required]),
      job: this.nonNullableFormBuilder.control('', [Validators.required])
    })
  }


  open() {
    this.userForm.reset();
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(
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

  submitUserForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const calledFunction = this.isEditMode ? 'updateUser' : 'createUser';
    this.subscriptions.add(
      this.userService[calledFunction]({...this.userForm.getRawValue() , id: this.selectedUser?.id ?? 0}).subscribe((res) => {
        const newUser: User = {
          id: res.id,
          first_name: res.name,
          avatar: `https://avatar.iran.liara.run/public/13`
        };
        this.addEditUserEvent.emit(newUser);
        this.modalService.dismissAll();
        this.toastr.success('User has been added successfully');
      }, error => {
        console.error(error);
        this.toastr.error('Failed to create user');
      })
    )
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
