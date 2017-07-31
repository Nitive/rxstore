import * as React from 'react'

export function createConnect<State, Interactions>() {
  return function connect<ConnectedProps, OwnProps>(mapProps: (state: State, interactions: Interactions) => ConnectedProps) {
    return function wrapComponent(Component: React.ComponentClass<ConnectedProps & OwnProps>): React.ComponentClass<OwnProps> {
      return class WrappedComponent extends React.Component<OwnProps, {}> {
        static displayName = `rxConnect(${Component.name || Component.displayName})`

        public render() {
          return <Component {...mapProps({} as State, {} as Interactions) as any} {...this.props} />
        }
      }
    }
  }
}
