import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INavItem } from './sidenav.model';
import { SidenavStatic } from './sidenav.static';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  protected sideNavItems: INavItem[] = [...SidenavStatic.navItems];
}
