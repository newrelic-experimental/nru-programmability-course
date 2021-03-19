import React from 'react';
import { ChartGroup, Grid, GridItem } from 'nr1';
import NewsletterSignups from './newsletter-signups';
import PastTests from './past-tests';
import TotalCancellations from './total-cancellations';
import TotalSubscriptions from './total-subscriptions';
import VersionPageViews from './page-views';
import VersionTotals from './totals';

export default class AbTestNerdletNerdlet extends React.Component {
    render() {
        return <div>
            <Grid className="wrapper">
                <GridItem columnSpan={12}><NewsletterSignups /></GridItem>
                <GridItem columnSpan={6}><TotalSubscriptions /></GridItem>
                <GridItem columnSpan={6}><TotalCancellations /></GridItem>
                <GridItem columnSpan={6}><VersionTotals version='a' /></GridItem>
                <GridItem columnSpan={6}><VersionTotals version='b' /></GridItem>
                <ChartGroup>
                    <GridItem columnSpan={6}>
                        <VersionPageViews version='a' />
                    </GridItem>
                    <GridItem columnSpan={6}>
                        <VersionPageViews version='b' />
                    </GridItem>
                </ChartGroup>
                <GridItem columnSpan={12}><PastTests /></GridItem>
            </Grid>
        </div>
    }
}
