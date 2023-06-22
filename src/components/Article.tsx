import { createRef, useState } from "react";
import { Container, Divider, Grid, Header, Icon, Label, Loader, Ref, Segment, Sticky } from "semantic-ui-react";
import { formatDate } from "../js/formatDate";
import ProblemDisplayer from "./ProblemDisplayer";

import './Article.css';
import TableOfContent from "./TableOfContent";
import { useWindowSize } from "../js/useWindowSize";

interface ArticleProps {
  path: string,
  article: Article,
  problem: Problem,
  type: string
};

type ArticleContent = {
    content: string,
    ready: boolean
}

function Article(props: ArticleProps) {
  const [content, setContent] = useState<ArticleContent>({ content: '', ready: false });
  const [tagsVisibility, setTagsVisibility] = useState<boolean>(false);

  const windowSize = useWindowSize();

  const contentRef = createRef<HTMLDivElement>();
  const containerRef = createRef<HTMLDivElement>();

  async function loadContent() {
    let res = await fetch(props.path);
    let content = await res.text();
    return {
        content: content,
        ready: true
    }
  }

  if (!content.ready) {
    loadContent()
      .then(content => setContent(content))
      .catch(e => console.log(e));
  }

  if (content.ready) {
    return (
      <>
        <Container>
          <Header as='h1'>
            { props.article.title }
          </Header>
          <Segment vertical>
            <div>
              <Label>
                <Icon name='user'/>
                { props.article.author }
              </Label>
              <Label>
                <Icon name='time'/>
                { formatDate(props.article.created) }
              </Label>
              <Label
                as='a'
                title={ formatDate(props.article.lastCommit.date) }
                href={ '//github.com/atcoder-for-chinese-developers/' + props.type + '/commit/' + props.article.lastCommit.id }
                target='_blank'
                rel='noreferrer'
              >
                <Icon name='git square'/>
                { props.article.lastCommit.short }
              </Label>
              <Label
                as='a'
                href={ '//atcoder.jp/contests/' + props.problem.contest_id + '/tasks/' + props.problem.id }
                target='_blank'
                rel='noreferrer'
              >
                <Icon name='at'/>
                <ProblemDisplayer problem={ props.problem } small/>
              </Label>
            </div>
            <Divider hidden className='InformationDivider'/>
            <div>
              <Label as='a' onClick={ () => { setTagsVisibility(!tagsVisibility); }}>
                <Icon name='tags'/>
                { tagsVisibility ? '隐藏' : '显示' }标签
                <Label.Detail>{ props.article.tags.length }</Label.Detail>
              </Label>
              {
                tagsVisibility ?
                  props.article.tags.map((tag, key) => (
                    <Label key={ key }>
                      { tag }
                    </Label>
                  ))
                : null
              }
            </div>
          </Segment>
        </Container>
        <Divider></Divider>
        {
          windowSize.width <= 991 ? (
            <Ref innerRef={contentRef}><Container className='markdown-body' dangerouslySetInnerHTML={ { __html: content.content } }></Container></Ref>
          ) : (
            <Ref innerRef={containerRef}>
              <Container>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <div className='markdown-body' ref={contentRef} dangerouslySetInnerHTML={ { __html: content.content } }></div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Sticky context={containerRef} offset={74}><TableOfContent contentRef={ contentRef } title={ props.article.title }/></Sticky>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Ref>
          )
        }
      </>
    )
  } else return (
    <Container>
      <Loader active inline='centered' size='big' className='Loader'>正在加载</Loader>
    </Container>
  )
}

export default Article;