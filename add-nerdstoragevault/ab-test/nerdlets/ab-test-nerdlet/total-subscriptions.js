import React from 'react';
import {
    HeadingText,
    NrqlQuery,
    PieChart,
} from 'nr1';

const ACCOUNT_ID = 1234567  // <YOUR NEW RELIC ACCOUNT ID>

export default class TotalSubscriptions extends React.Component {
    render() {
        return <div>
            <HeadingText className="chartHeader">
                Total subscriptions per version
            </HeadingText>
            <NrqlQuery
                accountId={ACCOUNT_ID}
                query="SELECT count(*) FROM subscription FACET page_version SINCE 7 DAYS AGO"
                pollInterval={60000}
            >
                {
                    ({ data }) => {
                        return <PieChart data={data} fullWidth />
                    }
                }
            </NrqlQuery>
        </div>
    }
}
