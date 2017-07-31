import * as React from 'react'
import { render } from 'react-dom'
import { connect } from './connect'

interface AppProps {
  count: number,
  decClick: React.MouseEventHandler<HTMLButtonElement>,
  incClick: React.MouseEventHandler<HTMLButtonElement>,
}

class App extends React.Component<AppProps, {}> {
  public render() {
    const { props } = this
    return (
      <div>
        <button onClick={props.decClick}>-</button>
        {props.count}
        <button onClick={props.incClick}>+</button>
      </div>
    )
  }
}

const AppContainer = connect<AppProps, {}>((state, interactions) => {
  return {
    count: state.count,
    decClick: interactions.counter.inc$.next,
    incClick: interactions.counter.dec$.next,
  }
})(App)

render(<AppContainer />, document.querySelector('#app'))
