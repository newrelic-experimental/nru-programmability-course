import React from 'react';
import { TableChart } from 'nr1';

export default class PastTests extends React.Component {
    render() {
        const historicalData = {
            metadata: {
                id: 'past-tests',
                name: 'Past tests',
                columns: ['endDate', 'versionADescription', 'versionBDescription', 'winner'],
            },
            data: [
                {
                    "endDate": "12-15-2020",
                    "versionADescription": "The homepage's CTA button was green.",
                    "versionBDescription": "The homepage's CTA button was blue.",
                    "winner": "A"
                },
                {
                    "endDate": "09-06-2019",
                    "versionADescription": "The 'Deals' page showed sales in a carousel.",
                    "versionBDescription": "The 'Deals' page showed sales in a grid.",
                    "winner": "B"
                }
            ],
        }

        return <TableChart data={[historicalData]} fullWidth />
    }
}
