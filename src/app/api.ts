import { Observable } from 'rxjs'

export class Api {
  getIssues() {
    return Observable.of({ issues: [{ summary: 'issue', id: 1 }] })
  }
}
