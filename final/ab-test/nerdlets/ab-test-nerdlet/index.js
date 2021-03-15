import React from 'react';
import NewsletterSignups from './newsletter-signups';
import PastTests from './past-tests';
import TotalCancellations from './total-cancellations';
import TotalSubscriptions from './total-subscriptions';
import VersionDescription from './description';
import VersionPageViews from './page-views';
import VersionTotals from './totals';
import { ApiTokenButton, ApiTokenPrompt } from './token-prompt';
import { EndTestButton, EndTestSection, VersionSelector } from './end-test';
import {
    Grid,
    GridItem,
    ChartGroup,
    NerdGraphQuery,
    NerdGraphMutation,
} from 'nr1';

const ACCOUNT_ID = 3014918  // <YOUR-ACCOUNT-ID>
const VERSION_A_DESCRIPTION = 'The newsletter signup message says, "Sign up for our newsletter"'
const VERSION_B_DESCRIPTION = 'The newsletter signup message says, "Sign up for our newsletter and get a free shirt!"'

export default class AbTestNerdletNerdlet extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            hideTokenPrompt: true,
            token: null,
        }

        this.showPrompt = this.showPrompt.bind(this);
        this.hidePrompt = this.hidePrompt.bind(this);
        this.storeToken = this.storeToken.bind(this);
    }

    showPrompt() {
        this.setState({ hideTokenPrompt: false });
    }

    hidePrompt() {
        this.setState({ hideTokenPrompt: true });
    }

    componentDidMount() {
        const query = `
            query($key: String!) {
                actor {
                    nerdStorageVault {
                        secret(key: $key) {
                            value
                        }
                    }
                }
            }
        `;
        const variables = {
            key: "api_token",
        };

        NerdGraphQuery.query(
            {
                query: query,
                variables: variables,
            }
        ).then(
            ({ loading, error, data }) => {
                if (error) {
                    console.error(error);
                    this.showPrompt();
                }

                if (data && data.actor.nerdStorageVault.secret) {
                    this.setState({ token: data.actor.nerdStorageVault.secret.value })
                } else {
                    this.showPrompt();
                }
            }
        )
    }

    storeToken(newToken) {
        if (newToken != this.state.token) {
            const mutation = `
                mutation($key: String!, $token: SecureValue!) {
                    nerdStorageVaultWriteSecret(
                        scope: { actor: CURRENT_USER }
                        secret: { key: $key, value: $token }
                    ) {
                        status
                        errors {
                            message
                            type
                        }
                    }
                }
            `;
            const variables = {
                key: "api_token",
                token: newToken,
            };
            NerdGraphMutation.mutate({ mutation: mutation, variables: variables }).then(
                (data) => {
                    if (data.data.nerdStorageVaultWriteSecret.status === "SUCCESS") {
                        this.setState({token: newToken})
                    }
                }
            );
        }
    }

    render() {
        return (
            <div>
                <ApiTokenPrompt
                    hideTokenPrompt={this.state.hideTokenPrompt}
                    hidePrompt={this.hidePrompt}
                    showPrompt={this.showPrompt}
                    storeToken={this.storeToken}
                />

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
                    <GridItem columnSpan={6}>
                        <TotalSubscriptions accountId={ACCOUNT_ID}/>
                    </GridItem>
                    <GridItem columnSpan={6}>
                        <TotalCancellations token={this.state.token} />
                    </GridItem>
                    <GridItem columnSpan={6}>
                        <VersionTotals version='a' accountId={ACCOUNT_ID} />
                    </GridItem>
                    <GridItem columnSpan={6}>
                        <VersionTotals version='b' accountId={ACCOUNT_ID} />
                    </GridItem>
                    <ChartGroup>
                        <GridItem columnSpan={6}>
                            <VersionPageViews version='a' />
                        </GridItem>
                        <GridItem columnSpan={6}>
                            <VersionPageViews version='b' />
                        </GridItem>
                    </ChartGroup>
                    <GridItem columnSpan={12}>
                        <EndTestSection
                            accountId={ACCOUNT_ID}
                            versionADescription={VERSION_A_DESCRIPTION}
                            versionBDescription={VERSION_B_DESCRIPTION}
                        />
                    </GridItem>
                    <GridItem columnSpan={12}>
                        <PastTests accountId={ACCOUNT_ID} />
                    </GridItem>
                    <GridItem columnSpan={12}>
                        <ApiTokenButton showPrompt={this.showPrompt} />
                    </GridItem>
                </Grid>
            </div>
        )
    }
}
