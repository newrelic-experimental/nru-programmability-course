import React from 'react';
import { ChartGroup, Grid, GridItem } from 'nr1';
import NewsletterSignups from './newsletter-signups';
import PastTests from './past-tests';
import TotalCancellations from './total-cancellations';
import TotalSubscriptions from './total-subscriptions';
import VersionDescription from './description';
import VersionPageViews from './page-views';
import VersionTotals from './totals';

const VERSION_A_DESCRIPTION = 'The newsletter signup message says, "Sign up for our newsletter"'
const VERSION_B_DESCRIPTION = 'The newsletter signup message says, "Sign up for our newsletter and get a free shirt!"'

export default class AbTestNerdletNerdlet extends React.Component {
    render() {
        return <div>
            <Grid className="wrapper">
                <GridItem columnSpan={6}>
                    <VersionDescription
                        description={VERSION_A_DESCRIPTION}
                        version="A"
                    />
                </GridItem>
                <GridItem columnSpan={6}>
                    <VersionDescription
                        description={VERSION_B_DESCRIPTION}
                        version="B"
                    />
                </GridItem>
                <GridItem columnSpan={12}><hr /></GridItem>
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
