import React from 'react';
import { Layout } from 'antd';

import "./Footer.less"
import {inject, observer} from "mobx-react/index"

const { Footer } = Layout;

@inject('stores')
@observer
class Foot extends React.PureComponent {
    render() {
        return (
            <Footer>
                {this.props.stores.I18nModel.outputLocale.footer.text}
            </Footer>
        )
    }
}

export default Foot;
