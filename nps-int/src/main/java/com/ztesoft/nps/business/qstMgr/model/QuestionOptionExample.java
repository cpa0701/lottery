package com.ztesoft.nps.business.qstMgr.model;

import java.util.ArrayList;
import java.util.List;

public class QuestionOptionExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public QuestionOptionExample() {
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

        public Criteria andOptionIdIsNull() {
            addCriterion("option_id is null");
            return (Criteria) this;
        }

        public Criteria andOptionIdIsNotNull() {
            addCriterion("option_id is not null");
            return (Criteria) this;
        }

        public Criteria andOptionIdEqualTo(String value) {
            addCriterion("option_id =", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdNotEqualTo(String value) {
            addCriterion("option_id <>", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdGreaterThan(String value) {
            addCriterion("option_id >", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdGreaterThanOrEqualTo(String value) {
            addCriterion("option_id >=", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdLessThan(String value) {
            addCriterion("option_id <", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdLessThanOrEqualTo(String value) {
            addCriterion("option_id <=", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdLike(String value) {
            addCriterion("option_id like", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdNotLike(String value) {
            addCriterion("option_id not like", value, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdIn(List<String> values) {
            addCriterion("option_id in", values, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdNotIn(List<String> values) {
            addCriterion("option_id not in", values, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdBetween(String value1, String value2) {
            addCriterion("option_id between", value1, value2, "optionId");
            return (Criteria) this;
        }

        public Criteria andOptionIdNotBetween(String value1, String value2) {
            addCriterion("option_id not between", value1, value2, "optionId");
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

        public Criteria andOptionOrderIsNull() {
            addCriterion("option_order is null");
            return (Criteria) this;
        }

        public Criteria andOptionOrderIsNotNull() {
            addCriterion("option_order is not null");
            return (Criteria) this;
        }

        public Criteria andOptionOrderEqualTo(Byte value) {
            addCriterion("option_order =", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotEqualTo(Byte value) {
            addCriterion("option_order <>", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderGreaterThan(Byte value) {
            addCriterion("option_order >", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderGreaterThanOrEqualTo(Byte value) {
            addCriterion("option_order >=", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderLessThan(Byte value) {
            addCriterion("option_order <", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderLessThanOrEqualTo(Byte value) {
            addCriterion("option_order <=", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderIn(List<Byte> values) {
            addCriterion("option_order in", values, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotIn(List<Byte> values) {
            addCriterion("option_order not in", values, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderBetween(Byte value1, Byte value2) {
            addCriterion("option_order between", value1, value2, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotBetween(Byte value1, Byte value2) {
            addCriterion("option_order not between", value1, value2, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionNameIsNull() {
            addCriterion("option_name is null");
            return (Criteria) this;
        }

        public Criteria andOptionNameIsNotNull() {
            addCriterion("option_name is not null");
            return (Criteria) this;
        }

        public Criteria andOptionNameEqualTo(String value) {
            addCriterion("option_name =", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameNotEqualTo(String value) {
            addCriterion("option_name <>", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameGreaterThan(String value) {
            addCriterion("option_name >", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameGreaterThanOrEqualTo(String value) {
            addCriterion("option_name >=", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameLessThan(String value) {
            addCriterion("option_name <", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameLessThanOrEqualTo(String value) {
            addCriterion("option_name <=", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameLike(String value) {
            addCriterion("option_name like", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameNotLike(String value) {
            addCriterion("option_name not like", value, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameIn(List<String> values) {
            addCriterion("option_name in", values, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameNotIn(List<String> values) {
            addCriterion("option_name not in", values, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameBetween(String value1, String value2) {
            addCriterion("option_name between", value1, value2, "optionName");
            return (Criteria) this;
        }

        public Criteria andOptionNameNotBetween(String value1, String value2) {
            addCriterion("option_name not between", value1, value2, "optionName");
            return (Criteria) this;
        }

        public Criteria andIsOtherIsNull() {
            addCriterion("is_other is null");
            return (Criteria) this;
        }

        public Criteria andIsOtherIsNotNull() {
            addCriterion("is_other is not null");
            return (Criteria) this;
        }

        public Criteria andIsOtherEqualTo(Boolean value) {
            addCriterion("is_other =", value, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherNotEqualTo(Boolean value) {
            addCriterion("is_other <>", value, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherGreaterThan(Boolean value) {
            addCriterion("is_other >", value, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherGreaterThanOrEqualTo(Boolean value) {
            addCriterion("is_other >=", value, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherLessThan(Boolean value) {
            addCriterion("is_other <", value, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherLessThanOrEqualTo(Boolean value) {
            addCriterion("is_other <=", value, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherIn(List<Boolean> values) {
            addCriterion("is_other in", values, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherNotIn(List<Boolean> values) {
            addCriterion("is_other not in", values, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherBetween(Boolean value1, Boolean value2) {
            addCriterion("is_other between", value1, value2, "isOther");
            return (Criteria) this;
        }

        public Criteria andIsOtherNotBetween(Boolean value1, Boolean value2) {
            addCriterion("is_other not between", value1, value2, "isOther");
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