import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={movie.ImagePath}
                                crossOrigin="anonymous"
                            >
                            </Card.Img>
                            <Card.Body
                                label="Description: "
                                src={movie.Description}>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                            </Card.Body>
                            <Button
                                variant="link"
                                onClick={() => { onBackClick(null); }}>
                                Back
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}