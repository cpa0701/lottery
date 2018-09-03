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
import QuestionReview from "../admin/npsMgr/questionApplication/QuestionReview"
import QuestionnaireLibrary from "../admin/npsMgr/questionApplication/QuestionnaireLibrary"
import QuestionEdit from "../admin/npsMgr/questionApplication/QuestionEdit"
import QuestionPreview from "../admin/npsMgr/questionPreview/QuestionPreview"
import MissionApplication from "../admin/missionMgr/missionApplication/MissionApplication"
import ResourceMap from "../admin/resourceMgr/resourceMap/ResourceMap"
import AnalysisResult from "../admin/satisfactionOperation/analysisResult/AnalysisResult"
import PerceptionView from "../admin/customerPerception/perceptionView/PerceptionView"
import BrandView from "../admin/customerPerception/brandView/BrandView"
import UseView from "../admin/customerPerception/useView/UseView"
import StatisticReport from "../admin/customerPerception/statisticReport/StatisticReport"
import NewApplicationForm from "../admin/missionMgr/missionApplication/NewApplicationForm"
import ReviewApplication from "../admin/missionMgr/reviewApplication/ReviewApplication";
import MissionTermination from "../admin/missionMgr/missionTermination/MissionTermination";
import MissionPeriodic from "../admin/missionMgr/missionPeriodic/MissionPeriodic";
import NotFound from '../admin/base/error/NotFound';

class RouteList extends React.PureComponent {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/npsMgr/questionLibMgr" component={QuestionLibMgr}/>
                    <Route path="/npsMgr/QuestionAddMgr/:id" component={QuestionAddMgr}/>
                    <Route path="/npsMgr/questionMgr/questionApplication" component={QuestionApplication}/>
                    <Route path="/npsMgr/questionMgr/questionAudit" component={QuestionReview}/>
                    <Route path="/npsMgr/questionMgr/questionnaireLibrary" component={QuestionnaireLibrary}/>
                    <Route path="/npsMgr/questionMgr/questionEdit/:id" component={QuestionEdit}/>
                    <Route path="/npsMgr/questionMgr/questionPreview/:data" component={QuestionPreview}/>
                    <Route path="/npsMgr/questionMgr/qstnairePreview/:data" component={QuestionPreview}/>
                    <Route path="/missionMgr/missionApplication" component={MissionApplication}/>
                    <Route path="/missionMgr/newApplicationForm" component={NewApplicationForm}/>
                    <Route path="/missionMgr/reviewApplication" component={ReviewApplication}/>
                    <Route path="/missionMgr/missionTermination" component={MissionTermination}/>
                    <Route path="/missionMgr/missionPeriodic" component={MissionPeriodic}/>
                    <Route path="/resourceMgr/resourceMap" component={ResourceMap}/>
                    <Route path="/satisfactionOperation/analysisResult" component={AnalysisResult}/>
                    <Route path="/customerPerception/perceptionView" component={PerceptionView}/>
                    <Route path="/customerPerception/brandView" component={BrandView}/>
                    <Route path="/customerPerception/useView" component={UseView}/>
                    <Route path="/customerPerception/statisticReport" component={StatisticReport}/>
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