import React, { Component, Fragment } from 'react';
import {} from 'prop-types';
import withStyles from 'react-jss';
import Text from 'react-typographic';
import NavLink from '../components/NavLink';

const styles = ({ palette, screens }) => ({
  menu: {
    flex: 1,
    [screens.smUp]: {
      maxWidth: 300,
    },
    margin: 20,
  },
  list: {
    listStyle: 'none',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: palette.primaryLightColor,
  },
});

@withStyles(styles)
export default class Menu extends Component {

  render() {
    const { classes, menu } = this.props;

    return (
      <div className={classes.menu}>
        {Object.entries(menu).map(([caption, items], idx) => (
          <Fragment key={idx}>
            <Text type="title" transform="uppercase">{caption}</Text>
            <ul className={classes.list}>
              {Object.values(items).map((item, idx) => <NavLink key={idx} to={`/docs/${item}`} title={item} />)}
            </ul>
          </Fragment>
        ))}
      </div>
    );
  }
}
