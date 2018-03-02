# navigate

`navigate` is higher-order component that accepts path as string or number to navigate by path or back and forward.

## Arguments

#### path: string|number - path as a string or a number to navigate to path or back and forward

## Example
```javascript
import React, { Component } from 'react';
import navigate from 'react-steersman/navigate';
import Breadcrumbs from './Breadcrumbs';
import Button from './Button';
import Loading from './Loading';

export default class NavMenu extends Component {
  state = {
    breadcrumbs: '/',
    content: Loading,
  };
  
  async componentWillMount() {
    const content = await import('./HomeComponent');
    this.setState({ content });
  }
  
  @navigate('/')
  async toHome() {
    const content = await import('./HomeComponent');
    this.setState({ breadcrumbs: ['home'], content });
  };
  
  @navigate('/about')
  async toAbout() {
    const content = await import('./AboutComponent');
    this.setState({ breadcrumbs: ['home', 'about'], content });
  };
  
  render() {
    const { breadcrumbs, content:Content } = this.props;
    
    return (
      <Fragment>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Button onClick={this.toHome}>Home</Button>
        <Button onClick={this.toAbout}>About</Button>
        <Content/>
      </Fragment>
    );
  }
}
```
