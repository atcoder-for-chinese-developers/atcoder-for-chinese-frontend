import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

type HeaderElement = {
    level: number,
    id: string,
    title: string
};

interface TableOfContentProps {
  contentRef: React.RefObject<HTMLDivElement>,
  title: string
}
function TableOfContent(props: TableOfContentProps) {
  const [toclist, setToclist] = useState<Array<HeaderElement>>([]);

  useEffect(() => {
    const contentRef = props.contentRef;
    const contentDOM = contentRef.current;
    if (!contentDOM) {
      setToclist([]);
      return ;
    }
    const headerDOMSet = contentDOM.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let list = [] as Array<HeaderElement>;
    headerDOMSet.forEach((headerDOM) => {
        let level = parseInt(headerDOM.tagName[1]);
        let id = headerDOM.id;
        if (id) {
            list.push({ level: level, id: id, title: decodeURIComponent(id) });
        }
    })
    setToclist(list);
  }, [props.contentRef, props.title]);

  return (
    <>
      <Menu text vertical>
        <Menu.Item as='a' onClick={ scroll.scrollToTop }>{ props.title }</Menu.Item>
        {
          toclist.map((header) => (
            <Menu.Item as={ScrollLink} key={ header.id } to={header.id} smooth offset={-74} className={ 'item-h' + header.level }>{ header.title }</Menu.Item>
          ))
        }
      </Menu>
    </>
  );
}

export default TableOfContent;
