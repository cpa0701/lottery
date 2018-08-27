package com.ztesoft.nps.surveyTaskMgr.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class SurveyTaskExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SurveyTaskExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        protected void addCriterionForJDBCDate(String condition, Date value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value.getTime()), property);
        }

        protected void addCriterionForJDBCDate(String condition, List<Date> values, String property) {
            if (values == null || values.size() == 0) {
                throw new RuntimeException("Value list for " + property + " cannot be null or empty");
            }
            List<java.sql.Date> dateList = new ArrayList<java.sql.Date>();
            Iterator<Date> iter = values.iterator();
            while (iter.hasNext()) {
                dateList.add(new java.sql.Date(iter.next().getTime()));
            }
            addCriterion(condition, dateList, property);
        }

        protected void addCriterionForJDBCDate(String condition, Date value1, Date value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            addCriterion(condition, new java.sql.Date(value1.getTime()), new java.sql.Date(value2.getTime()), property);
        }

        public Criteria andTaskIdIsNull() {
            addCriterion("task_id is null");
            return (Criteria) this;
        }

        public Criteria andTaskIdIsNotNull() {
            addCriterion("task_id is not null");
            return (Criteria) this;
        }

        public Criteria andTaskIdEqualTo(String value) {
            addCriterion("task_id =", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotEqualTo(String value) {
            addCriterion("task_id <>", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdGreaterThan(String value) {
            addCriterion("task_id >", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdGreaterThanOrEqualTo(String value) {
            addCriterion("task_id >=", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLessThan(String value) {
            addCriterion("task_id <", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLessThanOrEqualTo(String value) {
            addCriterion("task_id <=", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdLike(String value) {
            addCriterion("task_id like", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotLike(String value) {
            addCriterion("task_id not like", value, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdIn(List<String> values) {
            addCriterion("task_id in", values, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotIn(List<String> values) {
            addCriterion("task_id not in", values, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdBetween(String value1, String value2) {
            addCriterion("task_id between", value1, value2, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskIdNotBetween(String value1, String value2) {
            addCriterion("task_id not between", value1, value2, "taskId");
            return (Criteria) this;
        }

        public Criteria andTaskNameIsNull() {
            addCriterion("task_name is null");
            return (Criteria) this;
        }

        public Criteria andTaskNameIsNotNull() {
            addCriterion("task_name is not null");
            return (Criteria) this;
        }

        public Criteria andTaskNameEqualTo(String value) {
            addCriterion("task_name =", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameNotEqualTo(String value) {
            addCriterion("task_name <>", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameGreaterThan(String value) {
            addCriterion("task_name >", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameGreaterThanOrEqualTo(String value) {
            addCriterion("task_name >=", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameLessThan(String value) {
            addCriterion("task_name <", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameLessThanOrEqualTo(String value) {
            addCriterion("task_name <=", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameLike(String value) {
            addCriterion("task_name like", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameNotLike(String value) {
            addCriterion("task_name not like", value, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameIn(List<String> values) {
            addCriterion("task_name in", values, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameNotIn(List<String> values) {
            addCriterion("task_name not in", values, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameBetween(String value1, String value2) {
            addCriterion("task_name between", value1, value2, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskNameNotBetween(String value1, String value2) {
            addCriterion("task_name not between", value1, value2, "taskName");
            return (Criteria) this;
        }

        public Criteria andTaskTypeIsNull() {
            addCriterion("task_type is null");
            return (Criteria) this;
        }

        public Criteria andTaskTypeIsNotNull() {
            addCriterion("task_type is not null");
            return (Criteria) this;
        }

        public Criteria andTaskTypeEqualTo(Short value) {
            addCriterion("task_type =", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeNotEqualTo(Short value) {
            addCriterion("task_type <>", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeGreaterThan(Short value) {
            addCriterion("task_type >", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeGreaterThanOrEqualTo(Short value) {
            addCriterion("task_type >=", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeLessThan(Short value) {
            addCriterion("task_type <", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeLessThanOrEqualTo(Short value) {
            addCriterion("task_type <=", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeIn(List<Short> values) {
            addCriterion("task_type in", values, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeNotIn(List<Short> values) {
            addCriterion("task_type not in", values, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeBetween(Short value1, Short value2) {
            addCriterion("task_type between", value1, value2, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeNotBetween(Short value1, Short value2) {
            addCriterion("task_type not between", value1, value2, "taskType");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdIsNull() {
            addCriterion("qstnaire_id is null");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdIsNotNull() {
            addCriterion("qstnaire_id is not null");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdEqualTo(String value) {
            addCriterion("qstnaire_id =", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdNotEqualTo(String value) {
            addCriterion("qstnaire_id <>", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdGreaterThan(String value) {
            addCriterion("qstnaire_id >", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdGreaterThanOrEqualTo(String value) {
            addCriterion("qstnaire_id >=", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdLessThan(String value) {
            addCriterion("qstnaire_id <", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdLessThanOrEqualTo(String value) {
            addCriterion("qstnaire_id <=", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdLike(String value) {
            addCriterion("qstnaire_id like", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdNotLike(String value) {
            addCriterion("qstnaire_id not like", value, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdIn(List<String> values) {
            addCriterion("qstnaire_id in", values, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdNotIn(List<String> values) {
            addCriterion("qstnaire_id not in", values, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdBetween(String value1, String value2) {
            addCriterion("qstnaire_id between", value1, value2, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andQstnaireIdNotBetween(String value1, String value2) {
            addCriterion("qstnaire_id not between", value1, value2, "qstnaireId");
            return (Criteria) this;
        }

        public Criteria andSurveySdateIsNull() {
            addCriterion("survey_sdate is null");
            return (Criteria) this;
        }

        public Criteria andSurveySdateIsNotNull() {
            addCriterion("survey_sdate is not null");
            return (Criteria) this;
        }

        public Criteria andSurveySdateEqualTo(Date value) {
            addCriterionForJDBCDate("survey_sdate =", value, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateNotEqualTo(Date value) {
            addCriterionForJDBCDate("survey_sdate <>", value, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateGreaterThan(Date value) {
            addCriterionForJDBCDate("survey_sdate >", value, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("survey_sdate >=", value, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateLessThan(Date value) {
            addCriterionForJDBCDate("survey_sdate <", value, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("survey_sdate <=", value, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateIn(List<Date> values) {
            addCriterionForJDBCDate("survey_sdate in", values, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateNotIn(List<Date> values) {
            addCriterionForJDBCDate("survey_sdate not in", values, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("survey_sdate between", value1, value2, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveySdateNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("survey_sdate not between", value1, value2, "surveySdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateIsNull() {
            addCriterion("survey_edate is null");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateIsNotNull() {
            addCriterion("survey_edate is not null");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateEqualTo(Date value) {
            addCriterionForJDBCDate("survey_edate =", value, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateNotEqualTo(Date value) {
            addCriterionForJDBCDate("survey_edate <>", value, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateGreaterThan(Date value) {
            addCriterionForJDBCDate("survey_edate >", value, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("survey_edate >=", value, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateLessThan(Date value) {
            addCriterionForJDBCDate("survey_edate <", value, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("survey_edate <=", value, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateIn(List<Date> values) {
            addCriterionForJDBCDate("survey_edate in", values, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateNotIn(List<Date> values) {
            addCriterionForJDBCDate("survey_edate not in", values, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("survey_edate between", value1, value2, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andSurveyEdateNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("survey_edate not between", value1, value2, "surveyEdate");
            return (Criteria) this;
        }

        public Criteria andCreateUidIsNull() {
            addCriterion("create_uid is null");
            return (Criteria) this;
        }

        public Criteria andCreateUidIsNotNull() {
            addCriterion("create_uid is not null");
            return (Criteria) this;
        }

        public Criteria andCreateUidEqualTo(Long value) {
            addCriterion("create_uid =", value, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidNotEqualTo(Long value) {
            addCriterion("create_uid <>", value, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidGreaterThan(Long value) {
            addCriterion("create_uid >", value, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidGreaterThanOrEqualTo(Long value) {
            addCriterion("create_uid >=", value, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidLessThan(Long value) {
            addCriterion("create_uid <", value, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidLessThanOrEqualTo(Long value) {
            addCriterion("create_uid <=", value, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidIn(List<Long> values) {
            addCriterion("create_uid in", values, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidNotIn(List<Long> values) {
            addCriterion("create_uid not in", values, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidBetween(Long value1, Long value2) {
            addCriterion("create_uid between", value1, value2, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateUidNotBetween(Long value1, Long value2) {
            addCriterion("create_uid not between", value1, value2, "createUid");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(String value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(String value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(String value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(String value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(String value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(String value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLike(String value) {
            addCriterion("status like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotLike(String value) {
            addCriterion("status not like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<String> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<String> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(String value1, String value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(String value1, String value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andDealTacheIsNull() {
            addCriterion("deal_tache is null");
            return (Criteria) this;
        }

        public Criteria andDealTacheIsNotNull() {
            addCriterion("deal_tache is not null");
            return (Criteria) this;
        }

        public Criteria andDealTacheEqualTo(String value) {
            addCriterion("deal_tache =", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheNotEqualTo(String value) {
            addCriterion("deal_tache <>", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheGreaterThan(String value) {
            addCriterion("deal_tache >", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheGreaterThanOrEqualTo(String value) {
            addCriterion("deal_tache >=", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheLessThan(String value) {
            addCriterion("deal_tache <", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheLessThanOrEqualTo(String value) {
            addCriterion("deal_tache <=", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheLike(String value) {
            addCriterion("deal_tache like", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheNotLike(String value) {
            addCriterion("deal_tache not like", value, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheIn(List<String> values) {
            addCriterion("deal_tache in", values, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheNotIn(List<String> values) {
            addCriterion("deal_tache not in", values, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheBetween(String value1, String value2) {
            addCriterion("deal_tache between", value1, value2, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealTacheNotBetween(String value1, String value2) {
            addCriterion("deal_tache not between", value1, value2, "dealTache");
            return (Criteria) this;
        }

        public Criteria andDealRoleIsNull() {
            addCriterion("deal_role is null");
            return (Criteria) this;
        }

        public Criteria andDealRoleIsNotNull() {
            addCriterion("deal_role is not null");
            return (Criteria) this;
        }

        public Criteria andDealRoleEqualTo(Long value) {
            addCriterion("deal_role =", value, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleNotEqualTo(Long value) {
            addCriterion("deal_role <>", value, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleGreaterThan(Long value) {
            addCriterion("deal_role >", value, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleGreaterThanOrEqualTo(Long value) {
            addCriterion("deal_role >=", value, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleLessThan(Long value) {
            addCriterion("deal_role <", value, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleLessThanOrEqualTo(Long value) {
            addCriterion("deal_role <=", value, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleIn(List<Long> values) {
            addCriterion("deal_role in", values, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleNotIn(List<Long> values) {
            addCriterion("deal_role not in", values, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleBetween(Long value1, Long value2) {
            addCriterion("deal_role between", value1, value2, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealRoleNotBetween(Long value1, Long value2) {
            addCriterion("deal_role not between", value1, value2, "dealRole");
            return (Criteria) this;
        }

        public Criteria andDealUidIsNull() {
            addCriterion("deal_uid is null");
            return (Criteria) this;
        }

        public Criteria andDealUidIsNotNull() {
            addCriterion("deal_uid is not null");
            return (Criteria) this;
        }

        public Criteria andDealUidEqualTo(Long value) {
            addCriterion("deal_uid =", value, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidNotEqualTo(Long value) {
            addCriterion("deal_uid <>", value, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidGreaterThan(Long value) {
            addCriterion("deal_uid >", value, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidGreaterThanOrEqualTo(Long value) {
            addCriterion("deal_uid >=", value, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidLessThan(Long value) {
            addCriterion("deal_uid <", value, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidLessThanOrEqualTo(Long value) {
            addCriterion("deal_uid <=", value, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidIn(List<Long> values) {
            addCriterion("deal_uid in", values, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidNotIn(List<Long> values) {
            addCriterion("deal_uid not in", values, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidBetween(Long value1, Long value2) {
            addCriterion("deal_uid between", value1, value2, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealUidNotBetween(Long value1, Long value2) {
            addCriterion("deal_uid not between", value1, value2, "dealUid");
            return (Criteria) this;
        }

        public Criteria andDealOrgIsNull() {
            addCriterion("deal_org is null");
            return (Criteria) this;
        }

        public Criteria andDealOrgIsNotNull() {
            addCriterion("deal_org is not null");
            return (Criteria) this;
        }

        public Criteria andDealOrgEqualTo(Long value) {
            addCriterion("deal_org =", value, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgNotEqualTo(Long value) {
            addCriterion("deal_org <>", value, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgGreaterThan(Long value) {
            addCriterion("deal_org >", value, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgGreaterThanOrEqualTo(Long value) {
            addCriterion("deal_org >=", value, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgLessThan(Long value) {
            addCriterion("deal_org <", value, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgLessThanOrEqualTo(Long value) {
            addCriterion("deal_org <=", value, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgIn(List<Long> values) {
            addCriterion("deal_org in", values, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgNotIn(List<Long> values) {
            addCriterion("deal_org not in", values, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgBetween(Long value1, Long value2) {
            addCriterion("deal_org between", value1, value2, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealOrgNotBetween(Long value1, Long value2) {
            addCriterion("deal_org not between", value1, value2, "dealOrg");
            return (Criteria) this;
        }

        public Criteria andDealTypeIsNull() {
            addCriterion("deal_type is null");
            return (Criteria) this;
        }

        public Criteria andDealTypeIsNotNull() {
            addCriterion("deal_type is not null");
            return (Criteria) this;
        }

        public Criteria andDealTypeEqualTo(String value) {
            addCriterion("deal_type =", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeNotEqualTo(String value) {
            addCriterion("deal_type <>", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeGreaterThan(String value) {
            addCriterion("deal_type >", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeGreaterThanOrEqualTo(String value) {
            addCriterion("deal_type >=", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeLessThan(String value) {
            addCriterion("deal_type <", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeLessThanOrEqualTo(String value) {
            addCriterion("deal_type <=", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeLike(String value) {
            addCriterion("deal_type like", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeNotLike(String value) {
            addCriterion("deal_type not like", value, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeIn(List<String> values) {
            addCriterion("deal_type in", values, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeNotIn(List<String> values) {
            addCriterion("deal_type not in", values, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeBetween(String value1, String value2) {
            addCriterion("deal_type between", value1, value2, "dealType");
            return (Criteria) this;
        }

        public Criteria andDealTypeNotBetween(String value1, String value2) {
            addCriterion("deal_type not between", value1, value2, "dealType");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}