import { Observable } from 'rxjs';

export const createIntersection$ = (
  elem: HTMLElement,
  isContinuous: boolean = true
) => {
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  return new Observable<boolean>((observer) => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      observer.next(isIntersecting);

      // If we dont need to observe continuously
      isIntersecting && !isContinuous && intersectionObserver.disconnect();
    }, options);
    intersectionObserver.observe(elem);

    return {
      unsubscribe() {
        console.log('Observer disconnected');
        intersectionObserver.disconnect();
      },
    };
  });
};
