import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import Home from "../admin/base/frame/Home/Home"
import Domain from "../admin/system/domain/Domain"
import Dept from "../admin/system/dept/Dept"
import Role from "../admin/system/role/Role"
import QuestionLibMgr from "../admin/npsMgr/questionLibMgr/QuestionLibMgr"
import QuestionAddMgr from "../admin/npsMgr/questionLibMgr/QuestionAddMgr"
import Authority from "../admin/system/authority/Authority"
import QuestionApplication from "../admin/npsMgr/questionApplication/QuestionApplication"
import QuestionEdit from "../admin/npsMgr/questionApplication/QuestionEdit"
import QuestionPreview from "../admin/npsMgr/questionPreview/QuestionPreview"
import NotFound from '../admin/base/error/NotFound';

import Test from "../admin/npsMgr/questionModule/Test"

class RouteList extends React.PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/npsMgr/questionLibMgr" component={QuestionLibMgr}/>
                    <Route path="/npsMgr/QuestionAddMgr" component={QuestionAddMgr}/>
                    <Route path="/npsMgr/table-list" component={Test}/>
                    <Route path="/npsMgr/questionMgr/questionApplication" component={QuestionApplication}/>
                    <Route path="/npsMgr/questionMgr/questionEdit" component={QuestionEdit}/>
                    <Route path="/npsMgr/questionMgr/QuestionPreview" component={QuestionPreview}/>
                    <Route path="/system/domain" component={Domain}/>
                    <Route path="/system/dept" component={Dept}/>
                    <Route path="/system/role" component={Role}/>
                    <Route path="/system/authority" component={Authority}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default RouteList