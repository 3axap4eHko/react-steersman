import React from 'react';
import classNames from 'classnames';
import createLink from 'react-steersman/createLink';
import withStyles from 'react-jss';
import Text from 'react-typographic';

const Link = createLink(({ classes, className, to, title, navigate, match }) => (
  <Text
    type="link"
    href={to}
    className={classNames(classes.root, match && classes.activeRoot, className)}
    onClick={e => {
      e.preventDefault();
      navigate(to);
    }}
  >
    {title}
  </Text>
));

const styles = ({ palette }) => ({
  root: {
    color: palette.primaryTextColor,
    padding: 10,
  },
  activeRoot: {

  },
});

export default withStyles(styles)(Link);