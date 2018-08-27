import React from 'react';
import ReactDOM from 'react-dom';

import QuestionPreview from "./admin/npsMgr/questionPreview/QuestionPreview"

import registerServiceWorker from './registerServiceWorker';

import './mock/apiData'

ReactDOM.render(
    <QuestionPreview/>, document.getElementById('root'));
registerServiceWorker();
