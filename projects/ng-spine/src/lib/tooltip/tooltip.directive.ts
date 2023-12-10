import { Directive, Input, TemplateRef } from '@angular/core';
import { TooltipBaseDirective, TooltipTrigger } from './tooltip.base';

@Directive({
  selector: '[ngxTooltip]',
  exportAs: 'ngxTooltip',
  standalone: true,
  providers: [{ provide: TooltipBaseDirective, useExisting: TooltipDirective }],
})
export class TooltipDirective extends TooltipBaseDirective {
  @Input() override title?: string | undefined;
  @Input() override titleTemplate?: TemplateRef<any> | undefined;
  @Input() override titleTemplateContext?: { $implicit: any } | undefined;
  @Input() override trigger: TooltipTrigger = 'hover';
}
