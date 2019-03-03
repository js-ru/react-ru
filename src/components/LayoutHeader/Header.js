/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import Container from 'components/Container';
import HeaderLink from './HeaderLink';
import {Link} from 'gatsby';
import React from 'react';
import {colors, fonts, media} from 'theme';
import {version} from 'site-constants';
import ExternalLinkSvg from 'templates/components/ExternalLinkSvg';
import DocSearch from './DocSearch';

import logoSvg from 'icons/logo.svg';

const Header = ({location}: {location: Location}) => (
  <header
    css={{
      backgroundColor: colors.darker,
      color: colors.white,
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      top: '36px',
      left: 0,
    }}>
    <Container>
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
        }}>
        🎉 Читай{' '}
        <span css={{color: colors.brand, fontWeight: 600}}>официальный</span>{' '}
        перевод документации! ➡️{' '}
        <a href={`https://ru.reactjs.org${location.pathname}`} css={{textDecoration: 'underline'}}>
          ru.reactjs.org
        </a>{' '}
        🎉 (⭐ ...и не забудь поставить «звёздочку»{' '}
        <a
          href="https://github.com/reactjs/ru.reactjs.org"
          target="_blank"
          css={{textDecoration: 'underline'}}>
          репозиторию
        </a>
        ! ⭐)
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          [media.between('small', 'large')]: {
            height: 50,
          },
          [media.lessThan('small')]: {
            height: 40,
          },
        }}>
        <Link
          css={{
            display: 'flex',
            marginRight: 10,
            height: '100%',
            alignItems: 'center',
            color: colors.brand,
            ':focus': {
              outline: 0,
              color: colors.white,
            },
            [media.greaterThan('small')]: {
              width: 'calc(100% / 6)',
            },
            [media.lessThan('small')]: {
              flex: '0 0 auto',
            },
          }}
          to="/">
          <img src={logoSvg} alt="" height="20" />
          <span
            css={{
              color: 'inherit',
              marginLeft: 10,
              fontWeight: 700,
              fontSize: 20,
              lineHeight: '20px',
              [media.lessThan('large')]: {
                fontSize: 16,
                marginTop: 1,
              },
              [media.lessThan('small')]: {
                // Visually hidden
                position: 'absolute',
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                height: 1,
                width: 1,
                margin: -1,
                padding: 0,
                border: 0,
              },
            }}>
            React
          </span>
        </Link>

        <nav
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            overflowX: 'auto',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            height: '100%',
            width: '60%',
            [media.size('xsmall')]: {
              flexGrow: '1',
              width: 'auto',
            },
            [media.greaterThan('xlarge')]: {
              width: null,
            },
            [media.lessThan('small')]: {
              maskImage:
                'linear-gradient(to right, transparent, black 20px, black 90%, transparent)',
            },
          }}>
          <HeaderLink
            isActive={location.pathname.includes('/docs/')}
            title="Документация"
            to="/docs/getting-started.html"
          />
          <HeaderLink
            isActive={location.pathname.includes('/tutorial/')}
            title="Учебник"
            to="/tutorial/tutorial.html"
          />
          <HeaderLink
            isActive={location.pathname.includes('/community/')}
            title="Сообщество"
            to="/community/support.html"
          />
          <HeaderLink
            isActive={location.pathname.includes('/blog')}
            title="Блог (EN)"
            to="/blog/"
          />
        </nav>

        <DocSearch />

        <div
          css={{
            [media.lessThan('medium')]: {
              display: 'none',
            },
            [media.greaterThan('large')]: {
              width: 'calc(100% / 6)',
            },
          }}>
          <Link
            css={{
              padding: '5px 10px',
              whiteSpace: 'nowrap',
              ...fonts.small,
              ':hover': {
                color: colors.brand,
              },
              ':focus': {
                outline: 0,
                backgroundColor: colors.lighter,
                borderRadius: 15,
              },
            }}
            to="/versions">
            v{version}
          </Link>
          <a
            css={{
              padding: '5px 10px',
              marginLeft: 10,
              whiteSpace: 'nowrap',
              ...fonts.small,
              ':hover': {
                color: colors.brand,
              },
              ':focus': {
                outline: 0,
                backgroundColor: colors.lighter,
                borderRadius: 15,
              },
            }}
            href="https://github.com/facebook/react/"
            target="_blank"
            rel="noopener">
            GitHub
            <ExternalLinkSvg
              cssProps={{
                marginLeft: 5,
                verticalAlign: -2,
                color: colors.subtle,
              }}
            />
          </a>
        </div>
      </div>
    </Container>
  </header>
);
export default Header;
