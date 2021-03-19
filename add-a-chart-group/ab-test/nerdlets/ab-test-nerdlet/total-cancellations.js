import React from 'react';
import { PieChart } from 'nr1';

export default class TotalCancellations extends React.Component {
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
        return <PieChart data={[cancellationsA, cancellationsB]} fullWidth />
    }
}
