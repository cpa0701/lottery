package com.ztesoft.nps.business.qstnaireMgr.model;

import java.util.ArrayList;
import java.util.List;

public class QstnaireLogicSetupExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public QstnaireLogicSetupExample() {
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

        public Criteria andLogicIdIsNull() {
            addCriterion("logic_id is null");
            return (Criteria) this;
        }

        public Criteria andLogicIdIsNotNull() {
            addCriterion("logic_id is not null");
            return (Criteria) this;
        }

        public Criteria andLogicIdEqualTo(String value) {
            addCriterion("logic_id =", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdNotEqualTo(String value) {
            addCriterion("logic_id <>", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdGreaterThan(String value) {
            addCriterion("logic_id >", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdGreaterThanOrEqualTo(String value) {
            addCriterion("logic_id >=", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdLessThan(String value) {
            addCriterion("logic_id <", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdLessThanOrEqualTo(String value) {
            addCriterion("logic_id <=", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdLike(String value) {
            addCriterion("logic_id like", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdNotLike(String value) {
            addCriterion("logic_id not like", value, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdIn(List<String> values) {
            addCriterion("logic_id in", values, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdNotIn(List<String> values) {
            addCriterion("logic_id not in", values, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdBetween(String value1, String value2) {
            addCriterion("logic_id between", value1, value2, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicIdNotBetween(String value1, String value2) {
            addCriterion("logic_id not between", value1, value2, "logicId");
            return (Criteria) this;
        }

        public Criteria andLogicOrderIsNull() {
            addCriterion("logic_order is null");
            return (Criteria) this;
        }

        public Criteria andLogicOrderIsNotNull() {
            addCriterion("logic_order is not null");
            return (Criteria) this;
        }

        public Criteria andLogicOrderEqualTo(Short value) {
            addCriterion("logic_order =", value, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderNotEqualTo(Short value) {
            addCriterion("logic_order <>", value, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderGreaterThan(Short value) {
            addCriterion("logic_order >", value, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderGreaterThanOrEqualTo(Short value) {
            addCriterion("logic_order >=", value, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderLessThan(Short value) {
            addCriterion("logic_order <", value, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderLessThanOrEqualTo(Short value) {
            addCriterion("logic_order <=", value, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderIn(List<Short> values) {
            addCriterion("logic_order in", values, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderNotIn(List<Short> values) {
            addCriterion("logic_order not in", values, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderBetween(Short value1, Short value2) {
            addCriterion("logic_order between", value1, value2, "logicOrder");
            return (Criteria) this;
        }

        public Criteria andLogicOrderNotBetween(Short value1, Short value2) {
            addCriterion("logic_order not between", value1, value2, "logicOrder");
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

        public Criteria andSetupQuestionOrderIsNull() {
            addCriterion("setup_question_order is null");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderIsNotNull() {
            addCriterion("setup_question_order is not null");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderEqualTo(Short value) {
            addCriterion("setup_question_order =", value, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderNotEqualTo(Short value) {
            addCriterion("setup_question_order <>", value, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderGreaterThan(Short value) {
            addCriterion("setup_question_order >", value, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderGreaterThanOrEqualTo(Short value) {
            addCriterion("setup_question_order >=", value, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderLessThan(Short value) {
            addCriterion("setup_question_order <", value, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderLessThanOrEqualTo(Short value) {
            addCriterion("setup_question_order <=", value, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderIn(List<Short> values) {
            addCriterion("setup_question_order in", values, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderNotIn(List<Short> values) {
            addCriterion("setup_question_order not in", values, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderBetween(Short value1, Short value2) {
            addCriterion("setup_question_order between", value1, value2, "setupQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSetupQuestionOrderNotBetween(Short value1, Short value2) {
            addCriterion("setup_question_order not between", value1, value2, "setupQuestionOrder");
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

        public Criteria andOptionOrderEqualTo(String value) {
            addCriterion("option_order =", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotEqualTo(String value) {
            addCriterion("option_order <>", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderGreaterThan(String value) {
            addCriterion("option_order >", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderGreaterThanOrEqualTo(String value) {
            addCriterion("option_order >=", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderLessThan(String value) {
            addCriterion("option_order <", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderLessThanOrEqualTo(String value) {
            addCriterion("option_order <=", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderLike(String value) {
            addCriterion("option_order like", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotLike(String value) {
            addCriterion("option_order not like", value, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderIn(List<String> values) {
            addCriterion("option_order in", values, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotIn(List<String> values) {
            addCriterion("option_order not in", values, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderBetween(String value1, String value2) {
            addCriterion("option_order between", value1, value2, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andOptionOrderNotBetween(String value1, String value2) {
            addCriterion("option_order not between", value1, value2, "optionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderIsNull() {
            addCriterion("skipto_question_order is null");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderIsNotNull() {
            addCriterion("skipto_question_order is not null");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderEqualTo(Short value) {
            addCriterion("skipto_question_order =", value, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderNotEqualTo(Short value) {
            addCriterion("skipto_question_order <>", value, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderGreaterThan(Short value) {
            addCriterion("skipto_question_order >", value, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderGreaterThanOrEqualTo(Short value) {
            addCriterion("skipto_question_order >=", value, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderLessThan(Short value) {
            addCriterion("skipto_question_order <", value, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderLessThanOrEqualTo(Short value) {
            addCriterion("skipto_question_order <=", value, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderIn(List<Short> values) {
            addCriterion("skipto_question_order in", values, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderNotIn(List<Short> values) {
            addCriterion("skipto_question_order not in", values, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderBetween(Short value1, Short value2) {
            addCriterion("skipto_question_order between", value1, value2, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andSkiptoQuestionOrderNotBetween(Short value1, Short value2) {
            addCriterion("skipto_question_order not between", value1, value2, "skiptoQuestionOrder");
            return (Criteria) this;
        }

        public Criteria andLogicTypeIsNull() {
            addCriterion("logic_type is null");
            return (Criteria) this;
        }

        public Criteria andLogicTypeIsNotNull() {
            addCriterion("logic_type is not null");
            return (Criteria) this;
        }

        public Criteria andLogicTypeEqualTo(String value) {
            addCriterion("logic_type =", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeNotEqualTo(String value) {
            addCriterion("logic_type <>", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeGreaterThan(String value) {
            addCriterion("logic_type >", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeGreaterThanOrEqualTo(String value) {
            addCriterion("logic_type >=", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeLessThan(String value) {
            addCriterion("logic_type <", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeLessThanOrEqualTo(String value) {
            addCriterion("logic_type <=", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeLike(String value) {
            addCriterion("logic_type like", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeNotLike(String value) {
            addCriterion("logic_type not like", value, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeIn(List<String> values) {
            addCriterion("logic_type in", values, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeNotIn(List<String> values) {
            addCriterion("logic_type not in", values, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeBetween(String value1, String value2) {
            addCriterion("logic_type between", value1, value2, "logicType");
            return (Criteria) this;
        }

        public Criteria andLogicTypeNotBetween(String value1, String value2) {
            addCriterion("logic_type not between", value1, value2, "logicType");
            return (Criteria) this;
        }

        public Criteria andActTypeIsNull() {
            addCriterion("act_type is null");
            return (Criteria) this;
        }

        public Criteria andActTypeIsNotNull() {
            addCriterion("act_type is not null");
            return (Criteria) this;
        }

        public Criteria andActTypeEqualTo(Short value) {
            addCriterion("act_type =", value, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeNotEqualTo(Short value) {
            addCriterion("act_type <>", value, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeGreaterThan(Short value) {
            addCriterion("act_type >", value, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeGreaterThanOrEqualTo(Short value) {
            addCriterion("act_type >=", value, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeLessThan(Short value) {
            addCriterion("act_type <", value, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeLessThanOrEqualTo(Short value) {
            addCriterion("act_type <=", value, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeIn(List<Short> values) {
            addCriterion("act_type in", values, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeNotIn(List<Short> values) {
            addCriterion("act_type not in", values, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeBetween(Short value1, Short value2) {
            addCriterion("act_type between", value1, value2, "actType");
            return (Criteria) this;
        }

        public Criteria andActTypeNotBetween(Short value1, Short value2) {
            addCriterion("act_type not between", value1, value2, "actType");
            return (Criteria) this;
        }

        public Criteria andAndOrIsNull() {
            addCriterion("and_or is null");
            return (Criteria) this;
        }

        public Criteria andAndOrIsNotNull() {
            addCriterion("and_or is not null");
            return (Criteria) this;
        }

        public Criteria andAndOrEqualTo(Short value) {
            addCriterion("and_or =", value, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrNotEqualTo(Short value) {
            addCriterion("and_or <>", value, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrGreaterThan(Short value) {
            addCriterion("and_or >", value, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrGreaterThanOrEqualTo(Short value) {
            addCriterion("and_or >=", value, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrLessThan(Short value) {
            addCriterion("and_or <", value, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrLessThanOrEqualTo(Short value) {
            addCriterion("and_or <=", value, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrIn(List<Short> values) {
            addCriterion("and_or in", values, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrNotIn(List<Short> values) {
            addCriterion("and_or not in", values, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrBetween(Short value1, Short value2) {
            addCriterion("and_or between", value1, value2, "andOr");
            return (Criteria) this;
        }

        public Criteria andAndOrNotBetween(Short value1, Short value2) {
            addCriterion("and_or not between", value1, value2, "andOr");
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