import { Component } from '@angular/core';
import { TooltipDirective } from '../../../projects/ng-spine/src/lib/tooltip/tooltip.directive';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {}
