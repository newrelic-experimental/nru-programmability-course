import React from 'react';
import {
    HeadingText,
    PieChart,
} from 'nr1';

export default class TotalCancellations extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            cancellations: [],
            lastToken: null
        }
    }

    generateChartData(data) {
        const cancellationsA = data ? data.a : 0;
        const cancellationsB = data ? data.b : 0;

        return [
            {
                metadata: {
                    id: 'cancellations-A',
                    name: 'Version A',
                    viz: 'main',
                    color: 'blue',
                },
                data: [
                    { y: cancellationsA },
                ],
            },
            {
                metadata: {
                    id: 'cancellations-B',
                    name: 'Version B',
                    viz: 'main',
                    color: 'green',
                },
                data: [
                    { y: cancellationsB },
                ],
            },
        ]
    }

    componentDidUpdate() {
        if (this.props.token && this.props.token != this.state.lastToken) {
            console.log(`Requesting data with api token ${this.props.token}`)

            fetch(
                "https://api.nerdsletter.net/cancellations",
                {headers: {"Authorization": `Bearer ${this.props.token}`}}
            ).then(
                (response) => {
                    if (response.status == 200) {
                        return response.json()
                    } else if (response.status == 401) {
                        console.error("Incorrect auth header")
                    } else {
                        console.error(response.text())
                    }
                }
            ).then(
                (data) => {
                    if (data) {
                        this.setState({
                            cancellations: this.generateChartData(data),
                            lastToken: this.props.token
                        })
                    }
                }
            )
        }
    }
    render() {
        return <div>
            <HeadingText className="chartHeader">
                Total cancellations per version
            </HeadingText>
            <PieChart data={this.state.cancellations} fullWidth />
        </div>
    }
}
