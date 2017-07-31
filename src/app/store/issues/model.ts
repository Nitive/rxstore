import { Observable, Subject } from 'rxjs'
import { api$ } from '../common-interactions'
import { load$ } from './interactions'

interface Issue {
  text: string,
}

export type Issues
  = { status: 'loading' }
  | { status: 'errored', errorMessage: string }
  | { status: 'loaded', issues: Issue[] }

// export const issues$ = Observable.combineLatest(api$, load$)
//   .mergeMap(([api]) => {
//     return Observable.merge<Issues>(
//       Observable.of<Issues>({ status: 'loading' }),
//       api.getIssues()
//         .map((res): Issues => ({
//           status: 'loaded',
//           issues: res.issues.map(issue => ({ text: `${issue.summary} #${issue.id}` })),
//         }))
//         .catch(err => Observable.of<Issues>({
//           status: 'errored',
//           errorMessage: `Error: ${err}`,
//         }))
//     )
//   })
//   .startWith<Issues>({ status: 'loading' })

export function issues() {
  const api$ = new Subject<any>();
  const load$ = new Subject<void>();

  return Observable.combineLatest(api$, load$)
    .mergeMap(([api]) => {
      return Observable.merge<Issues>(
        Observable.of<Issues>({ status: 'loading' }),
        api.getIssues()
          .map((res): Issues => ({
            status: 'loaded',
            issues: res.issues.map(issue => ({ text: `${issue.summary} #${issue.id}` })),
          }))
          .catch(err => Observable.of<Issues>({
            status: 'errored',
            errorMessage: `Error: ${err}`,
          }))
      )
    })
    .startWith<Issues>({ status: 'loading' })
}
