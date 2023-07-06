import { Link, useRouteLoaderData } from "react-router-dom";
import Nav from "../components/Nav";
import { Container, Header, Image, List } from "semantic-ui-react";
import "./Home.css"
import { formatDate } from "../js/formatDate";

export default function Home() {
    const {siteInfos} = useRouteLoaderData('home') as {siteInfos: SiteInfoSet};
    let siteList = [] as {key: string, icon: string, title: string, lastCommit: CommitInfo}[];
    for (const id in siteInfos) {
        const site = siteInfos[id];
        siteList.push({key: id, icon: site.icon, title: site.title, lastCommit: site.lastCommit});
    }
    return (
        <>
            <Nav navItems={[]} />
            <Container className="home-container">
                <Header as={'h1'}>OJ 列表</Header>
                <List divided relaxed>
                    {
                        siteList.map((site) =>
                            <List.Item key={site.key}>
                                <Image avatar src={site.icon}/>
                                <List.Content>
                                    <List.Header as={Link} to={`/${site.key}`}>{site.title}</List.Header>
                                    <List.Description>
                                        最后更新于 {formatDate(site.lastCommit.date)} <a href={`//github.com/atcoder-for-chinese-developers/articles/commit/${site.lastCommit.id}`}><code>{site.lastCommit.short}</code></a>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )
                    }
                </List>
            </Container>
        </>
    );
}