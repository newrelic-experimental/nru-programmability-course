import React from 'react';
import {
    HeadingText,
    LineChart,
    NrqlQuery,
    PlatformStateContext,
} from 'nr1';

const ACCOUNT_ID = 3014918

export default class VersionPageViews extends React.Component {
    render() {
        return <div>
            <HeadingText className="chartHeader">
                Version {this.props.version.toUpperCase()} - Page views
            </HeadingText>
            <PlatformStateContext.Consumer>
                {
                    (platformState) => {
                        return <NrqlQuery
                            accountId={platformState.accountId}
                            query={`SELECT count(*) FROM pageView WHERE page_version = '${this.props.version}' TIMESERIES`}
                            timeRange={platformState.timeRange}
                            pollInterval={60000}
                        >
                            {
                                ({ data }) => {
                                    return <LineChart data={data} fullWidth />;
                                }
                            }
                        </NrqlQuery>
                    }
                }
            </PlatformStateContext.Consumer>
        </div>
    }
}
