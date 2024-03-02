import { animate, style, transition, trigger } from '@angular/animations';
import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbarModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  animations: [
    trigger('footerAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0
        }),
        animate(200, style({
          height: '*',
          opacity: 1
        })),
        animate(200)
      ])
    ])
  ]
})
export class FooterComponent {

  year = signal(new Date().getFullYear());

}
