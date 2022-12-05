import React from 'react';
import {
    HeadingText,
    LineChart,
    NrqlQuery,
} from 'nr1';

const ACCOUNT_ID = 1234567  // <YOUR NEW RELIC ACCOUNT ID>

export default class NewsletterSignups extends React.Component {
    render() {
        return <div>
            <HeadingText className="chartHeader">
                Newsletter subscriptions per version
            </HeadingText>
            <NrqlQuery
                accountIds={ACCOUNT_ID}
                query="SELECT count(*) FROM subscription FACET page_version SINCE 30 MINUTES AGO TIMESERIES"
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
