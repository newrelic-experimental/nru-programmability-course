import React from 'react';
import {
    AccountStorageQuery,
    HeadingText,
    Spinner,
    TableChart,
} from 'nr1';

export default class PastTests extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const historicalData = {
            metadata: {
                id: 'past-tests',
                name: 'Past tests',
                columns: ['endDate', 'versionADescription', 'versionBDescription', 'winner'],
            },
            data: [],
        }

        return <div>
            <HeadingText className="chartHeader">
                Past tests
            </HeadingText>
            <AccountStorageQuery accountId={this.props.accountId} collection="past-tests">
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Spinner />;
                    }
                    if (error) {
                        console.debug(error);
                        return 'There was an error fetching your data.';
                    }
                    data.forEach(
                        function (currentValue, index) {
                            historicalData.data.push({
                                endDate: currentValue.id,
                                versionADescription: currentValue.document.versionADescription,
                                versionBDescription: currentValue.document.versionBDescription,
                                winner: currentValue.document.winner,
                            })
                        }, data
                    )
                    return <TableChart data={[historicalData]} fullWidth />
                }}
            </AccountStorageQuery>
        </div>
    }
}
