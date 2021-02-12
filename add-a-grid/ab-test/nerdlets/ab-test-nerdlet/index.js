import React from 'react';
import { ChartGroup, LineChart, PieChart, TableChart } from 'nr1';

class NewsletterSignups extends React.Component {
    render() {
        const versionASignups = {
            metadata: {
                id: 'version-a-newsletter-signups',
                name: 'Version A',
                viz: 'main',
                color: 'blue',
            },
            data: [
                { x: 0, y: 0 },
                { x: 10, y: 10 },
                { x: 20, y: 15 },
                { x: 30, y: 5 },
                { x: 40, y: 30 },
                { x: 50, y: 25 },
            ],
        }
        const versionBSignups = {
            metadata: {
                id: 'version-b-newsletter-signups',
                name: 'Version B',
                viz: 'main',
                color: 'green',
            },
            data: [
                { x: 0, y: 20 },
                { x: 10, y: 5 },
                { x: 20, y: 25 },
                { x: 30, y: 45 },
                { x: 40, y: 50 },
                { x: 50, y: 35 },
            ],
        }
        return <LineChart data={[versionASignups, versionBSignups]} fullWidth />
    }
}

class TestDistributions extends React.Component {
    render() {
        const distributionA = {
            metadata: {
                id: 'distributions-A',
                name: 'Version A',
                viz: 'main',
                color: 'blue',
            },
            data: [
                { y: 259 },
            ],
        }
        const distributionB = {
            metadata: {
                id: 'distributions-B',
                name: 'Version B',
                viz: 'main',
                color: 'green',
            },
            data: [
                { y: 318 },
            ],
        }
        return <PieChart data={[distributionA, distributionB]} fullWidth />
    }
}

class SuccessfulRequests extends React.Component {
    render() {
        const successesA = {
            metadata: {
                id: 'successes-A',
                name: 'Version A',
                viz: 'main',
                color: 'blue',
            },
            data: [
                { y: 118 },
            ],
        }
        const successesB = {
            metadata: {
                id: 'successes-B',
                name: 'Version B',
                viz: 'main',
                color: 'green',
            },
            data: [
                { y: 400 },
            ],
        }
        return <PieChart data={[successesA, successesB]} fullWidth />
    }
}

class VersionATotals extends React.Component {
    render() {
        const versionATotals = {
            metadata: {
                id: 'totals-A',
                name: 'Version A',
                columns: ['name', 'count'],
            },
            data: [
                {
                    name: 'Successful Requests',
                    count: 85
                },
                {
                    name: 'Failed Requests',
                    count: 2
                },
            ],
        }
        return <TableChart data={[versionATotals]} fullWidth />
    }
}

class VersionBTotals extends React.Component {
    render() {
        const versionBTotals = {
            metadata: {
                id: 'totals-B',
                name: 'Version B',
                columns: ['name', 'count'],
            },
            data: [
                {
                    name: 'Successful Requests',
                    count: 180
                },
                {
                    name: 'Failed Requests',
                    count: 30
                },
            ],
        }
        return <TableChart data={[versionBTotals]} fullWidth />
    }
}

class VersionAResponseTimes extends React.Component {
    render() {
        const versionAResponseTimes = {
            metadata: {
                id: 'response-times-A',
                name: 'Version A',
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
        return <LineChart data={[versionAResponseTimes]} fullWidth />
    }
}

class VersionBResponseTimes extends React.Component {
    render() {
        const versionBResponseTimes = {
            metadata: {
                id: 'response-times-B',
                name: 'Version B',
                viz: 'main',
                color: 'green',
                units_data: {
                    y: 'MS'
                }
            },
            data: [
                { x: 0, y: 15 },
                { x: 10, y: 13 },
                { x: 20, y: 10 },
                { x: 30, y: 14 },
                { x: 40, y: 16.5 },
                { x: 50, y: 13.5 },
            ],
        }
        return <LineChart data={[versionBResponseTimes]} fullWidth />
    }
}

export default class AbTestNerdletNerdlet extends React.Component {
    render() {
        return <React.Fragment>
            <NewsletterSignups />
            <TestDistributions />
            <SuccessfulRequests />
            <VersionATotals />
            <VersionBTotals />
            <ChartGroup>
                <VersionAResponseTimes />
                <VersionBResponseTimes />
            </ChartGroup>
        </React.Fragment>;
    }
}
