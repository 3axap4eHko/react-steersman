import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import Pattern from 'react-steersman-url/Pattern';
import Transition, { STATUS_NONE, STATUS_ENTER, STATUS_EXIT } from 'react-steersman-transition/Transition';

function DefaultTransition({ children, ...props }) {
  return (
    <Transition {...props} timeout={0}>
      {status => children(status)}
    </Transition>
  );
}

export default class Route extends Component {

  static propTypes = {
    render: func.isRequired,
    transition: func.isRequired,
    path: string,
  };

  static defaultProps = {
    path: '/',
    transition: DefaultTransition,
  };

  static contextTypes = {
    history: object,
    onRouteUpdated: func,
  };

  match = pathname => {
    return this.pattern.match(pathname);
  };

  constructor(props, context) {
    super(props, context);
    this.pattern = Pattern.fromString(props.path);
    const match = this.match(context.history.location.pathname);

    this.state = {
      match: match,
      status: STATUS_NONE,
      pathname: context.history.location.pathname,
      rendered: !!match,
      timestamp: Date.now(),
    };
  }

  componentWillMount() {
    if (!this.context.history) {
      console.error('Make sure your Route has Steersman component at a parent level');
    }
    const { history } = this.context;
    this.unlisten = history.listen((location, action) => {
      const match = this.match(location.pathname);
      if (JSON.stringify(this.state.match) !== JSON.stringify(match)) {
        this.setState({
          match,
          pathname: location.pathname,
          timestamp: Date.now(),
          rendered: this.state.rendered || !!match,
          status: [STATUS_ENTER, STATUS_EXIT][(!match) | 0],
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { onRouteUpdated } = this.context;
    const { path } = this.props;
    const { match, pathname, timestamp } = this.state;
    if (prevState.timestamp !== timestamp) {
      onRouteUpdated(path, match, pathname);
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onExited = () => {
    this.setState({
      rendered: false,
      timestamp: Date.now(),
    });
  };

  render() {
    const { render, transition: TransitionComponent } = this.props;
    const { match, timestamp, status, pathname, rendered } = this.state;
    if (!rendered) {
      return null;
    }
    return <TransitionComponent status={status} key={pathname} onExited={this.onExited}>{status => render(match, status)}</TransitionComponent>;
  }
}
