package com.ztesoft.nps.business.surveyResultMgr.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class SurveyNpsInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public SurveyNpsInfoExample() {
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

        public Criteria andAreaIdIsNull() {
            addCriterion("area_id is null");
            return (Criteria) this;
        }

        public Criteria andAreaIdIsNotNull() {
            addCriterion("area_id is not null");
            return (Criteria) this;
        }

        public Criteria andAreaIdEqualTo(String value) {
            addCriterion("area_id =", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdNotEqualTo(String value) {
            addCriterion("area_id <>", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdGreaterThan(String value) {
            addCriterion("area_id >", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdGreaterThanOrEqualTo(String value) {
            addCriterion("area_id >=", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdLessThan(String value) {
            addCriterion("area_id <", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdLessThanOrEqualTo(String value) {
            addCriterion("area_id <=", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdLike(String value) {
            addCriterion("area_id like", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdNotLike(String value) {
            addCriterion("area_id not like", value, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdIn(List<String> values) {
            addCriterion("area_id in", values, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdNotIn(List<String> values) {
            addCriterion("area_id not in", values, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdBetween(String value1, String value2) {
            addCriterion("area_id between", value1, value2, "areaId");
            return (Criteria) this;
        }

        public Criteria andAreaIdNotBetween(String value1, String value2) {
            addCriterion("area_id not between", value1, value2, "areaId");
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

        public Criteria andNpsQuestionIdIsNull() {
            addCriterion("nps_question_id is null");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdIsNotNull() {
            addCriterion("nps_question_id is not null");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdEqualTo(String value) {
            addCriterion("nps_question_id =", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdNotEqualTo(String value) {
            addCriterion("nps_question_id <>", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdGreaterThan(String value) {
            addCriterion("nps_question_id >", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdGreaterThanOrEqualTo(String value) {
            addCriterion("nps_question_id >=", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdLessThan(String value) {
            addCriterion("nps_question_id <", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdLessThanOrEqualTo(String value) {
            addCriterion("nps_question_id <=", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdLike(String value) {
            addCriterion("nps_question_id like", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdNotLike(String value) {
            addCriterion("nps_question_id not like", value, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdIn(List<String> values) {
            addCriterion("nps_question_id in", values, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdNotIn(List<String> values) {
            addCriterion("nps_question_id not in", values, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdBetween(String value1, String value2) {
            addCriterion("nps_question_id between", value1, value2, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsQuestionIdNotBetween(String value1, String value2) {
            addCriterion("nps_question_id not between", value1, value2, "npsQuestionId");
            return (Criteria) this;
        }

        public Criteria andNpsRatioIsNull() {
            addCriterion("nps_ratio is null");
            return (Criteria) this;
        }

        public Criteria andNpsRatioIsNotNull() {
            addCriterion("nps_ratio is not null");
            return (Criteria) this;
        }

        public Criteria andNpsRatioEqualTo(BigDecimal value) {
            addCriterion("nps_ratio =", value, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioNotEqualTo(BigDecimal value) {
            addCriterion("nps_ratio <>", value, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioGreaterThan(BigDecimal value) {
            addCriterion("nps_ratio >", value, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio >=", value, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioLessThan(BigDecimal value) {
            addCriterion("nps_ratio <", value, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioLessThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio <=", value, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioIn(List<BigDecimal> values) {
            addCriterion("nps_ratio in", values, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioNotIn(List<BigDecimal> values) {
            addCriterion("nps_ratio not in", values, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio between", value1, value2, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsRatioNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio not between", value1, value2, "npsRatio");
            return (Criteria) this;
        }

        public Criteria andNpsCount1IsNull() {
            addCriterion("nps_count1 is null");
            return (Criteria) this;
        }

        public Criteria andNpsCount1IsNotNull() {
            addCriterion("nps_count1 is not null");
            return (Criteria) this;
        }

        public Criteria andNpsCount1EqualTo(Long value) {
            addCriterion("nps_count1 =", value, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1NotEqualTo(Long value) {
            addCriterion("nps_count1 <>", value, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1GreaterThan(Long value) {
            addCriterion("nps_count1 >", value, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1GreaterThanOrEqualTo(Long value) {
            addCriterion("nps_count1 >=", value, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1LessThan(Long value) {
            addCriterion("nps_count1 <", value, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1LessThanOrEqualTo(Long value) {
            addCriterion("nps_count1 <=", value, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1In(List<Long> values) {
            addCriterion("nps_count1 in", values, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1NotIn(List<Long> values) {
            addCriterion("nps_count1 not in", values, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1Between(Long value1, Long value2) {
            addCriterion("nps_count1 between", value1, value2, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsCount1NotBetween(Long value1, Long value2) {
            addCriterion("nps_count1 not between", value1, value2, "npsCount1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1IsNull() {
            addCriterion("nps_ratio1 is null");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1IsNotNull() {
            addCriterion("nps_ratio1 is not null");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1EqualTo(BigDecimal value) {
            addCriterion("nps_ratio1 =", value, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1NotEqualTo(BigDecimal value) {
            addCriterion("nps_ratio1 <>", value, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1GreaterThan(BigDecimal value) {
            addCriterion("nps_ratio1 >", value, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1GreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio1 >=", value, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1LessThan(BigDecimal value) {
            addCriterion("nps_ratio1 <", value, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1LessThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio1 <=", value, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1In(List<BigDecimal> values) {
            addCriterion("nps_ratio1 in", values, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1NotIn(List<BigDecimal> values) {
            addCriterion("nps_ratio1 not in", values, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1Between(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio1 between", value1, value2, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsRatio1NotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio1 not between", value1, value2, "npsRatio1");
            return (Criteria) this;
        }

        public Criteria andNpsCount2IsNull() {
            addCriterion("nps_count2 is null");
            return (Criteria) this;
        }

        public Criteria andNpsCount2IsNotNull() {
            addCriterion("nps_count2 is not null");
            return (Criteria) this;
        }

        public Criteria andNpsCount2EqualTo(Long value) {
            addCriterion("nps_count2 =", value, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2NotEqualTo(Long value) {
            addCriterion("nps_count2 <>", value, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2GreaterThan(Long value) {
            addCriterion("nps_count2 >", value, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2GreaterThanOrEqualTo(Long value) {
            addCriterion("nps_count2 >=", value, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2LessThan(Long value) {
            addCriterion("nps_count2 <", value, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2LessThanOrEqualTo(Long value) {
            addCriterion("nps_count2 <=", value, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2In(List<Long> values) {
            addCriterion("nps_count2 in", values, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2NotIn(List<Long> values) {
            addCriterion("nps_count2 not in", values, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2Between(Long value1, Long value2) {
            addCriterion("nps_count2 between", value1, value2, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsCount2NotBetween(Long value1, Long value2) {
            addCriterion("nps_count2 not between", value1, value2, "npsCount2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2IsNull() {
            addCriterion("nps_ratio2 is null");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2IsNotNull() {
            addCriterion("nps_ratio2 is not null");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2EqualTo(BigDecimal value) {
            addCriterion("nps_ratio2 =", value, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2NotEqualTo(BigDecimal value) {
            addCriterion("nps_ratio2 <>", value, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2GreaterThan(BigDecimal value) {
            addCriterion("nps_ratio2 >", value, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2GreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio2 >=", value, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2LessThan(BigDecimal value) {
            addCriterion("nps_ratio2 <", value, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2LessThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio2 <=", value, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2In(List<BigDecimal> values) {
            addCriterion("nps_ratio2 in", values, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2NotIn(List<BigDecimal> values) {
            addCriterion("nps_ratio2 not in", values, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2Between(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio2 between", value1, value2, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsRatio2NotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio2 not between", value1, value2, "npsRatio2");
            return (Criteria) this;
        }

        public Criteria andNpsCount3IsNull() {
            addCriterion("nps_count3 is null");
            return (Criteria) this;
        }

        public Criteria andNpsCount3IsNotNull() {
            addCriterion("nps_count3 is not null");
            return (Criteria) this;
        }

        public Criteria andNpsCount3EqualTo(Long value) {
            addCriterion("nps_count3 =", value, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3NotEqualTo(Long value) {
            addCriterion("nps_count3 <>", value, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3GreaterThan(Long value) {
            addCriterion("nps_count3 >", value, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3GreaterThanOrEqualTo(Long value) {
            addCriterion("nps_count3 >=", value, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3LessThan(Long value) {
            addCriterion("nps_count3 <", value, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3LessThanOrEqualTo(Long value) {
            addCriterion("nps_count3 <=", value, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3In(List<Long> values) {
            addCriterion("nps_count3 in", values, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3NotIn(List<Long> values) {
            addCriterion("nps_count3 not in", values, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3Between(Long value1, Long value2) {
            addCriterion("nps_count3 between", value1, value2, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsCount3NotBetween(Long value1, Long value2) {
            addCriterion("nps_count3 not between", value1, value2, "npsCount3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3IsNull() {
            addCriterion("nps_ratio3 is null");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3IsNotNull() {
            addCriterion("nps_ratio3 is not null");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3EqualTo(BigDecimal value) {
            addCriterion("nps_ratio3 =", value, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3NotEqualTo(BigDecimal value) {
            addCriterion("nps_ratio3 <>", value, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3GreaterThan(BigDecimal value) {
            addCriterion("nps_ratio3 >", value, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3GreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio3 >=", value, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3LessThan(BigDecimal value) {
            addCriterion("nps_ratio3 <", value, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3LessThanOrEqualTo(BigDecimal value) {
            addCriterion("nps_ratio3 <=", value, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3In(List<BigDecimal> values) {
            addCriterion("nps_ratio3 in", values, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3NotIn(List<BigDecimal> values) {
            addCriterion("nps_ratio3 not in", values, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3Between(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio3 between", value1, value2, "npsRatio3");
            return (Criteria) this;
        }

        public Criteria andNpsRatio3NotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("nps_ratio3 not between", value1, value2, "npsRatio3");
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

        public Criteria andTaskTypeEqualTo(int value) {
            addCriterion("task_type =", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeNotEqualTo(int value) {
            addCriterion("task_type <>", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeGreaterThan(int value) {
            addCriterion("task_type >", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeGreaterThanOrEqualTo(int value) {
            addCriterion("task_type >=", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeLessThan(int value) {
            addCriterion("task_type <", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeLessThanOrEqualTo(int value) {
            addCriterion("task_type <=", value, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeIn(List<Integer> values) {
            addCriterion("task_type in", values, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeNotIn(List<Integer> values) {
            addCriterion("task_type not in", values, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeBetween(int value1, int value2) {
            addCriterion("task_type between", value1, value2, "taskType");
            return (Criteria) this;
        }

        public Criteria andTaskTypeNotBetween(int value1, int value2) {
            addCriterion("task_type not between", value1, value2, "taskType");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNull() {
            addCriterion("create_date is null");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNotNull() {
            addCriterion("create_date is not null");
            return (Criteria) this;
        }

        public Criteria andCreateDateEqualTo(Date value) {
            addCriterionForJDBCDate("create_date =", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotEqualTo(Date value) {
            addCriterionForJDBCDate("create_date <>", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThan(Date value) {
            addCriterionForJDBCDate("create_date >", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("create_date >=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThan(Date value) {
            addCriterionForJDBCDate("create_date <", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThanOrEqualTo(Date value) {
            addCriterionForJDBCDate("create_date <=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateIn(List<Date> values) {
            addCriterionForJDBCDate("create_date in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotIn(List<Date> values) {
            addCriterionForJDBCDate("create_date not in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("create_date between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotBetween(Date value1, Date value2) {
            addCriterionForJDBCDate("create_date not between", value1, value2, "createDate");
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