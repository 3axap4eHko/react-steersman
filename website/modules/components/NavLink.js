import React from 'react';
import classNames from 'classnames';
import createLink from 'react-steersman/createLink';
import withStyles from 'react-jss';
import Link from './Link';

const NavLink = createLink(({ classes, className, to, title, navigate, match }) => (
  <li className={classNames(classes.root, match && classes.activeRoot, className)}>
    <Link to={to} title={title} className={className} />
  </li>
));

const styles = ({ }) => ({
  root: {
    padding: 10,
  },
  activeRoot: {},
});

export default withStyles(styles)(NavLink);