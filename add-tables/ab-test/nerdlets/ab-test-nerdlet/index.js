import React from 'react';
import NewsletterSignups from './newsletter-signups';
import TotalCancellations from './total-cancellations';
import TotalSubscriptions from './total-subscriptions';

export default class AbTestNerdletNerdlet extends React.Component {
    render() {
        return <div>
            <NewsletterSignups />
            <TotalSubscriptions />
            <TotalCancellations />
        </div>
    }
}
