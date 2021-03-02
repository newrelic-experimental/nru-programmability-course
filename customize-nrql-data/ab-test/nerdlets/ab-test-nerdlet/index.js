import React from 'react';
import { BlockText, Button, ChartGroup, Grid, GridItem, HeadingText, LineChart, Modal, NrqlQuery, PieChart, Select, SelectItem, TableChart } from 'nr1';

class NewsletterSignups extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText className="chartHeader">
                Newsletter subscriptions per version
            </HeadingText>
            <NrqlQuery
                accountId={3014918}
                query="SELECT count(*) FROM subscription FACET page_version SINCE 30 MINUTES AGO TIMESERIES"
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

class TestDistributions extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText className="chartHeader">
                Total subscriptions per version
            </HeadingText>
            <NrqlQuery
                accountId={3014918}
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

class SuccessfulRequests extends React.Component {
    render() {
        const successesA = {
            metadata: {
                id: 'successes-A',
                name: 'Version A',
                viz: 'main',
                color: 'blue',
            },
            data: [
                { y: 118 },
            ],
        }
        const successesB = {
            metadata: {
                id: 'successes-B',
                name: 'Version B',
                viz: 'main',
                color: 'green',
            },
            data: [
                { y: 400 },
            ],
        }
        return <React.Fragment>
            <HeadingText className="chartHeader">
                Total unsubscriptions per version
            </HeadingText>
            <PieChart data={[successesA, successesB]} fullWidth />
        </React.Fragment>
    }
}

class VersionATotals extends React.Component {
    render() {
        const versionATotals = {
            metadata: {
                id: 'totals-A',
                name: 'Version A',
                columns: ['name', 'count'],
            },
            data: [
                {
                    name: 'Successful Requests',
                    count: 85
                },
                {
                    name: 'Failed Requests',
                    count: 2
                },
            ],
        }
        return <React.Fragment>
            <HeadingText className="chartHeader">
                Version A - Page views vs. subscriptions
            </HeadingText>
            <TableChart data={[versionATotals]} fullWidth />
        </React.Fragment>
    }
}

class VersionBTotals extends React.Component {
    render() {
        const versionBTotals = {
            metadata: {
                id: 'totals-B',
                name: 'Version B',
                columns: ['name', 'count'],
            },
            data: [
                {
                    name: 'Successful Requests',
                    count: 180
                },
                {
                    name: 'Failed Requests',
                    count: 30
                },
            ],
        }
        return <React.Fragment>
            <HeadingText className="chartHeader">
                Version B - Page views vs. subscriptions
            </HeadingText>
            <TableChart data={[versionBTotals]} fullWidth />
        </React.Fragment>
    }
}

class VersionAResponseTimes extends React.Component {
    render() {
        return <React.Fragment>
            <HeadingText className="chartHeader">
                Version A - Page views
            </HeadingText>
            <NrqlQuery
                accountId={3014918}
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
            <HeadingText className="chartHeader">
                Version B - Page views
            </HeadingText>
            <NrqlQuery
                accountId={3014918}
                query="SELECT count(*) FROM pageView WHERE page_version = 'b' SINCE 30 MINUTES AGO TIMESERIES"
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

class HistoricalTests extends React.Component {
    render() {
        var historicalData = {
            metadata: {
                id: 'totals-B',
                name: 'Version B',
                columns: ['endDate', 'versionADescription', 'versionBDescription', 'winner'],
            },
            data: [
                {
                    "endDate": "12/15/2020",
                    "versionADescription": "The homepage's CTA button was green.",
                    "versionBDescription": "The homepage's CTA button was blue.",
                    "winner": "A"
                },
                {
                    "endDate": "09/06/2019",
                    "versionADescription": "The 'Deals' page showed sales in a carousel.",
                    "versionBDescription": "The 'Deals' page showed sales in a grid.",
                    "winner": "B"
                }
            ],
        }

        return <React.Fragment>
            <HeadingText className="chartHeader">
                Past tests
            </HeadingText>
            <TableChart data={[historicalData]} fullWidth />
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
                <Button type={Button.TYPE.DESTRUCTIVE} onClick={this.props.closeModal}>Yes, end test</Button>
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
        return <Grid className="abTestGrid">
            <GridItem columnSpan={12}>
                <HeadingText  className="sectionHeader">
                    Pick a version to end the test:
                </HeadingText>
            </GridItem>
            <GridItem columnStart={5} columnEnd={6}  className="versionSelector">
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

export default class AbTestNerdletNerdlet extends React.Component {
    render() {
        return (
            <Grid>
                <GridItem columnSpan={12}><NewsletterSignups /></GridItem>
                <GridItem columnSpan={6}><TestDistributions /></GridItem>
                <GridItem columnSpan={6}><SuccessfulRequests /></GridItem>
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
