import { Observable, Subject } from 'rxjs'

interface Interaction<T> {
  subject: Subject<T>
}

export function createInteraction<T>(): Interaction<T> {
  return {
    subject: new Subject<T>(),
  }
}

// interface Store<State, Interactions> {
//   state$: Subject<State>,
//   interactions: Interactions,
// }

interface Store<State, Action> {
  state$: Subject<State>,
  dispatch(action: Action): void,
}

export function createStore<State, Action>(getState: (action$: Observable<Action>) => Observable<State>): Store<State, Action> {
  const stateSubject = new Subject<State>();
  const actions$ = new Subject<Action>();
  const state$ = getState(actions$)
  state$.subscribe(stateSubject)

  return {
    state$: stateSubject,
    dispatch(action: Action) {
      actions$.next(action)
    },
  }
}

// export function createStore<State, Interactions>(state$: Observable<State>, interactions: Interactions): Store<State, Interactions> {
//   const stateSubject = new Subject<State>();
//   state$.subscribe(stateSubject)

//   return {
//     state$: stateSubject,
//     interactions,
//   }
// }
