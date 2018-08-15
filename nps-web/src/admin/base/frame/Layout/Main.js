import React from 'react';
import {Layout} from 'antd';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Breadcrumb from '../Breadcrumb/Breadcrumb'

import RouteList from '../../../../common/routeConfig'//引入路由

import {inject, observer} from "mobx-react/index"

import "./Main.less"
import QuestionApplication from "../../../npsMgr/questionApplication/QuestionApplication"
import QuestionPreview from "../../../npsMgr/questionPreview/QuestionPreview"
import NotFound from "../../error/NotFound"
import QuestionLibMgr from "../../../npsMgr/questionLibMgr/QuestionLibMgr"
import Domain from "../../../system/domain/Domain"
import Home from "../Home/Home"
import Role from "../../../system/role/Role"
import Dept from "../../../system/dept/Dept"
import Authority from "../../../system/authority/Authority"

const {Content} = Layout;

@inject("stores")
@observer
class Main extends React.Component {
    componentWillUpdate(nextProps) {
        // console.log(nextProps)//监听路由
    }

    render() {
        return (
            <Router>
                <Layout className="layout">
                    <Header/>
                    <Content>
                        <Breadcrumb/>
                        <div className="content">
                            <RouteList/>
                        </div>
                    </Content>
                    <Footer/>
                </Layout>
            </Router>
        )
    }
}

export default Main;
