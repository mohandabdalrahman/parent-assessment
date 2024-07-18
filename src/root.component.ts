import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TranslationModule} from "./shared/translation/translation.module";
import {TranslateService} from "@ngx-translate/core";
import {HttpClientModule} from "@angular/common/http";
import {SpinnerComponent} from "@shared/components/spinner/spinner.component";
import {LoadingService} from "@shared/services/loading.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslationModule,
    HttpClientModule,
    SpinnerComponent,
    NgIf
  ],
  providers: [TranslateService],
  template: `
    <spinner *ngIf="showLoading"></spinner>
    <router-outlet></router-outlet>`
})
export class RootComponent {
  private translate = inject(TranslateService)
  private loadingService = inject(LoadingService);
  showLoading = false;

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.loadingService.showLoader.subscribe((showLoading) => {
      this.showLoading = showLoading
    })
  }
}
