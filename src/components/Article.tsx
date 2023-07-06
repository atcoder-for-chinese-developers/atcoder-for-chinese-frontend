import { createRef, useState } from "react";
import { Container, Divider, Grid, Header, Icon, Label, Ref, Segment, Sticky } from "semantic-ui-react";
import { formatDate } from "../js/formatDate";
import ProblemDisplayer from "./ProblemDisplayer";

import './Article.css';
import TableOfContent from "./TableOfContent";
import { useWindowSize } from "../js/useWindowSize";

interface ArticleProps {
  article: ArticleData,
  problem: Problem,
  stats: ProblemStat
};

function Article(props: ArticleProps) {
  const [tagsVisibility, setTagsVisibility] = useState<boolean>(false);

  const windowSize = useWindowSize();

  const contentRef = createRef<HTMLDivElement>();
  const containerRef = createRef<HTMLDivElement>();

  return (
    <>
      <Container>
        <Header as='h1'>
          { props.article.articleInfo.title }
        </Header>
        <Segment vertical>
          <div>
            <Label>
              <Icon name='user'/>
              { props.article.articleInfo.author }
            </Label>
            <Label>
              <Icon name='time'/>
              { formatDate(props.article.articleInfo.created) }
            </Label>
            <Label
              as='a'
              title={ formatDate(props.article.articleInfo.lastCommit.date) }
              href={ '//github.com/atcoder-for-chinese-developers/articles/commit/' + props.article.articleInfo.lastCommit.id }
              target='_blank'
              rel='noreferrer'
            >
              <Icon name='git square'/>
              { props.article.articleInfo.lastCommit.short }
            </Label>
            <Label
              as='a'
              href={ props.problem.link }
              target='_blank'
              rel='noreferrer'
            >
              <Icon name='at'/>
              <ProblemDisplayer problem={ props.problem } small stats={props.stats}/>
            </Label>
          </div>
          <Divider hidden className='InformationDivider'/>
          <div>
            <Label as='a' onClick={ () => { setTagsVisibility(!tagsVisibility); }}>
              <Icon name='tags'/>
              { tagsVisibility ? '隐藏' : '显示' }标签
              <Label.Detail>{ props.article.articleInfo.tags.length }</Label.Detail>
            </Label>
            {
              tagsVisibility ?
                props.article.articleInfo.tags.map((tag, key) => (
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
          <Ref innerRef={contentRef}><Container className='markdown-body' dangerouslySetInnerHTML={ { __html: props.article.rendered } }></Container></Ref>
        ) : (
          <Ref innerRef={containerRef}>
            <Container>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={13}>
                    <div className='markdown-body' ref={contentRef} dangerouslySetInnerHTML={ { __html: props.article.rendered } }></div>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Sticky context={containerRef} offset={74}><TableOfContent contentRef={ contentRef } title={ props.article.articleInfo.title }/></Sticky>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Ref>
        )
      }
    </>
  )
}

export default Article;