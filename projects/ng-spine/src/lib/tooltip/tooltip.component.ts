import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PositionType } from '../core/overlay';

export interface ITemplateComponent {
  baseClass?: string;
  title?: string;
  titleTemplate?: TemplateRef<any>;
  titleTemplateContext?: { $implicit: any };
}

@Component({
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent {
  private cdr = inject(ChangeDetectorRef);
  positionClass!: PositionType;
  baseClass!: string;
  title?: string;
  titleTemplate?: TemplateRef<any>;
  titleTemplateContext?: { $implicit: any };

  updateComponentState(data: ITemplateComponent) {
    this.baseClass = data.baseClass || 'ng-tooltip';
    this.title = data.title || undefined;
    this.titleTemplate = data.titleTemplate || undefined;
    this.titleTemplateContext = data.titleTemplateContext || undefined;
    this.cdr.detectChanges();
  }

  updatePositionClass(pos: PositionType) {
    this.positionClass = pos;
    this.cdr.detectChanges();
  }
}
