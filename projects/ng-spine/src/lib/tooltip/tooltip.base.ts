import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  inject,
} from '@angular/core';
import { Observable, Subject, fromEvent, takeUntil } from 'rxjs';
import { createIntersection$ } from '../core/intersection';
import { OverlayPositionMap, getPositionClass } from '../core/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip.component';

export type TooltipTrigger = 'hover' | 'click' | 'focus';
const DefaultPosMap = [
  OverlayPositionMap.bottomCenter,
  OverlayPositionMap.topCenter,
];

@Directive()
export abstract class TooltipBaseDirective implements OnDestroy, AfterViewInit {
  protected ngZone = inject(NgZone);
  private overlay = inject(Overlay);
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);

  protected destroy$ = new Subject<void>();
  protected positionMap: ConnectedPosition[] = DefaultPosMap;
  private overlayRef!: OverlayRef;
  private component?: TooltipComponent;
  private componentPortal?: ComponentPortal<TooltipComponent>;
  private intersection$ = createIntersection$(this.nativeElement);

  title?: string;
  titleTemplate?: TemplateRef<any>;
  titleTemplateContext?: { $implicit: any };
  trigger: TooltipTrigger = 'hover';

  get nativeElement() {
    return this.elementRef.nativeElement;
  }

  protected isComponentValid() {
    return (
      coerceBooleanProperty(this.title) ||
      coerceBooleanProperty(this.titleTemplate)
    );
  }

  protected hoverMouseEnter$ = this.ngZone.runOutsideAngular(() =>
    fromEvent(this.nativeElement, 'mouseenter')
  );

  protected hoverMouseLeave$ = this.ngZone
    .runOutsideAngular(() => fromEvent(this.nativeElement, 'mouseleave'))
    .pipe(takeUntil(this.destroy$));

  protected click$ = this.ngZone
    .runOutsideAngular(() => fromEvent(this.nativeElement, 'click'))
    .pipe(takeUntil(this.destroy$));

  protected focus$ = this.ngZone
    .runOutsideAngular(() => fromEvent(this.nativeElement, 'focus'))
    .pipe(takeUntil(this.destroy$));

  protected initTriggerListener() {
    if (this.trigger === 'hover') {
      this.hoverMouseEnter$.subscribe(() => this.ngZone.run(() => this.show()));
      this.hoverMouseLeave$.subscribe(() => this.ngZone.run(() => this.hide()));
    } else if (this.trigger === 'click') {
      this.click$.subscribe(() => this.ngZone.run(() => this.toggle()));
    } else if (this.trigger === 'focus') {
      this.focus$.subscribe(() => this.ngZone.run(() => this.toggle()));
    }
  }

  protected overlayConfig() {
    const streategy = this.overlay
      .position()
      .flexibleConnectedTo(this.nativeElement)
      .withPositions(this.positionMap);

    streategy.positionChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        const positionClass = getPositionClass(res);
        if (this.component && positionClass) {
          this.component.updatePositionClass(positionClass);
        }
      },
    });

    return new OverlayConfig({
      positionStrategy: streategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition({
        scrollThrottle: 20,
      }),
    });
  }

  private createComponent() {
    if (!this.componentPortal) {
      this.componentPortal = new ComponentPortal(TooltipComponent);
    }
    this.component = this.overlayRef.attach(this.componentPortal).instance;
    this.component.updateComponentState({
      baseClass: 'ng-tooltip',
      title: this.title,
      titleTemplate: this.titleTemplate,
      titleTemplateContext: this.titleTemplateContext,
    });
  }

  protected toggle() {
    this.overlayRef.hasAttached()
      ? this.overlayRef.detach()
      : this.createComponent();
  }

  protected show() {
    if (!this.overlayRef.hasAttached()) {
      this.createComponent();
    }
  }

  protected hide() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  ngAfterViewInit(): void {
    if (!this.isComponentValid()) {
      throw new Error('Tooltip expects either title or titleTemplate');
    } else {
      this.initTriggerListener();
    }

    this.overlayRef = this.overlay.create(this.overlayConfig());

    if (isPlatformBrowser(this.platformId)) {
      this.intersection$
        .pipe(takeUntil(this.destroy$))
        .subscribe((isVisible) => !isVisible && this.hide());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
