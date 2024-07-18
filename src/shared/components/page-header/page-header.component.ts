import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() pageName = 'users list';
  @Input() btnText = 'new user'

  @Output() onBtnClick = new EventEmitter<void>();


  handleBtnClick() {
    this.onBtnClick.emit();
  }
}
