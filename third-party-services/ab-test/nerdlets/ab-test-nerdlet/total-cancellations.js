import React from 'react';
import { HeadingText, PieChart } from 'nr1';

export default class TotalCancellations extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            lastToken: null
        }
    }

    componentDidUpdate() {
        if (this.props.token && this.props.token != this.state.lastToken) {
            console.log(`requesting data with api token ${this.props.token}`)
            this.setState({lastToken: this.props.token})
        }
    }

    render() {
        const cancellationsA = {
            metadata: {
                id: 'cancellations-A',
                name: 'Version A',
                viz: 'main',
                color: 'blue',
            },
            data: [
                { y: 118 },
            ],
        }
        const cancellationsB = {
            metadata: {
                id: 'cancellations-B',
                name: 'Version B',
                viz: 'main',
                color: 'green',
            },
            data: [
                { y: 400 },
            ],
        }
        return <div>
            <HeadingText className="chartHeader">
                Total cancellations per version
            </HeadingText>
            <PieChart data={[cancellationsA, cancellationsB]} fullWidth />
        </div>
    }
}
