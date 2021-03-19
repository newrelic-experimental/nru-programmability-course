import React from 'react';
import {
    Button,
    Grid,
    GridItem,
    HeadingText,
    Select,
    SelectItem,
} from 'nr1';

class VersionSelector extends React.Component {
    render() {
        return <Select>
            <SelectItem value={'A'}>Version A</SelectItem>
            <SelectItem value={'B'}>Version B</SelectItem>
        </Select>
    }
}

class EndTestButton extends React.Component {
    render() {
        return <div>
            <Button>End test</Button>
        </div>
    }
}

export default class EndTestSection extends React.Component {
    render() {
        return <Grid className="endTestSection">
            <GridItem columnSpan={12}>
                <HeadingText className="endTestHeader">
                    Pick the winner of your A/B test:
                </HeadingText>
            </GridItem>
            <GridItem columnStart={5} columnEnd={6} className="versionSelector">
                <VersionSelector />
            </GridItem>
            <GridItem columnStart={7} columnEnd={8}>
                <EndTestButton>End test</EndTestButton>
            </GridItem>
        </Grid>
    }
}
