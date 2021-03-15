import React from 'react';
import {
    HeadingText,
    NrqlQuery,
    PieChart,
} from 'nr1';

export default class TotalSubscriptions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <HeadingText className="chartHeader">
                Total subscriptions per version
            </HeadingText>
            <NrqlQuery
                accountId={this.props.accountId}
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
