import React from 'react';
import {withRouter} from 'react-router-dom';
import {Breadcrumb} from 'antd';
import {observer, inject} from 'mobx-react';

import "./Breadcrumb.less"

@inject("stores")
@observer
class Bread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            menuMaps: []
        }
    }

    render() {
        const {stores, location} = this.props;
        let menuMaps = stores.MenuModel.menuMaps;
        let otherPage = {
            '/npsMgr/questionMgr/questionPreview': '问卷预览',
            '/npsMgr/questionMgr/questionEdit': '问卷编辑',
            '/npsMgr/questionAddMgr': '题目编辑',
            '/missionMgr/newApplicationForm': '新建申请单'
        }
        menuMaps = Object.assign(otherPage, menuMaps);
        const pathSnippets = location.pathname.split('/').filter(i => i);

        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url} href={'#' + url}>
                    {menuMaps[url]}
                </Breadcrumb.Item>
            );
        });
        let BreadcrumbItems = extraBreadcrumbItems;
        if (menuMaps.length !== 0 && pathSnippets.length === 0) {
            BreadcrumbItems = [(
                <Breadcrumb.Item key="home" href="/">
                    首页
                </Breadcrumb.Item>
            )].concat(extraBreadcrumbItems);
        }
        return (
            <Breadcrumb>
                {BreadcrumbItems}
            </Breadcrumb>)
    }
}

export default withRouter(Bread);
