import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { notesActions } from '../../../features/store';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('navAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0
        }),
        animate(
          200,
          style({
            height: '*',
            opacity: 1
          })
        ),
        animate(200)
      ]),
    ]),
  ],
})
export class NavBarComponent {
  private store = inject(Store);
  private router = inject(Router);

  routeToAddNote() {
    this.store.dispatch(notesActions.initNote());
    this.router.navigate(['/modify']);
  }
}
