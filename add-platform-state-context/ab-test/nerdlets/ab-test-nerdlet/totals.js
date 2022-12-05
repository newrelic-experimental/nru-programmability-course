import React from 'react';
import {
    HeadingText,
    NrqlQuery,
    TableChart,
} from 'nr1';

export default class VersionTotals extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            tableData: {
                metadata: {
                    id: `totals-${this.props.version}`,
                    name: `Version ${this.props.version}`,
                    columns: ['name', 'count'],
                },
                data: [
                    {
                        name: 'Subscriptions',
                        count: 0
                    },
                    {
                        name: 'Page views',
                        count: 0
                    },
                ],
            }
        }
    }

    componentDidMount() {
        NrqlQuery.query({
            accountIds: this.props.accountIds,
            query: `SELECT count(*) FROM subscription WHERE page_version = '${this.props.version}' SINCE 7 DAYS AGO`,
            formatType: NrqlQuery.FORMAT_TYPE.RAW
        }).then(({ data }) => {
            if (data.raw) {
                let tableData = {...this.state.tableData}
                tableData.data[0].count = data.raw.results[0].count
                this.setState({tableData})
            }
        })

        NrqlQuery.query({
            accountIds: this.props.accountIds,
            query: `SELECT count(*) FROM pageView WHERE page_version = '${this.props.version}' SINCE 7 DAYS AGO`,
            formatType: NrqlQuery.FORMAT_TYPE.RAW
        }).then(({ data }) => {
            if (data.raw) {
                let tableData = {...this.state.tableData}
                tableData.data[1].count = data.raw.results[0].count
                this.setState({tableData})
            }

        })
    }

    render() {
        return <div>
            <HeadingText className="chartHeader">
                Version {this.props.version.toUpperCase()} - Page views vs. subscriptions
            </HeadingText>
            <TableChart data={[this.state.tableData]} fullWidth />
        </div>
    }
}
