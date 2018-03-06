import React, { Component } from 'react';
import {} from 'prop-types';
import Text from 'react-typographic';
import withStyles from 'react-jss';

const styles = ({ palette, shadows }) => ({
  '@global': {
    '.hljs': {
      margin: 10,
      borderRadius: 5,
      ...shadows.elevation8,
    },
    '.code-example': {
      '& h1': {
        whiteSpace: 'nowrap',
      },
      '& h2': {
        whiteSpace: 'nowrap',
        color: palette.secondaryLightColor,
      },
      '& h3': {
        whiteSpace: 'nowrap',
      },
      '& h4': {
        whiteSpace: 'nowrap',
      },
      '& p': {
        '& code, a': {
          fontSize: 14,
          padding: '0 4px',
          background: '#2b2b2b',
          color: '#cb7832',
        },
      },
    },
  },
});

@withStyles(styles)
export default class Contents extends Component {
  static contentCache = {};

  state = {
    content: '',
  };

  component = '';

  highlightCode = () => {
    Array.from(document.querySelectorAll('.code-example pre code')).forEach(node => hljs.highlightBlock(node));
    Array.from(document.querySelectorAll('.code-example h4')).forEach(node => hljs.highlightBlock(node));
    hljs.initHighlighting();
  };

  loadContent = async ({ component, menu }) => {
    this.component = component;
    const menuName = Object.keys(menu).find(name => menu[name].includes(component));
    if (!menuName) {
      return null;
    }
    if (!(component in Contents.contentCache)) {
      const content = await import(`../../../docs/${component}.md`);
      Contents.contentCache[component] = content.default;
    }
    if (this.component === component) {
      this.setState({ content: Contents.contentCache[component] });
    }
  };

  async componentWillMount() {
    await this.loadContent(this.props);
  }

  async componentWillUpdate(nextProps) {
    await this.loadContent(nextProps);
  }

  shouldComponentUpdate({ component }, { content }) {
    return this.props.component !== component || this.state.content !== content;
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  render() {
    const { className } = this.props;
    const { content } = this.state;

    return <Text className={className}>
      <div className="code-example" dangerouslySetInnerHTML={{ __html: content }} />
    </Text>;
  }
}
