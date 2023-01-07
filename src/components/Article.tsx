import { useState } from "react";
import { Container, Divider, Header, Loader } from "semantic-ui-react";

interface ArticleProps {
  path: string,
  article: Article,
  problem: Problem
};

type ArticleContent = {
    content: string,
    ready: boolean
}

function Article(props: ArticleProps) {
  const [content, setContent] = useState<ArticleContent>({ content: '', ready: false });

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
        </Container>
        <Divider></Divider>
        <Container className='markdown-body' dangerouslySetInnerHTML={ { __html: content.content } }></Container>
      </>
    )
  } else return (
    <Container>
      <Loader active inline='centered' size='big' className='Loader'>正在加载</Loader>
    </Container>
  )
}

export default Article;