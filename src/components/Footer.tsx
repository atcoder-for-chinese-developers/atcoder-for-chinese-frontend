import { Container, Icon, Segment } from "semantic-ui-react";

import './Footer.css';

interface FooterProps {
  lastCommit: CommitInfo,
  siteInfos: SiteInfoSet
};

function Footer(props: FooterProps) {
  let links = [] as {link: string, icon: string, key: string, title: string}[];
  for (const id in props.siteInfos) {
    const site = props.siteInfos[id];
    links.push({link: site.link, icon: site.icon, title: site.title, key: id});
  }
  return (
    <>
      <Segment vertical className='footer'>
        <Container textAlign='center'>
          <div>
            <span className='version-text markdown-body'>
              最后更新: 
              <code title={ props.lastCommit.date }>
                <a href={ '//github.com/atcoder-for-chinese-developers/articles/commit/' + props.lastCommit.id }>
                  { props.lastCommit.short }
                </a>
              </code>
            </span>
          </div>
          <div className='icon-links'>
            <a href='https://github.com/atcoder-for-chinese-developers/'><Icon name='github'/></a>
            {
              links.map((link) => <a href={link.link} key={link.key} title={link.title}>
                <i className="icon" style={{backgroundImage: `url(${link.icon})`, backgroundSize: 'cover'}}/>
              </a>)
            }
          </div>
        </Container>
      </Segment>
    </>
  )
}

export default Footer;
