import React from 'react';
import {
    HeadingText,
    LineChart,
    NrqlQuery,
} from 'nr1';

const ACCOUNT_ID = 3014918

export default class VersionPageViews extends React.Component {
    render() {
        return <div>
            <HeadingText className="chartHeader">
                Version {this.props.version.toUpperCase()} - Page views
            </HeadingText>
            <NrqlQuery
                accountId={ACCOUNT_ID}
                query={`SELECT count(*) FROM pageView WHERE page_version = '${this.props.version}' SINCE 30 MINUTES AGO TIMESERIES`}
                pollInterval={60000}
            >
                {
                    ({ data }) => {
                        return <LineChart data={data} fullWidth />;
                    }
                }
            </NrqlQuery>
        </div>
    }
}
