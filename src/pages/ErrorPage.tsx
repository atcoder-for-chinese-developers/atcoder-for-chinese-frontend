import { useRouteError } from "react-router-dom";
import Nav from "../components/Nav";
import { Container, Icon, Message } from "semantic-ui-react";

import "./ErrorPage.css";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <>
            <Nav navItems={[]} />
            <Container className="error-container">
                <Message icon negative>
                    <Icon name="remove" />
                    <Message.Content>
                        <Message.Header>错误</Message.Header>
                        { error.message || error.statusText }
                    </Message.Content>
                </Message>
            </Container>
        </>
    )
}