package com.ztesoft.nps.qstMgr.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class QuestionBankExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public QuestionBankExample() {
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

        public Criteria andQuestionNameIsNull() {
            addCriterion("question_name is null");
            return (Criteria) this;
        }

        public Criteria andQuestionNameIsNotNull() {
            addCriterion("question_name is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionNameEqualTo(String value) {
            addCriterion("question_name =", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameNotEqualTo(String value) {
            addCriterion("question_name <>", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameGreaterThan(String value) {
            addCriterion("question_name >", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameGreaterThanOrEqualTo(String value) {
            addCriterion("question_name >=", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameLessThan(String value) {
            addCriterion("question_name <", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameLessThanOrEqualTo(String value) {
            addCriterion("question_name <=", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameLike(String value) {
            addCriterion("question_name like", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameNotLike(String value) {
            addCriterion("question_name not like", value, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameIn(List<String> values) {
            addCriterion("question_name in", values, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameNotIn(List<String> values) {
            addCriterion("question_name not in", values, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameBetween(String value1, String value2) {
            addCriterion("question_name between", value1, value2, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionNameNotBetween(String value1, String value2) {
            addCriterion("question_name not between", value1, value2, "questionName");
            return (Criteria) this;
        }

        public Criteria andQuestionName2IsNull() {
            addCriterion("question_name2 is null");
            return (Criteria) this;
        }

        public Criteria andQuestionName2IsNotNull() {
            addCriterion("question_name2 is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionName2EqualTo(String value) {
            addCriterion("question_name2 =", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2NotEqualTo(String value) {
            addCriterion("question_name2 <>", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2GreaterThan(String value) {
            addCriterion("question_name2 >", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2GreaterThanOrEqualTo(String value) {
            addCriterion("question_name2 >=", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2LessThan(String value) {
            addCriterion("question_name2 <", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2LessThanOrEqualTo(String value) {
            addCriterion("question_name2 <=", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2Like(String value) {
            addCriterion("question_name2 like", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2NotLike(String value) {
            addCriterion("question_name2 not like", value, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2In(List<String> values) {
            addCriterion("question_name2 in", values, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2NotIn(List<String> values) {
            addCriterion("question_name2 not in", values, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2Between(String value1, String value2) {
            addCriterion("question_name2 between", value1, value2, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionName2NotBetween(String value1, String value2) {
            addCriterion("question_name2 not between", value1, value2, "questionName2");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeIsNull() {
            addCriterion("question_type is null");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeIsNotNull() {
            addCriterion("question_type is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeEqualTo(String value) {
            addCriterion("question_type =", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeNotEqualTo(String value) {
            addCriterion("question_type <>", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeGreaterThan(String value) {
            addCriterion("question_type >", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeGreaterThanOrEqualTo(String value) {
            addCriterion("question_type >=", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeLessThan(String value) {
            addCriterion("question_type <", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeLessThanOrEqualTo(String value) {
            addCriterion("question_type <=", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeLike(String value) {
            addCriterion("question_type like", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeNotLike(String value) {
            addCriterion("question_type not like", value, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeIn(List<String> values) {
            addCriterion("question_type in", values, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeNotIn(List<String> values) {
            addCriterion("question_type not in", values, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeBetween(String value1, String value2) {
            addCriterion("question_type between", value1, value2, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionTypeNotBetween(String value1, String value2) {
            addCriterion("question_type not between", value1, value2, "questionType");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryIsNull() {
            addCriterion("question_category is null");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryIsNotNull() {
            addCriterion("question_category is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryEqualTo(Short value) {
            addCriterion("question_category =", value, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryNotEqualTo(Short value) {
            addCriterion("question_category <>", value, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryGreaterThan(Short value) {
            addCriterion("question_category >", value, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryGreaterThanOrEqualTo(Short value) {
            addCriterion("question_category >=", value, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryLessThan(Short value) {
            addCriterion("question_category <", value, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryLessThanOrEqualTo(Short value) {
            addCriterion("question_category <=", value, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryIn(List<Short> values) {
            addCriterion("question_category in", values, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryNotIn(List<Short> values) {
            addCriterion("question_category not in", values, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryBetween(Short value1, Short value2) {
            addCriterion("question_category between", value1, value2, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andQuestionCategoryNotBetween(Short value1, Short value2) {
            addCriterion("question_category not between", value1, value2, "questionCategory");
            return (Criteria) this;
        }

        public Criteria andIsCommonIsNull() {
            addCriterion("is_common is null");
            return (Criteria) this;
        }

        public Criteria andIsCommonIsNotNull() {
            addCriterion("is_common is not null");
            return (Criteria) this;
        }

        public Criteria andIsCommonEqualTo(Integer value) {
            addCriterion("is_common =", value, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonNotEqualTo(Integer value) {
            addCriterion("is_common <>", value, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonGreaterThan(Integer value) {
            addCriterion("is_common >", value, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_common >=", value, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonLessThan(Integer value) {
            addCriterion("is_common <", value, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonLessThanOrEqualTo(Integer value) {
            addCriterion("is_common <=", value, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonIn(List<Integer> values) {
            addCriterion("is_common in", values, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonNotIn(List<Integer> values) {
            addCriterion("is_common not in", values, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonBetween(Integer value1, Integer value2) {
            addCriterion("is_common between", value1, value2, "isCommon");
            return (Criteria) this;
        }

        public Criteria andIsCommonNotBetween(Integer value1, Integer value2) {
            addCriterion("is_common not between", value1, value2, "isCommon");
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

        public Criteria andIsNpsEqualTo(Integer value) {
            addCriterion("is_nps =", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsNotEqualTo(Integer value) {
            addCriterion("is_nps <>", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsGreaterThan(Integer value) {
            addCriterion("is_nps >", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_nps >=", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsLessThan(Integer value) {
            addCriterion("is_nps <", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsLessThanOrEqualTo(Integer value) {
            addCriterion("is_nps <=", value, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsIn(List<Integer> values) {
            addCriterion("is_nps in", values, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsNotIn(List<Integer> values) {
            addCriterion("is_nps not in", values, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsBetween(Integer value1, Integer value2) {
            addCriterion("is_nps between", value1, value2, "isNps");
            return (Criteria) this;
        }

        public Criteria andIsNpsNotBetween(Integer value1, Integer value2) {
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

        public Criteria andIsSatisfiedEqualTo(Integer value) {
            addCriterion("is_satisfied =", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedNotEqualTo(Integer value) {
            addCriterion("is_satisfied <>", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedGreaterThan(Integer value) {
            addCriterion("is_satisfied >", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedGreaterThanOrEqualTo(Integer value) {
            addCriterion("is_satisfied >=", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedLessThan(Integer value) {
            addCriterion("is_satisfied <", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedLessThanOrEqualTo(Integer value) {
            addCriterion("is_satisfied <=", value, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedIn(List<Integer> values) {
            addCriterion("is_satisfied in", values, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedNotIn(List<Integer> values) {
            addCriterion("is_satisfied not in", values, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedBetween(Integer value1, Integer value2) {
            addCriterion("is_satisfied between", value1, value2, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andIsSatisfiedNotBetween(Integer value1, Integer value2) {
            addCriterion("is_satisfied not between", value1, value2, "isSatisfied");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutIsNull() {
            addCriterion("option_layout is null");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutIsNotNull() {
            addCriterion("option_layout is not null");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutEqualTo(Integer value) {
            addCriterion("option_layout =", value, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutNotEqualTo(Integer value) {
            addCriterion("option_layout <>", value, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutGreaterThan(Integer value) {
            addCriterion("option_layout >", value, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutGreaterThanOrEqualTo(Integer value) {
            addCriterion("option_layout >=", value, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutLessThan(Integer value) {
            addCriterion("option_layout <", value, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutLessThanOrEqualTo(Integer value) {
            addCriterion("option_layout <=", value, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutIn(List<Integer> values) {
            addCriterion("option_layout in", values, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutNotIn(List<Integer> values) {
            addCriterion("option_layout not in", values, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutBetween(Integer value1, Integer value2) {
            addCriterion("option_layout between", value1, value2, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andOptionLayoutNotBetween(Integer value1, Integer value2) {
            addCriterion("option_layout not between", value1, value2, "optionLayout");
            return (Criteria) this;
        }

        public Criteria andContentCheckIsNull() {
            addCriterion("content_check is null");
            return (Criteria) this;
        }

        public Criteria andContentCheckIsNotNull() {
            addCriterion("content_check is not null");
            return (Criteria) this;
        }

        public Criteria andContentCheckEqualTo(Integer value) {
            addCriterion("content_check =", value, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckNotEqualTo(Integer value) {
            addCriterion("content_check <>", value, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckGreaterThan(Integer value) {
            addCriterion("content_check >", value, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckGreaterThanOrEqualTo(Integer value) {
            addCriterion("content_check >=", value, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckLessThan(Integer value) {
            addCriterion("content_check <", value, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckLessThanOrEqualTo(Integer value) {
            addCriterion("content_check <=", value, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckIn(List<Integer> values) {
            addCriterion("content_check in", values, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckNotIn(List<Integer> values) {
            addCriterion("content_check not in", values, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckBetween(Integer value1, Integer value2) {
            addCriterion("content_check between", value1, value2, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andContentCheckNotBetween(Integer value1, Integer value2) {
            addCriterion("content_check not between", value1, value2, "contentCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckIsNull() {
            addCriterion("lenth_check is null");
            return (Criteria) this;
        }

        public Criteria andLenthCheckIsNotNull() {
            addCriterion("lenth_check is not null");
            return (Criteria) this;
        }

        public Criteria andLenthCheckEqualTo(Long value) {
            addCriterion("lenth_check =", value, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckNotEqualTo(Long value) {
            addCriterion("lenth_check <>", value, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckGreaterThan(Long value) {
            addCriterion("lenth_check >", value, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckGreaterThanOrEqualTo(Long value) {
            addCriterion("lenth_check >=", value, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckLessThan(Long value) {
            addCriterion("lenth_check <", value, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckLessThanOrEqualTo(Long value) {
            addCriterion("lenth_check <=", value, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckIn(List<Long> values) {
            addCriterion("lenth_check in", values, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckNotIn(List<Long> values) {
            addCriterion("lenth_check not in", values, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckBetween(Long value1, Long value2) {
            addCriterion("lenth_check between", value1, value2, "lenthCheck");
            return (Criteria) this;
        }

        public Criteria andLenthCheckNotBetween(Long value1, Long value2) {
            addCriterion("lenth_check not between", value1, value2, "lenthCheck");
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

        public Criteria andQuestionTagsIsNull() {
            addCriterion("question_tags is null");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsIsNotNull() {
            addCriterion("question_tags is not null");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsEqualTo(String value) {
            addCriterion("question_tags =", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsNotEqualTo(String value) {
            addCriterion("question_tags <>", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsGreaterThan(String value) {
            addCriterion("question_tags >", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsGreaterThanOrEqualTo(String value) {
            addCriterion("question_tags >=", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsLessThan(String value) {
            addCriterion("question_tags <", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsLessThanOrEqualTo(String value) {
            addCriterion("question_tags <=", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsLike(String value) {
            addCriterion("question_tags like", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsNotLike(String value) {
            addCriterion("question_tags not like", value, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsIn(List<String> values) {
            addCriterion("question_tags in", values, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsNotIn(List<String> values) {
            addCriterion("question_tags not in", values, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsBetween(String value1, String value2) {
            addCriterion("question_tags between", value1, value2, "questionTags");
            return (Criteria) this;
        }

        public Criteria andQuestionTagsNotBetween(String value1, String value2) {
            addCriterion("question_tags not between", value1, value2, "questionTags");
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