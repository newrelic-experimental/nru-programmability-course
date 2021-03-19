import React from 'react';
import { BlockText, HeadingText } from 'nr1';

export default class VersionDescription extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HeadingText className="versionHeader">
                    Version {this.props.version}
                </HeadingText>
                <BlockText className="versionText">
                    {this.props.description}
                </BlockText>
            </div>
        )
    }
}
