import React from 'react';
import {
    Button,
    Modal,
    TextField,
} from 'nr1';

class ApiTokenButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Button onClick={this.props.showPrompt}>Update API token</Button>
        )
    }
}

class ApiTokenPrompt extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            token: null,
            tokenError: false,
        };

        this.submitToken = this.submitToken.bind(this);
        this.hideTokenError = this.hideTokenError.bind(this);
        this.changeToken = this.changeToken.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    showTokenError() {
        this.setState({ tokenError: true });
    }

    hideTokenError() {
        this.setState({ tokenError: false });
    }

    changeToken(event) {
        this.setState({ token: event.target.value });
    }

    submitToken(event) {
        event.preventDefault();

        if (this.state.token) {
            this.props.storeToken(this.state.token)
            this.hideTokenError()
            this.props.hidePrompt()
        } else {
            this.showTokenError()
        }
    }

    keyPress(event) {
        if(event.keyCode == 13) {
            event.preventDefault();

            this.submitToken(event);
        }
    }

    render() {
        return <Modal hidden={this.props.hideTokenPrompt} onClose={this.props.hidePrompt}>
            To see cancellation data, you need to enter an API token for your backend service:
            <form>
                <TextField label="API token" onChange={this.changeToken} onKeyDown={this.keyPress} invalid={this.state.tokenError ? "Token required" : false} />
                <Button type={Button.TYPE.PRIMARY} onClick={this.submitToken}>Submit</Button>
            </form>
        </Modal>
    }
}

export { ApiTokenButton, ApiTokenPrompt }
