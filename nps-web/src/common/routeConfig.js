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
import MissionApplication from "../admin/missionMgr/missionApplication/MissionApplication"
import NewApplicationForm from "../admin/missionMgr/missionApplication/NewApplicationForm"
import NotFound from '../admin/base/error/NotFound';
import ReviewApplication from "../admin/missionMgr/reviewApplication/ReviewApplication";

class RouteList extends React.PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/npsMgr/questionLibMgr" component={QuestionLibMgr}/>
                    <Route path="/npsMgr/QuestionAddMgr" component={QuestionAddMgr}/>
                    <Route path="/npsMgr/questionMgr/questionApplication" component={QuestionApplication}/>
                    <Route path="/npsMgr/questionMgr/questionEdit" component={QuestionEdit}/>
                    <Route path="/npsMgr/questionMgr/questionPreview" component={QuestionPreview}/>
                    <Route path="/missionMgr/missionApplication" component={MissionApplication}/>
                    <Route path="/missionMgr/newApplicationForm" component={NewApplicationForm}/>
                    <Route path="/missionMgr/reviewApplication" component={ReviewApplication}/>
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