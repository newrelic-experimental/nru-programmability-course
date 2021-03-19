import React from 'react';
import {
    HeadingText,
    LineChart,
    NrqlQuery,
    PlatformStateContext,
} from 'nr1';

export default class NewsletterSignups extends React.Component {
    render() {
        return <div>
            <HeadingText className="chartHeader">
                Newsletter subscriptions per version
            </HeadingText>
            <PlatformStateContext.Consumer>
                {
                    (platformState) => {
                        return <NrqlQuery
                            accountId={platformState.accountId}
                            query="SELECT count(*) FROM subscription FACET page_version TIMESERIES"
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
