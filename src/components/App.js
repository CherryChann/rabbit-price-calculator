import React, { Component} from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <Container>
                <Jumbotron style={{textAlign: 'center'}}>
                    <h1>Welcome from Rabbit Finance Task</h1>
                </Jumbotron>
            </Container>
        )
    }
}

export default App;