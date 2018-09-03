package com.ztesoft.nps.business.qstnaireMgr.service;

import com.ztesoft.nps.business.qstMgr.model.QuestionResult;
import com.ztesoft.nps.business.qstnaireMgr.model.query.*;
import com.ztesoft.utils.plugin.jdbc.source.LPageHelper;

public interface QstnaireBankService {
    public QstnaireIdQuery addQstnaireBank(AddQstnaireBankQuery addQstnaireBankQuery);
    public QstnaireIdQuery eiditQstnaire(AddQstnaireBankQuery addQstnaireBankQuery);

    public int deleteQstnaire(QstnaireIdQuery qstnaireIdQuery);
    public QstnaireByIdQuery qstnaireById(QstnaireIdQuery qstnaireIdQuery);

    public int actionQstnaire(ActionQstnaireQuery actionQstnaireQuery);

    public LPageHelper qstnaireBank(QstnaireBankQuery qstnaireBankQuery);

    public int submitQstnaire(QuestionResult questionResult);
}
