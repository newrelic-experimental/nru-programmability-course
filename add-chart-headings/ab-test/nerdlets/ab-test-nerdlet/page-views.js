import React from 'react';
import { LineChart } from 'nr1';

export default class VersionPageViews extends React.Component {
    render() {
        const versionPageViews = {
            metadata: {
                id: `page-views-${this.props.version}`,
                name: `Version ${this.props.version.toUpperCase()}`,
                viz: 'main',
                color: 'blue',
                units_data: {
                    y: 'MS'
                }
            },
            data: [
                { x: 0, y: 10 },
                { x: 10, y: 13 },
                { x: 20, y: 11.5 },
                { x: 30, y: 10 },
                { x: 40, y: 8.75 },
                { x: 50, y: 9 },
            ],
        }
        return <LineChart data={[versionPageViews]} fullWidth />
    }
}
