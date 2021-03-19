import React from 'react';
import {
    Button,
    HeadingText,
    LineChart,
    NrqlQuery,
    PlatformStateContext,
    Stack,
    StackItem,
    navigation,
} from 'nr1';

const ENTITY_GUID = "<YOUR NEW RELIC ENTITY GUID>"

export default class NewsletterSignups extends React.Component {
    openAPMEntity() {
        navigation.openStackedEntity(ENTITY_GUID)
    }

    render() {
        return <div>
            <Stack fullWidth>
                <StackItem grow={true}>
                    <HeadingText className="chartHeader">
                        Newsletter subscriptions per version
                    </HeadingText>
                </StackItem>
                <StackItem>
                    <Button onClick={this.openAPMEntity}>
                        App performance
                    </Button>
                </StackItem>
            </Stack>
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
