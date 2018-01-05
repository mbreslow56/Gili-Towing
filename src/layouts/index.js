import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Helmet from 'react-helmet';
import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n';
import { IntlProvider } from 'react-intl';
import 'intl';
import './index.css'
import styles from './index.module.css';
import Sidebar from 'react-sidebar';
import SideBarContent from '../components/SideBarContent';

class TemplateWrapper extends Component {
  // props are data, location, i18nMessages, children
  constructor(props) {
    super(props);
 
    this.state = {
      sidebarOpen: false
    }
 
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  sideBarMenuOpen = () => {
    this.setState( { sidebarOpen: true } );
}
  
  render() {

    const url = this.props.location.pathname;
    console.log('url', url);
    const { langs, defaultLangKey } = this.props.data.site.siteMetadata.languages;
    const langKey = getCurrentLangKey(langs, defaultLangKey, url);
    console.log('langKey', langKey);
    const homeLink = `/${langKey}/`;
    const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url));
  
    // const langAlign = langKey === 'he' ? 'right' : 'left';
    const langDirection = langKey === 'he' ? 'rtl' : 'ltr';
    const langTitle = langKey === 'he' ? 'גרר גילי' : 'Gili\'s Towing 24/7';
    
    return (
      <IntlProvider
        locale={langKey}
        messages={this.props.i18nMessages}
      >
        <div>
          <Helmet
            title="Gili's Towing 24/7"
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Sidebar sidebar={<SideBarContent langKey={langKey} />}
                   open={this.state.sidebarOpen}
                   sidebarClassName={styles.sideBar} 
                   contentClassName={styles.sideBarContent} 
                   onSetOpen={this.onSetSidebarOpen}
          >
            <Header langs={langsMenu} title={langTitle} langKey={langKey} sideBarTriggerClicked={this.sideBarMenuOpen}  />
            <div
              dir={langDirection}
              style={{
                margin: '0 auto',
                maxWidth: 960,
                // padding: '0px 1.0875rem 1.45rem',
              }}
            >
              {this.props.children()}
            </div>
          </Sidebar>
        </div>
      </IntlProvider>
    );
  }
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const pageQuery = graphql`
  query Layout {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }      
      }
    }
  }
`;
