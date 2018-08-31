package com.ztesoft.nps.business.qstnaireMgr.model;

import java.util.ArrayList;
import java.util.List;

public class QstnaireQuestionExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public QstnaireQuestionExample() {
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

        public Criteria andQuestionOrderIsNull() {
            addCriterion("question_order is null");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderIsNotNull() {
            addCriterion("question_order is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderEqualTo(Short value) {
            addCriterion("question_order =", value, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderNotEqualTo(Short value) {
            addCriterion("question_order <>", value, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderGreaterThan(Short value) {
            addCriterion("question_order >", value, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderGreaterThanOrEqualTo(Short value) {
            addCriterion("question_order >=", value, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderLessThan(Short value) {
            addCriterion("question_order <", value, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderLessThanOrEqualTo(Short value) {
            addCriterion("question_order <=", value, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderIn(List<Short> values) {
            addCriterion("question_order in", values, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderNotIn(List<Short> values) {
            addCriterion("question_order not in", values, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderBetween(Short value1, Short value2) {
            addCriterion("question_order between", value1, value2, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andQuestionOrderNotBetween(Short value1, Short value2) {
            addCriterion("question_order not between", value1, value2, "questionOrder");
            return (Criteria) this;
        }

        public Criteria andIsBlankIsNull() {
            addCriterion("is_blank is null");
            return (Criteria) this;
        }

        public Criteria andIsBlankIsNotNull() {
            addCriterion("is_blank is not null");
            return (Criteria) this;
        }

        public Criteria andIsBlankEqualTo(Short value) {
            addCriterion("is_blank =", value, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankNotEqualTo(Short value) {
            addCriterion("is_blank <>", value, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankGreaterThan(Short value) {
            addCriterion("is_blank >", value, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankGreaterThanOrEqualTo(Short value) {
            addCriterion("is_blank >=", value, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankLessThan(Short value) {
            addCriterion("is_blank <", value, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankLessThanOrEqualTo(Short value) {
            addCriterion("is_blank <=", value, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankIn(List<Short> values) {
            addCriterion("is_blank in", values, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankNotIn(List<Short> values) {
            addCriterion("is_blank not in", values, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankBetween(Short value1, Short value2) {
            addCriterion("is_blank between", value1, value2, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsBlankNotBetween(Short value1, Short value2) {
            addCriterion("is_blank not between", value1, value2, "isBlank");
            return (Criteria) this;
        }

        public Criteria andIsPagingIsNull() {
            addCriterion("is_paging is null");
            return (Criteria) this;
        }

        public Criteria andIsPagingIsNotNull() {
            addCriterion("is_paging is not null");
            return (Criteria) this;
        }

        public Criteria andIsPagingEqualTo(Short value) {
            addCriterion("is_paging =", value, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingNotEqualTo(Short value) {
            addCriterion("is_paging <>", value, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingGreaterThan(Short value) {
            addCriterion("is_paging >", value, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingGreaterThanOrEqualTo(Short value) {
            addCriterion("is_paging >=", value, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingLessThan(Short value) {
            addCriterion("is_paging <", value, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingLessThanOrEqualTo(Short value) {
            addCriterion("is_paging <=", value, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingIn(List<Short> values) {
            addCriterion("is_paging in", values, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingNotIn(List<Short> values) {
            addCriterion("is_paging not in", values, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingBetween(Short value1, Short value2) {
            addCriterion("is_paging between", value1, value2, "isPaging");
            return (Criteria) this;
        }

        public Criteria andIsPagingNotBetween(Short value1, Short value2) {
            addCriterion("is_paging not between", value1, value2, "isPaging");
            return (Criteria) this;
        }

        public Criteria andPageTxtIsNull() {
            addCriterion("page_txt is null");
            return (Criteria) this;
        }

        public Criteria andPageTxtIsNotNull() {
            addCriterion("page_txt is not null");
            return (Criteria) this;
        }

        public Criteria andPageTxtEqualTo(String value) {
            addCriterion("page_txt =", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtNotEqualTo(String value) {
            addCriterion("page_txt <>", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtGreaterThan(String value) {
            addCriterion("page_txt >", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtGreaterThanOrEqualTo(String value) {
            addCriterion("page_txt >=", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtLessThan(String value) {
            addCriterion("page_txt <", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtLessThanOrEqualTo(String value) {
            addCriterion("page_txt <=", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtLike(String value) {
            addCriterion("page_txt like", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtNotLike(String value) {
            addCriterion("page_txt not like", value, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtIn(List<String> values) {
            addCriterion("page_txt in", values, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtNotIn(List<String> values) {
            addCriterion("page_txt not in", values, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtBetween(String value1, String value2) {
            addCriterion("page_txt between", value1, value2, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andPageTxtNotBetween(String value1, String value2) {
            addCriterion("page_txt not between", value1, value2, "pageTxt");
            return (Criteria) this;
        }

        public Criteria andIsNpsIsNull() {
            addCriterion("is_nps is null");
            return (Criteria) this;
        }

        public Criteria andIsNpsIsNotNull() {
            addCriterion("is_nps is not null");
            return (Criteria) this;
        }

        public Criteria andIsNpsEqualTo(Short value) {
            addCriterion("is_nps =", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsNotEqualTo(Short value) {
            addCriterion("is_nps <>", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsGreaterThan(Short value) {
            addCriterion("is_nps >", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsGreaterThanOrEqualTo(Short value) {
            addCriterion("is_nps >=", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsLessThan(Short value) {
            addCriterion("is_nps <", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsLessThanOrEqualTo(Short value) {
            addCriterion("is_nps <=", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsIn(List<Short> values) {
            addCriterion("is_nps in", values, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsNotIn(List<Short> values) {
            addCriterion("is_nps not in", values, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsBetween(Short value1, Short value2) {
            addCriterion("is_nps between", value1, value2, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsNotBetween(Short value1, Short value2) {
            addCriterion("is_nps not between", value1, value2, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedIsNull() {
            addCriterion("is_satisfied is null");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedIsNotNull() {
            addCriterion("is_satisfied is not null");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedEqualTo(Short value) {
            addCriterion("is_satisfied =", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedNotEqualTo(Short value) {
            addCriterion("is_satisfied <>", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedGreaterThan(Short value) {
            addCriterion("is_satisfied >", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedGreaterThanOrEqualTo(Short value) {
            addCriterion("is_satisfied >=", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedLessThan(Short value) {
            addCriterion("is_satisfied <", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedLessThanOrEqualTo(Short value) {
            addCriterion("is_satisfied <=", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedIn(List<Short> values) {
            addCriterion("is_satisfied in", values, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedNotIn(List<Short> values) {
            addCriterion("is_satisfied not in", values, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedBetween(Short value1, Short value2) {
            addCriterion("is_satisfied between", value1, value2, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedNotBetween(Short value1, Short value2) {
            addCriterion("is_satisfied not between", value1, value2, "isSatisfied");
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