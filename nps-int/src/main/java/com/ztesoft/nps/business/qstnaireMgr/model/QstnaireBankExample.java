package com.ztesoft.nps.business.qstnaireMgr.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class QstnaireBankExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public QstnaireBankExample() {
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

        public Criteria andQstnaireTitleIsNull() {
            addCriterion("qstnaire_title is null");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleIsNotNull() {
            addCriterion("qstnaire_title is not null");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleEqualTo(String value) {
            addCriterion("qstnaire_title =", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleNotEqualTo(String value) {
            addCriterion("qstnaire_title <>", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleGreaterThan(String value) {
            addCriterion("qstnaire_title >", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleGreaterThanOrEqualTo(String value) {
            addCriterion("qstnaire_title >=", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleLessThan(String value) {
            addCriterion("qstnaire_title <", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleLessThanOrEqualTo(String value) {
            addCriterion("qstnaire_title <=", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleLike(String value) {
            addCriterion("qstnaire_title like", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleNotLike(String value) {
            addCriterion("qstnaire_title not like", value, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleIn(List<String> values) {
            addCriterion("qstnaire_title in", values, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleNotIn(List<String> values) {
            addCriterion("qstnaire_title not in", values, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleBetween(String value1, String value2) {
            addCriterion("qstnaire_title between", value1, value2, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireTitleNotBetween(String value1, String value2) {
            addCriterion("qstnaire_title not between", value1, value2, "qstnaireTitle");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinIsNull() {
            addCriterion("qstnaire_leadin is null");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinIsNotNull() {
            addCriterion("qstnaire_leadin is not null");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinEqualTo(String value) {
            addCriterion("qstnaire_leadin =", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinNotEqualTo(String value) {
            addCriterion("qstnaire_leadin <>", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinGreaterThan(String value) {
            addCriterion("qstnaire_leadin >", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinGreaterThanOrEqualTo(String value) {
            addCriterion("qstnaire_leadin >=", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinLessThan(String value) {
            addCriterion("qstnaire_leadin <", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinLessThanOrEqualTo(String value) {
            addCriterion("qstnaire_leadin <=", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinLike(String value) {
            addCriterion("qstnaire_leadin like", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinNotLike(String value) {
            addCriterion("qstnaire_leadin not like", value, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinIn(List<String> values) {
            addCriterion("qstnaire_leadin in", values, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinNotIn(List<String> values) {
            addCriterion("qstnaire_leadin not in", values, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinBetween(String value1, String value2) {
            addCriterion("qstnaire_leadin between", value1, value2, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andQstnaireLeadinNotBetween(String value1, String value2) {
            addCriterion("qstnaire_leadin not between", value1, value2, "qstnaireLeadin");
            return (Criteria) this;
        }

        public Criteria andCatalogIdIsNull() {
            addCriterion("catalog_id is null");
            return (Criteria) this;
        }

        public Criteria andCatalogIdIsNotNull() {
            addCriterion("catalog_id is not null");
            return (Criteria) this;
        }

        public Criteria andCatalogIdEqualTo(String value) {
            addCriterion("catalog_id =", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdNotEqualTo(String value) {
            addCriterion("catalog_id <>", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdGreaterThan(String value) {
            addCriterion("catalog_id >", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdGreaterThanOrEqualTo(String value) {
            addCriterion("catalog_id >=", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdLessThan(String value) {
            addCriterion("catalog_id <", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdLessThanOrEqualTo(String value) {
            addCriterion("catalog_id <=", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdLike(String value) {
            addCriterion("catalog_id like", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdNotLike(String value) {
            addCriterion("catalog_id not like", value, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdIn(List<String> values) {
            addCriterion("catalog_id in", values, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdNotIn(List<String> values) {
            addCriterion("catalog_id not in", values, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdBetween(String value1, String value2) {
            addCriterion("catalog_id between", value1, value2, "catalogId");
            return (Criteria) this;
        }

        public Criteria andCatalogIdNotBetween(String value1, String value2) {
            addCriterion("catalog_id not between", value1, value2, "catalogId");
            return (Criteria) this;
        }

        public Criteria andBelongToIsNull() {
            addCriterion("belong_to is null");
            return (Criteria) this;
        }

        public Criteria andBelongToIsNotNull() {
            addCriterion("belong_to is not null");
            return (Criteria) this;
        }

        public Criteria andBelongToEqualTo(Short value) {
            addCriterion("belong_to =", value, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToNotEqualTo(Short value) {
            addCriterion("belong_to <>", value, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToGreaterThan(Short value) {
            addCriterion("belong_to >", value, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToGreaterThanOrEqualTo(Short value) {
            addCriterion("belong_to >=", value, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToLessThan(Short value) {
            addCriterion("belong_to <", value, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToLessThanOrEqualTo(Short value) {
            addCriterion("belong_to <=", value, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToIn(List<Short> values) {
            addCriterion("belong_to in", values, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToNotIn(List<Short> values) {
            addCriterion("belong_to not in", values, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToBetween(Short value1, Short value2) {
            addCriterion("belong_to between", value1, value2, "belongTo");
            return (Criteria) this;
        }

        public Criteria andBelongToNotBetween(Short value1, Short value2) {
            addCriterion("belong_to not between", value1, value2, "belongTo");
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

        public Criteria andIsInstIsNull() {
            addCriterion("is_inst is null");
            return (Criteria) this;
        }

        public Criteria andIsInstIsNotNull() {
            addCriterion("is_inst is not null");
            return (Criteria) this;
        }

        public Criteria andIsInstEqualTo(Short value) {
            addCriterion("is_inst =", value, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstNotEqualTo(Short value) {
            addCriterion("is_inst <>", value, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstGreaterThan(Short value) {
            addCriterion("is_inst >", value, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstGreaterThanOrEqualTo(Short value) {
            addCriterion("is_inst >=", value, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstLessThan(Short value) {
            addCriterion("is_inst <", value, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstLessThanOrEqualTo(Short value) {
            addCriterion("is_inst <=", value, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstIn(List<Short> values) {
            addCriterion("is_inst in", values, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstNotIn(List<Short> values) {
            addCriterion("is_inst not in", values, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstBetween(Short value1, Short value2) {
            addCriterion("is_inst between", value1, value2, "isInst");
            return (Criteria) this;
        }

        public Criteria andIsInstNotBetween(Short value1, Short value2) {
            addCriterion("is_inst not between", value1, value2, "isInst");
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