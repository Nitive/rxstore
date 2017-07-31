import { createConnect } from '../lib/react-rx'
import { State } from './store/model'

export const connect = createConnect<State>()
