import {
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';

export const OverlayPositionMap = {
  topCenter: new ConnectionPositionPair(
    { originX: 'center', originY: 'top' },
    { overlayX: 'center', overlayY: 'bottom' }
  ),
  topLeft: new ConnectionPositionPair(
    { originX: 'start', originY: 'top' },
    { overlayX: 'start', overlayY: 'bottom' }
  ),
  topRight: new ConnectionPositionPair(
    { originX: 'end', originY: 'top' },
    { overlayX: 'end', overlayY: 'bottom' }
  ),
  rightCenter: new ConnectionPositionPair(
    { originX: 'end', originY: 'center' },
    { overlayX: 'start', overlayY: 'center' }
  ),
  rightTop: new ConnectionPositionPair(
    { originX: 'end', originY: 'top' },
    { overlayX: 'start', overlayY: 'top' }
  ),
  rightBottom: new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'start', overlayY: 'bottom' }
  ),
  bottomCenter: new ConnectionPositionPair(
    { originX: 'center', originY: 'bottom' },
    { overlayX: 'center', overlayY: 'top' }
  ),
  bottomLeft: new ConnectionPositionPair(
    { originX: 'start', originY: 'bottom' },
    { overlayX: 'start', overlayY: 'top' }
  ),
  bottomRight: new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'top' }
  ),
  leftCenter: new ConnectionPositionPair(
    { originX: 'start', originY: 'center' },
    { overlayX: 'end', overlayY: 'center' }
  ),
  leftTop: new ConnectionPositionPair(
    { originX: 'start', originY: 'top' },
    { overlayX: 'end', overlayY: 'top' }
  ),
  leftBottom: new ConnectionPositionPair(
    { originX: 'start', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'bottom' }
  ),
};

export type PositionType = keyof typeof OverlayPositionMap;

export const getPositionClass = (
  change: ConnectedOverlayPositionChange
): PositionType | null => {
  const { connectionPair } = change;
  for (const pos in OverlayPositionMap) {
    const configConnectedPair = OverlayPositionMap[pos as PositionType];
    if (
      configConnectedPair.originX === connectionPair.originX &&
      configConnectedPair.originY === connectionPair.originY &&
      configConnectedPair.overlayX === connectionPair.overlayX &&
      configConnectedPair.overlayX === connectionPair.overlayX
    ) {
      return pos as PositionType;
    }
  }
  return null;
};
