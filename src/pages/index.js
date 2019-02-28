/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

import ButtonLink from 'components/ButtonLink';
import Container from 'components/Container';
import Flex from 'components/Flex';
import CodeExample from 'components/CodeExample';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {graphql, Link} from 'gatsby';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import {colors, media, sharedStyles} from 'theme';
import loadScript from 'utils/loadScript';
import createOgUrl from 'utils/createOgUrl';
import {babelURL} from 'site-constants';
import logoWhiteSvg from 'icons/logo-white.svg';

class Home extends Component {
  state = {
    babelLoaded: false,
  };

  componentDidMount() {
    loadScript(babelURL).then(
      () => {
        this.setState({
          babelLoaded: true,
        });
      },
      error => {
        console.error('Babel failed to load.');
      },
    );
  }

  render() {
    const {babelLoaded} = this.state;
    const {data, location} = this.props;
    const {codeExamples, examples, marketing} = data;

    const code = codeExamples.edges.reduce((lookup, {node}) => {
      lookup[node.mdAbsolutePath] = node;
      return lookup;
    }, {});

    return (
      <Layout location={location}>
        <TitleAndMetaTags
          title="React &ndash; JavaScript-библиотека для создания пользовательских интерфейсов"
          ogUrl={createOgUrl('index.html')}
        />
        <div css={{width: '100%'}}>
                        <div
        css={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          padding: '6px 0',
          height: '36px',
          textAlign: 'center',
          background: '#761a85',
          color: colors.white,
          zIndex: 6,
          lineHeight: '1.4',
        }}
      >
      🎉 Читай <span css={{color: colors.brand, fontWeight: 600}}>официальный</span> перевод документации! ➡️ <a href="https://ru.reactjs.org/" css={{textDecoration: 'underline'}}>ru.reactjs.org</a> 🎉
      (⭐ ...и не забудь поставить «звёздочку» <a href="https://github.com/reactjs/ru.reactjs.org" target="_blank" css={{textDecoration: 'underline'}}>репозиторию</a>! ⭐)
      </div>
      
          <header
            css={{
              backgroundColor: colors.dark,
              color: colors.white,
            }}>
            <div
              css={{
                paddingTop: 45,
                paddingBottom: 20,

                [media.greaterThan('small')]: {
                  paddingTop: 60,
                  paddingBottom: 70,
                },

                [media.greaterThan('xlarge')]: {
                  paddingTop: 95,
                  paddingBottom: 85,
                  maxWidth: 1500, // Positioning of background logo
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  position: 'relative',
                  '::before': {
                    content: ' ',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundImage: `url(${logoWhiteSvg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '100% 100px',
                    backgroundSize: '50% auto',
                    opacity: 0.05,
                  },
                },
              }}>
              <div
                css={{
                  // Content should be above absolutely-positioned hero image
                  position: 'relative',
                }}>
                <Container>
                  <h1
                    css={{
                      color: colors.brand,
                      textAlign: 'center',
                      margin: 0,
                      fontSize: 45,
                      letterSpacing: '0.01em',
                      [media.size('xsmall')]: {
                        fontSize: 30,
                      },
                      [media.greaterThan('xlarge')]: {
                        fontSize: 60,
                      },
                    }}>
                    React
                  </h1>
                  <p
                    css={{
                      paddingTop: 15,
                      textAlign: 'center',
                      fontSize: 24,
                      letterSpacing: '0.01em',
                      fontWeight: 200,

                      [media.size('xsmall')]: {
                        fontSize: 16,
                        maxWidth: '12em',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      },

                      [media.greaterThan('xlarge')]: {
                        paddingTop: 20,
                        fontSize: 30,
                      },
                    }}>
                    JavaScript-библиотека для создания пользовательских
                    интерфейсов
                  </p>
                  <Flex
                    valign="center"
                    css={{
                      paddingTop: 40,

                      [media.greaterThan('xlarge')]: {
                        paddingTop: 65,
                      },
                    }}>
                    <CtaItem>
                      <ButtonLink
                        to="/docs/getting-started.html"
                        type="primary">
                        Начать работу
                      </ButtonLink>
                    </CtaItem>
                    <CtaItem>
                      <ButtonLink to="/tutorial/tutorial.html" type="secondary">
                        Перейти к введению
                      </ButtonLink>
                    </CtaItem>
                  </Flex>
                </Container>
              </div>
            </div>
          </header>

          <Container>
            <div css={sharedStyles.markdown}>
              <section
                css={[
                  sectionStyles,
                  {
                    [media.lessThan('medium')]: {
                      marginTop: 0,
                      marginBottom: 0,
                      overflowX: 'auto',
                      paddingTop: 30,
                      WebkitOverflowScrolling: 'touch',
                      position: 'relative',
                      maskImage:
                        'linear-gradient(to right, transparent, white 10px, white 90%, transparent)',
                    },
                  },
                ]}>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'row',

                    [media.lessThan('medium')]: {
                      display: 'block',
                      whiteSpace: 'nowrap',
                    },
                  }}>
                  {marketing.edges.map(({node: column}, index) => (
                    <div
                      key={index}
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '0 1 33%',
                        marginLeft: 40,

                        '&:first-of-type': {
                          marginLeft: 0,

                          [media.lessThan('medium')]: {
                            marginLeft: 10,
                          },
                        },

                        [media.lessThan('medium')]: {
                          display: 'inline-block',
                          verticalAlign: 'top',
                          marginLeft: 0,
                          whiteSpace: 'normal',
                          width: '75%',
                          marginRight: 20,
                          paddingBottom: 40,

                          '&:first-of-type': {
                            marginTop: 0,
                          },
                        },
                      }}>
                      <h3
                        css={[
                          headingStyles,
                          {
                            '&&': {
                              // Make specificity higher than the site-wide h3 styles.
                              color: colors.subtle,
                              paddingTop: 0,
                              fontWeight: 300,
                              fontSize: 20,

                              [media.greaterThan('xlarge')]: {
                                fontSize: 24,
                              },
                            },
                          },
                        ]}>
                        {column.frontmatter.title}
                      </h3>
                      <div dangerouslySetInnerHTML={{__html: column.html}} />
                    </div>
                  ))}
                </div>
              </section>
              <hr
                css={{
                  height: 1,
                  marginBottom: -1,
                  border: 'none',
                  borderBottom: `1 solid ${colors.divider}`,
                }}
              />
              <section css={sectionStyles}>
                <div id="examples">
                  {examples.edges.map(({node}, index) => {
                    const snippet = code[node.fileAbsolutePath];
                    return (
                      <CodeExample
                        key={index}
                        id={snippet.id}
                        code={snippet.code}
                        containerNodeID={node.frontmatter.domid}
                        loaded={babelLoaded}>
                        <h3 css={headingStyles}>{node.frontmatter.title}</h3>
                        <div dangerouslySetInnerHTML={{__html: node.html}} />
                      </CodeExample>
                    );
                  })}
                </div>
              </section>
            </div>
          </Container>

          <section
            css={{
              background: colors.dark,
              color: colors.white,
              paddingTop: 45,
              paddingBottom: 45,
            }}>
            <Container>
              <Flex valign="center">
                <CtaItem>
                  <ButtonLink to="/docs/getting-started.html" type="primary">
                    Начать работу
                  </ButtonLink>
                </CtaItem>
                <CtaItem>
                  <ButtonLink to="/tutorial/tutorial.html" type="secondary">
                    Перейти к учебнику
                  </ButtonLink>
                </CtaItem>
              </Flex>
            </Container>
          </section>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  data: PropTypes.shape({
    examples: PropTypes.object.isRequired,
    marketing: PropTypes.object.isRequired,
  }).isRequired,
};

const CtaItem = ({children, primary = false}) => (
  <div
    css={{
      width: '50%',

      [media.between('small', 'large')]: {
        paddingLeft: 20,
      },

      [media.greaterThan('xlarge')]: {
        paddingLeft: 40,
      },

      '&:first-child': {
        textAlign: 'right',
        paddingRight: 15,
      },

      '&:nth-child(2)': {
        [media.greaterThan('small')]: {
          paddingLeft: 15,
        },
      },
    }}>
    {children}
  </div>
);

export const pageQuery = graphql`
  query IndexMarkdown {
    codeExamples: allExampleCode {
      edges {
        node {
          id
          code
          mdAbsolutePath
        }
      }
    }

    examples: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//home/examples//"}}
      sort: {fields: [frontmatter___order], order: ASC}
    ) {
      edges {
        node {
          fileAbsolutePath
          fields {
            slug
          }
          frontmatter {
            title
            domid
          }
          html
        }
      }
    }
    marketing: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//home/marketing//"}}
      sort: {fields: [frontmatter___order], order: ASC}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

export default Home;

const sectionStyles = {
  marginTop: 20,
  marginBottom: 15,

  [media.greaterThan('medium')]: {
    marginTop: 60,
    marginBottom: 65,
  },
};

const headingStyles = {
  '&&': {
    marginBottom: 20,
  },
};