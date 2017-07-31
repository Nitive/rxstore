import { Subject } from 'rxjs'
import { Api } from '../api'

export const api$ = new Subject<Api>()
