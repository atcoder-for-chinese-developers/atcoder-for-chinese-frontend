import { Container, Icon, Segment } from "semantic-ui-react";

import './Footer.css';

interface FooterProps {
  lastCommit: CommitInfo
};

function Footer(props: FooterProps) {
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
            <a href='//github.com/atcoder-for-chinese-developers/'><Icon name='github'/></a>
          </div>
        </Container>
      </Segment>
    </>
  )
}

export default Footer;
