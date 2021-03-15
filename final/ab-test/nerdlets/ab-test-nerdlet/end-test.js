import React from 'react';
import {
    AccountStorageMutation,
    BlockText,
    Button,
    Grid,
    GridItem,
    HeadingText,
    Modal,
    Select,
    SelectItem,
} from 'nr1';

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

        this.state = {
            modalHidden: true,
        }

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.endTest = this.endTest.bind(this);
    }

    closeModal() {
        this.setState({ modalHidden: true });
    }

    showModal() {
        this.setState({ modalHidden: false });
    }

    endTest() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const endDate = `${mm}/${dd}/${yyyy}`
        AccountStorageMutation.mutate(
            {
                accountId: this.props.accountId,
                actionType: AccountStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
                collection: "past-tests",
                documentId: endDate,
                document: {
                    versionADescription: this.props.versionADescription,
                    versionBDescription: this.props.versionBDescription,
                    winner: this.props.selectedVersion,
                }
            }
        )
        this.closeModal();
    }

    render() {
        return <div>
            <Button type={Button.TYPE.DESTRUCTIVE} onClick={this.showModal}>End test</Button>

            <Modal hidden={this.state.modalHidden} onClose={this.closeModal}>
                <HeadingText>Are you sure?</HeadingText>
                <BlockText>
                    If you end the test, all your users will receive the version you selected:
                </BlockText>

                <BlockText spacingType={[BlockText.SPACING_TYPE.LARGE]}>
                    <b>Version {this.props.selectedVersion}</b>
                </BlockText>

                <Button onClick={this.closeModal}>No, continue test</Button>
                <Button type={Button.TYPE.DESTRUCTIVE} onClick={this.endTest}>Yes, end test</Button>
            </Modal>
        </div>
    }
}

class EndTestSection extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            selectedVersion: 'A',
        };

        this.selectVersion = this.selectVersion.bind(this);
    }

    selectVersion(event, value) {
        this.setState({ selectedVersion: value });
    }

    render() {
        return <Grid className="endTestSection">
            <GridItem columnSpan={12}>
                <HeadingText className="endTestHeader">
                    Pick a version to end the test:
                </HeadingText>
            </GridItem>
            <GridItem columnStart={5} columnEnd={6} className="versionSelector">
                <VersionSelector
                    selectedVersion={this.state.selectedVersion}
                    selectVersion={this.selectVersion}
                />
            </GridItem>
            <GridItem columnStart={7} columnEnd={8}>
                <EndTestButton
                    accountId={this.props.accountId}
                    selectedVersion={this.state.selectedVersion}
                    versionADescription={this.props.versionADescription}
                    versionBDescription={this.props.versionBDescription}
                >
                    End test
                </EndTestButton>
            </GridItem>
        </Grid>
    }
}

export { EndTestButton, EndTestSection, VersionSelector }
