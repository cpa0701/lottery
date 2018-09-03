package com.ztesoft.nps.business.qstMgr.model;

import java.util.ArrayList;
import java.util.List;

public class QuestionResultExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public QuestionResultExample() {
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

        public Criteria andSurveyResultNoIsNull() {
            addCriterion("survey_result_no is null");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoIsNotNull() {
            addCriterion("survey_result_no is not null");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoEqualTo(Long value) {
            addCriterion("survey_result_no =", value, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoNotEqualTo(Long value) {
            addCriterion("survey_result_no <>", value, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoGreaterThan(Long value) {
            addCriterion("survey_result_no >", value, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoGreaterThanOrEqualTo(Long value) {
            addCriterion("survey_result_no >=", value, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoLessThan(Long value) {
            addCriterion("survey_result_no <", value, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoLessThanOrEqualTo(Long value) {
            addCriterion("survey_result_no <=", value, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoIn(List<Long> values) {
            addCriterion("survey_result_no in", values, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoNotIn(List<Long> values) {
            addCriterion("survey_result_no not in", values, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoBetween(Long value1, Long value2) {
            addCriterion("survey_result_no between", value1, value2, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andSurveyResultNoNotBetween(Long value1, Long value2) {
            addCriterion("survey_result_no not between", value1, value2, "surveyResultNo");
            return (Criteria) this;
        }

        public Criteria andQuestionIdIsNull() {
            addCriterion("question_id is null");
            return (Criteria) this;
        }

        public Criteria andQuestionIdIsNotNull() {
            addCriterion("question_id is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionIdEqualTo(String value) {
            addCriterion("question_id =", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdNotEqualTo(String value) {
            addCriterion("question_id <>", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdGreaterThan(String value) {
            addCriterion("question_id >", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdGreaterThanOrEqualTo(String value) {
            addCriterion("question_id >=", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdLessThan(String value) {
            addCriterion("question_id <", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdLessThanOrEqualTo(String value) {
            addCriterion("question_id <=", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdLike(String value) {
            addCriterion("question_id like", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdNotLike(String value) {
            addCriterion("question_id not like", value, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdIn(List<String> values) {
            addCriterion("question_id in", values, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdNotIn(List<String> values) {
            addCriterion("question_id not in", values, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdBetween(String value1, String value2) {
            addCriterion("question_id between", value1, value2, "questionId");
            return (Criteria) this;
        }

        public Criteria andQuestionIdNotBetween(String value1, String value2) {
            addCriterion("question_id not between", value1, value2, "questionId");
            return (Criteria) this;
        }

        public Criteria andRowOrderIsNull() {
            addCriterion("row_order is null");
            return (Criteria) this;
        }

        public Criteria andRowOrderIsNotNull() {
            addCriterion("row_order is not null");
            return (Criteria) this;
        }

        public Criteria andRowOrderEqualTo(Short value) {
            addCriterion("row_order =", value, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderNotEqualTo(Short value) {
            addCriterion("row_order <>", value, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderGreaterThan(Short value) {
            addCriterion("row_order >", value, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderGreaterThanOrEqualTo(Short value) {
            addCriterion("row_order >=", value, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderLessThan(Short value) {
            addCriterion("row_order <", value, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderLessThanOrEqualTo(Short value) {
            addCriterion("row_order <=", value, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderIn(List<Short> values) {
            addCriterion("row_order in", values, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderNotIn(List<Short> values) {
            addCriterion("row_order not in", values, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderBetween(Short value1, Short value2) {
            addCriterion("row_order between", value1, value2, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andRowOrderNotBetween(Short value1, Short value2) {
            addCriterion("row_order not between", value1, value2, "rowOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionResultIsNull() {
            addCriterion("question_result is null");
            return (Criteria) this;
        }

        public Criteria andQuestionResultIsNotNull() {
            addCriterion("question_result is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionResultEqualTo(String value) {
            addCriterion("question_result =", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultNotEqualTo(String value) {
            addCriterion("question_result <>", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultGreaterThan(String value) {
            addCriterion("question_result >", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultGreaterThanOrEqualTo(String value) {
            addCriterion("question_result >=", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultLessThan(String value) {
            addCriterion("question_result <", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultLessThanOrEqualTo(String value) {
            addCriterion("question_result <=", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultLike(String value) {
            addCriterion("question_result like", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultNotLike(String value) {
            addCriterion("question_result not like", value, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultIn(List<String> values) {
            addCriterion("question_result in", values, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultNotIn(List<String> values) {
            addCriterion("question_result not in", values, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultBetween(String value1, String value2) {
            addCriterion("question_result between", value1, value2, "questionResult");
            return (Criteria) this;
        }

        public Criteria andQuestionResultNotBetween(String value1, String value2) {
            addCriterion("question_result not between", value1, value2, "questionResult");
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