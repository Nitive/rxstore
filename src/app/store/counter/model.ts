import { Observable, Subject } from 'rxjs'
import { inc$, dec$ } from './interactions'

export const count$ = Observable
  .merge(
    inc$.mapTo(+1),
    dec$.mapTo(-1),
  )
  .scan((acc, x) => acc + x)
  .startWith(0)

export function counter() {
  const inc$ = new Subject<void>()
  const dec$ = new Subject<void>()

  const state$ = Observable
    .merge(
      inc$.mapTo(+1),
      dec$.mapTo(-1),
    )
    .scan((acc, x) => acc + x)
    .startWith(0)

  return {
    state$,
    interactions: { inc$, dec$ },
  }
}
