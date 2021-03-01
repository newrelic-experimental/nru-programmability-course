import React from 'react';
import { AccountStorageMutation, AccountStorageQuery, BlockText, Button, ChartGroup, Grid, GridItem, HeadingText, LineChart, Modal, NerdGraphQuery, NerdGraphMutation, NerdletStateContext, NrqlQuery, PlatformStateContext, PieChart, Select, SelectItem, Spinner, TableChart, TextField } from 'nr1';

const ACCOUNT_ID = 3014918;
const VERSION_A_DESCRIPTION = 'The newsletter signup message says, "Sign up for our newsletter"'
const VERSION_B_DESCRIPTION = 'The newsletter signup message says, "Sign up for our newsletter and get a free shirt!"'


function getQuery(platformState, baseQuery) {
    const baseTimeRange = " SINCE 30 MINUTES AGO TIMESERIES"
    var query = baseQuery + baseTimeRange

    if (platformState.timeRange.begin_time) {
        const since = new Date(platformState.timeRange.begin_time).toISOString();
        var until = 'now';
        if (platformState.timeRange.end_time){
            until = new Date(platformState.timeRange.end_time).toISOString();
        }
        query = `${baseQuery} SINCE '${since}' TIMESERIES UNTIL '${until}'`
    } else if (platformState.timeRange.duration) {
        const since = platformState.timeRange.duration/1000/60;
        query = `${baseQuery} SINCE ${since} MINUTES AGO TIMESERIES`
    }
    return query
}

class NewsletterSignups extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Newsletter subscriptions per version
            </HeadingText>
            <PlatformStateContext.Consumer>
                {
                    (platformState) => {
                        return (
                            <NrqlQuery
                                accountId={platformState.accountId}
                                query={getQuery(platformState, "SELECT count(*) FROM subscription FACET page_version")}
                                pollInterval={60000}
                            >
                                {
                                    ({ data }) => {
                                        return <LineChart data={data} fullWidth />;
                                    }
                                }
                            </NrqlQuery>
                        )
                    }
                }
            </PlatformStateContext.Consumer>
        </React.Fragment>
    }
}

class TotalSubscriptions extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
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
        </React.Fragment>
    }
}

class TotalUnsubscriptions extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            successesA: {
                metadata: {
                    id: 'successes-A',
                    name: 'Version A',
                    viz: 'main',
                    color: 'blue',
                },
                data: [
                    { y: 0 },
                ],
            },
            successesB:  {
                metadata: {
                    id: 'successes-B',
                    name: 'Version B',
                    viz: 'main',
                    color: 'green',
                },
                data: [
                    { y: 0 },
                ],
            }
        }
    }

    componentDidMount() {
        // fetch(
        //     "http://3.12.41.152:5001/unsubscribes",
        //     {
        //         headers: {
        //             "Authorization": "Bearer ABC123",
        //         }
        //     }
        // ).then(res => {
        //     console.log(res.json())
        // })
    }

    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Total unsubscriptions per version
            </HeadingText>
            <PieChart data={[this.state.successesA, this.state.successesB]} fullWidth />
        </React.Fragment>
    }
}

class VersionATotals extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            tableData: {
                metadata: {
                    id: 'totals-A',
                    name: 'Version A',
                    columns: ['name', 'count'],
                },
                data: [
                    {
                        name: 'Subscriptions',
                        count: 0
                    },
                    {
                        name: 'Page views',
                        count: 0
                    },
                ],
            }
        }
    }

    componentDidMount() {
        NrqlQuery.query({
            accountId: ACCOUNT_ID,
            query: "SELECT count(*) FROM subscription WHERE page_version = 'a' SINCE 7 DAYS AGO",
            formatType: NrqlQuery.FORMAT_TYPE.RAW
        }).then(({ data }) => {
            if (data.raw) {
                let tableData = {...this.state.tableData}
                tableData.data[0].count = data.raw.results[0].count
                this.setState({tableData})
            }
        })

        NrqlQuery.query({
            accountId: ACCOUNT_ID,
            query: "SELECT count(*) FROM pageView WHERE page_version = 'a' SINCE 7 DAYS AGO",
            formatType: NrqlQuery.FORMAT_TYPE.RAW
        }).then(({ data }) => {
            if (data.raw) {
                let tableData = {...this.state.tableData}
                tableData.data[1].count = data.raw.results[0].count
                this.setState({tableData})
            }

        })
    }

    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Version A - Page views vs. subscriptions
            </HeadingText>
            <TableChart data={[this.state.tableData]} fullWidth />
        </React.Fragment>
    }
}

class VersionBTotals extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            tableData: {
                metadata: {
                    id: 'totals-B',
                    name: 'Version B',
                    columns: ['name', 'count'],
                },
                data: [
                    {
                        name: 'Subscriptions',
                        count: 0
                    },
                    {
                        name: 'Page views',
                        count: 0
                    },
                ],
            }
        }
    }

    componentDidMount() {
        NrqlQuery.query({
            accountId: ACCOUNT_ID,
            query: "SELECT count(*) FROM subscription WHERE page_version = 'b' SINCE 7 DAYS AGO",
            formatType: NrqlQuery.FORMAT_TYPE.RAW
        }).then(({ data }) => {
            if (data.raw) {
                let tableData = {...this.state.tableData}
                tableData.data[0].count = data.raw.results[0].count
                this.setState({tableData})
            }

        })

        NrqlQuery.query({
            accountId: ACCOUNT_ID,
            query: "SELECT count(*) FROM pageView WHERE page_version = 'b' SINCE 7 DAYS AGO",
            formatType: NrqlQuery.FORMAT_TYPE.RAW
        }).then(({ data }) => {
            if (data.raw) {
                let tableData = {...this.state.tableData}
                tableData.data[1].count = data.raw.results[0].count
                this.setState({tableData})
            }

        })
    }

    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Version B - Page views vs. subscriptions
            </HeadingText>
            <TableChart data={[this.state.tableData]} fullWidth />
        </React.Fragment>
    }
}

class VersionAResponseTimes extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Version A - Page views
            </HeadingText>
            <NrqlQuery
                accountId={ACCOUNT_ID}
                query="SELECT count(*) FROM pageView WHERE page_version = 'a' SINCE 30 MINUTES AGO TIMESERIES"
                pollInterval={60000}
            >
                {
                    ({ data }) => {
                        return <LineChart data={data} fullWidth />;
                    }
                }
            </NrqlQuery>
        </React.Fragment>
    }
}

class VersionBResponseTimes extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Version B - Page views
            </HeadingText>
            <PlatformStateContext.Consumer>
                {
                    (platformState) => {
                        <NrqlQuery
                            accountId={ACCOUNT_ID}
                            query={getQuery(platformState, "SELECT count(*) FROM pageView WHERE page_version = 'b' SINCE 30 MINUTES AGO TIMESERIES")}
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
        </React.Fragment>
    }
}

class HistoricalTests extends React.Component {
    render() {
        var historicalData = {
            metadata: {
                id: 'totals-B',
                name: 'Version B',
                columns: ['endDate', 'versionADescription', 'versionBDescription', 'winner'],
            },
            data: [],
        }

        return <React.Fragment>
            <HeadingText style={{ marginTop: '20px', marginBottom: '20px' }}>
                Past tests
            </HeadingText>
            <AccountStorageQuery accountId={ACCOUNT_ID} collection="past-tests">
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
                            this[index] = {
                                endDate: currentValue.id,
                                versionADescription: currentValue.document.versionADescription,
                                versionBDescription: currentValue.document.versionBDescription,
                                winner: currentValue.document.winner,
                            }
                        }, data
                    )
                    historicalData.data = data
                    return <TableChart data={[historicalData]} fullWidth />
                }}
            </AccountStorageQuery>
        </React.Fragment>
    }
}

class VersionSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Select onChange={this.props.selectVersion} value={this.props.selectedVersion}>
            <SelectItem value={'A'}>Version A</SelectItem>
            <SelectItem value={'B'}>Version B</SelectItem>
        </Select>
    }
}

class EndTestButton extends React.Component {
    constructor(props) {
        super(props);

        this.endTest = this.endTest.bind(this);
    }

    endTest() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const endDate = `${mm}/${dd}/${yyyy}`
        AccountStorageMutation.mutate(
            {
                accountId: ACCOUNT_ID,
                actionType: AccountStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
                collection: "past-tests",
                documentId: endDate,
                document: {
                    versionADescription: VERSION_A_DESCRIPTION,
                    versionBDescription: VERSION_B_DESCRIPTION,
                    winner: this.props.selectedVersion,
                }
            }
        )
        this.props.closeModal();
    }

    render() {
        return <React.Fragment>
            <Button type={Button.TYPE.DESTRUCTIVE} onClick={this.props.showModal}>End test</Button>

            <Modal hidden={this.props.modalHidden} onClose={this.props.closeModal}>
                <HeadingText>Are you sure?</HeadingText>
                <BlockText>
                    If you end the test, all your users will receive the version you selected:
                </BlockText>

                <BlockText spacingType={[BlockText.SPACING_TYPE.LARGE]}>
                    <b>Version {this.props.selectedVersion}</b>
                </BlockText>

                <Button onClick={this.props.closeModal}>No, continue test</Button>
                <Button type={Button.TYPE.DESTRUCTIVE} onClick={this.endTest}>Yes, end test</Button>
            </Modal>
        </React.Fragment>
    }
}

class EndTestSection extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            selectedVersion: 'A',
            modalHidden: true,
        };

        this.selectVersion = this.selectVersion.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    selectVersion(event, value) {
        this.setState({ selectedVersion: value });
    }

    closeModal() {
        this.setState({ modalHidden: true });
    }

    showModal() {
        this.setState({ modalHidden: false });
    }

    render() {
        return <Grid style={{ margin: 'auto', backgroundColor: '#fafafa', padding: '20px' }}>
            <GridItem columnSpan={12}>
                <HeadingText style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
                    Pick a version to end the test:
                </HeadingText>
            </GridItem>
            <GridItem columnStart={5} columnEnd={6} style={{ textAlign: 'right', paddingTop: '5px' }}>
                <VersionSelector
                    selectedVersion={this.state.selectedVersion}
                    selectVersion={this.selectVersion}
                />
            </GridItem>
            <GridItem columnStart={7} columnEnd={8}>
                <EndTestButton
                    modalHidden={this.state.modalHidden}
                    closeModal={this.closeModal}
                    showModal={this.showModal}
                    selectedVersion={this.state.selectedVersion}
                >
                    End test
                </EndTestButton>
            </GridItem>
        </Grid>
    }
}

class VersionDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeadingText style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
                    Version {this.props.version}
                </HeadingText>
                <BlockText style={{ marginBottom: "20px" }}>
                    {this.props.description}
                </BlockText>
            </React.Fragment>
        )
    }
}

class ApiTokenPrompt extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            hideTokenPrompt: true,
            token: null,
            tokenError: false,
        };

        this.showPrompt = this.showPrompt.bind(this);
        this.hidePrompt = this.hidePrompt.bind(this);
        this.changeToken = this.changeToken.bind(this);
        this.submitToken = this.submitToken.bind(this);
        this.hideTokenError = this.hideTokenError.bind(this);
        this.changeToken = this.changeToken.bind(this);
        this.storeToken = this.storeToken.bind(this);
    }

    showPrompt() {
        this.setState({ hideTokenPrompt: false });
    }

    hidePrompt() {
        this.setState({ hideTokenPrompt: true });
    }

    showTokenError() {
        this.setState({ tokenError: true });
    }

    hideTokenError() {
        this.setState({ tokenError: false });
    }

    changeToken(event) {
        this.setState({ token: event.target.value });
    }

    storeToken() {
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
            token: this.state.token,
        };
        NerdGraphMutation.mutate({ mutation: mutation, variables: variables });
    }

    submitToken(event) {
        event.preventDefault();

        var token = this.state.token
        if (token) {
            this.storeToken()
            this.hideTokenError()
            this.hidePrompt()
        } else {
            this.showTokenError()
        }
    }

    componentDidMount() {
        const query = `
            query($key: String!) {
                actor {
                    nerdStorageVault {
                        secret(key: $key) {
                            key
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
                    console.log(data.actor.nerdStorageVault.secret);
                } else {
                    this.showPrompt();
                }
            }
        )
    }

    render() {
        return <Modal hidden={this.state.hideTokenPrompt} onClose={() => { }}>
            To see unsubscription data, and to have the ability to end your test, you need to enter an API token for your backend service:

            <form>
                <TextField label="API token" onChange={this.changeToken} />
                <Button type={Button.TYPE.PRIMARY} onClick={this.submitToken}>Submit</Button>
                {this.state.tokenError &&
                    <BlockText style={{ color: "red" }}>Invalid token</BlockText>
                }
            </form>
        </Modal >
    }
}

export default class AbTestNerdletNerdlet extends React.Component {
    render() {
        return (
            <Grid style={{ width: '75%', margin: 'auto' }}>
                <GridItem columnSpan={12}><ApiTokenPrompt /></GridItem>
                <GridItem columnSpan={6}><VersionDescription version="A" description={VERSION_A_DESCRIPTION} /></GridItem>
                <GridItem columnSpan={6}><VersionDescription version="B" description={VERSION_B_DESCRIPTION} /></GridItem>
                <GridItem columnSpan={12}><hr /></GridItem>
                <GridItem columnSpan={12}><NewsletterSignups /></GridItem>
                <GridItem columnSpan={6}><TotalSubscriptions /></GridItem>
                <GridItem columnSpan={6}><TotalUnsubscriptions /></GridItem>
                <GridItem columnSpan={6}><VersionATotals /></GridItem>
                <GridItem columnSpan={6}><VersionBTotals /></GridItem>
                <ChartGroup>
                    <GridItem columnSpan={6}><VersionAResponseTimes /></GridItem>
                    <GridItem columnSpan={6}><VersionBResponseTimes /></GridItem>
                </ChartGroup>
                <GridItem columnSpan={12}><EndTestSection /></GridItem>
                <GridItem columnSpan={12}><HistoricalTests /></GridItem>
            </Grid>
        )
    }
}
