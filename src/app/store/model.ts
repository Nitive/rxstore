import { Observable, Subject } from 'rxjs'
// import { counter } from './counter/model'
// import { Issues, issues } from './issues/model'

// export interface State {
//   count: number,
//   issues: Issues,
// }

// export const state$: Observable<State> = Observable.combineLatest(count$, issues$)
//   .map(([count, issues]): State => ({ count, issues }))

// type State$<X, Y, T extends { state$: Observable<X>, interactions: Y }> = {
//   [P in keyof T]: T['state$']
// }

// type State$<X, Y, T extends { state$: Observable<X>, interactions: Y }> = {
//   [P in keyof T]: Y
// }

function combineObject<T>(obj: { [K in keyof T]: Observable<T[K]>}): Observable<{ [K in keyof T]: T[K] }> {
  const keys = Object.keys(obj) as any as Array<keyof T>;
  const observables = keys.map(key => obj[key])

  return Observable.combineLatest(...observables)
    .map(results => {
      return keys.reduce((acc, key, index) => {
        return { ...acc, [key]: results[index]}
      }, {})
    })
}

// const ob = { state: Observable.of('data'), test: Observable.from([3, 4, 5]) }

// combineObject(ob)
//   .subscribe(result => {
//     console.log(result.state, result.test)
//   })

// console.log(o)
// o.state$.subscribe(console.log)
// o.test$.subscribe(console.log)

function mapObj<T, V>(obj: { [K in keyof T]: T[K] }, update: <K extends keyof T, B>(x: T[K]) => B): { [K in keyof T]: V } {
  const keys = Object.keys(obj) as any as Array<keyof T>;
  return keys.reduce((acc, key) => {
    return { ...acc, [key]: update(obj[key]) }
  }, {} as any)
}

// function getState<T>(obj: { [K in keyof T]: T[K] }): { [K in keyof T]: T[K]['state$'] } {
//   const keys = Object.keys(obj) as any as Array<keyof T>;
//   return keys.reduce((acc, key, index) => {
//     return { ...acc, [key]: results[index]}
//   }, {})
// }

function combineModels<T, I>(
  modelsMap: { [K in keyof (T | I)]: { state$: Observable<T[K]>, interactions: I[K] } },
): { state$: Observable<{ [K in keyof T]: T[K] }>, interactions: { [K in keyof I]: I[K] } } {
  return {
    state$: combineObject(mapObj(modelsMap, m => m.state$)),
    // state$: Observable.combineLatest(counterModel.state$, issuesModel.state$)
    //   .map(([count, issues]): State => ({ count, issues })),
    interactions: mapObj(modelsMap, m => m.interactions),
  } as any
}

const inc1$ = new Subject<void>()
const model1 = { state$: inc1$.mapTo(1).scan((acc, x) => acc + x).startWith(0), interactions: { inc$: inc1$ } }
const model2 = { state$: Observable.of(1), interactions: { inc$: new Subject<void>() } }

const together = combineModels({
  counter1: model1,
  counter2: model2,
})

// console.log(together)

// model1.state$.subscribe(d => console.log('model1', d))
// model1.interactions.inc$.next()
// model1.interactions.inc$.next()

together.state$.subscribe(console.log)

together.interactions.counter1.inc$.next()
together.interactions.counter1.inc$.next()

// export function state() {
//   const counterModel = counter()
//   const issuesModel = issues()

//   // return {
//   //   state$: { count: counterModel.state$, issues: issuesModel.state$ },
//   //   // state$: Observable.combineLatest(counterModel.state$, issuesModel.state$)
//   //   //   .map(([count, issues]): State => ({ count, issues })),
//   //   interactions: {
//   //     count: counterModel.interactions,
//   //     issues: issuesModel.interactions,
//   //   }
//   // }
// }
