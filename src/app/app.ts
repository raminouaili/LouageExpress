import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LouageExpress');

  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'fr';
    translate.setDefaultLang('fr');
    translate.use(lang);
  }
}
