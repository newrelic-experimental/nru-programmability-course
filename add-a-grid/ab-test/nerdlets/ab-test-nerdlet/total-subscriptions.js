import React from 'react';
import { PieChart } from 'nr1';

export default class TotalSubscriptions extends React.Component {
    render() {
        const subscriptionsA = {
            metadata: {
                id: 'subscriptions-A',
                name: 'Version A',
                viz: 'main',
                color: 'blue',
            },
            data: [
                { y: 259 },
            ],
        }
        const subscriptionsB = {
            metadata: {
                id: 'subscriptions-B',
                name: 'Version B',
                viz: 'main',
                color: 'green',
            },
            data: [
                { y: 318 },
            ],
        }
        return <PieChart data={[subscriptionsA, subscriptionsB]} fullWidth />
    }
}
