import { Container, Icon, Segment } from "semantic-ui-react";

import './Footer.css';

interface FooterProps {
  data: GlobalData
};

function Footer(props: FooterProps) {
  return (
    <>
      <Segment vertical className='Footer'>
        <Container textAlign='center'>
          <div>
            {
              props.data.ready ?
              (<>
              <span className='VersionText markdown-body'>
                翻译: 
                <code title={ props.data.translations.lastCommit.date }>
                  <a href={ '//github.com/atcoder-for-chinese-developers/translations/commit/' + props.data.translations.lastCommit.id }>
                    { props.data.translations.lastCommit.short }
                  </a>
                </code>
              </span>
              <span className='VersionText markdown-body'>
                题解: 
                <code title={ props.data.solutions.lastCommit.date }>
                  <a href={ '//github.com/atcoder-for-chinese-developers/solutions/commit/' + props.data.solutions.lastCommit.id }>
                    { props.data.solutions.lastCommit.short }
                  </a>
                </code>
              </span>
              </>)
              : null
            }
          </div>
          <div className='IconLinks'>
            <a href='//github.com/atcoder-for-chinese-developers/'><Icon name='github'/></a>
          </div>
        </Container>
      </Segment>
    </>
  )
}

export default Footer;
