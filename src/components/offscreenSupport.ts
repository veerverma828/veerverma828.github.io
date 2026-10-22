/**
 * True when the hero bot can run in a worker: OffscreenCanvas, canvas hand-over and workers exist,
 * and the visitor has not asked for reduced motion (they get the calm main-thread bot instead).
 */
export function canUseWorkerBot(): boolean {
  try {
    return (
      typeof OffscreenCanvas !== 'undefined' &&
      typeof Worker !== 'undefined' &&
      typeof HTMLCanvasElement.prototype.transferControlToOffscreen === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  } catch {
    return false;
  }
}
