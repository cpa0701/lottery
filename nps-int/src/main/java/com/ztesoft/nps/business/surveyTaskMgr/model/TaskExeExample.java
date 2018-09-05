package com.ztesoft.nps.business.surveyTaskMgr.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TaskExeExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public TaskExeExample() {
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

        public Criteria andSerialIdIsNull() {
            addCriterion("serial_id is null");
            return (Criteria) this;
        }

        public Criteria andSerialIdIsNotNull() {
            addCriterion("serial_id is not null");
            return (Criteria) this;
        }

        public Criteria andSerialIdEqualTo(String value) {
            addCriterion("serial_id =", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdNotEqualTo(String value) {
            addCriterion("serial_id <>", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdGreaterThan(String value) {
            addCriterion("serial_id >", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdGreaterThanOrEqualTo(String value) {
            addCriterion("serial_id >=", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdLessThan(String value) {
            addCriterion("serial_id <", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdLessThanOrEqualTo(String value) {
            addCriterion("serial_id <=", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdLike(String value) {
            addCriterion("serial_id like", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdNotLike(String value) {
            addCriterion("serial_id not like", value, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdIn(List<String> values) {
            addCriterion("serial_id in", values, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdNotIn(List<String> values) {
            addCriterion("serial_id not in", values, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdBetween(String value1, String value2) {
            addCriterion("serial_id between", value1, value2, "serialId");
            return (Criteria) this;
        }

        public Criteria andSerialIdNotBetween(String value1, String value2) {
            addCriterion("serial_id not between", value1, value2, "serialId");
            return (Criteria) this;
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

        public Criteria andChannelTypeIsNull() {
            addCriterion("channel_type is null");
            return (Criteria) this;
        }

        public Criteria andChannelTypeIsNotNull() {
            addCriterion("channel_type is not null");
            return (Criteria) this;
        }

        public Criteria andChannelTypeEqualTo(Short value) {
            addCriterion("channel_type =", value, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeNotEqualTo(Short value) {
            addCriterion("channel_type <>", value, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeGreaterThan(Short value) {
            addCriterion("channel_type >", value, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeGreaterThanOrEqualTo(Short value) {
            addCriterion("channel_type >=", value, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeLessThan(Short value) {
            addCriterion("channel_type <", value, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeLessThanOrEqualTo(Short value) {
            addCriterion("channel_type <=", value, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeIn(List<Short> values) {
            addCriterion("channel_type in", values, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeNotIn(List<Short> values) {
            addCriterion("channel_type not in", values, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeBetween(Short value1, Short value2) {
            addCriterion("channel_type between", value1, value2, "channelType");
            return (Criteria) this;
        }

        public Criteria andChannelTypeNotBetween(Short value1, Short value2) {
            addCriterion("channel_type not between", value1, value2, "channelType");
            return (Criteria) this;
        }

        public Criteria andSendUserIsNull() {
            addCriterion("send_user is null");
            return (Criteria) this;
        }

        public Criteria andSendUserIsNotNull() {
            addCriterion("send_user is not null");
            return (Criteria) this;
        }

        public Criteria andSendUserEqualTo(String value) {
            addCriterion("send_user =", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserNotEqualTo(String value) {
            addCriterion("send_user <>", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserGreaterThan(String value) {
            addCriterion("send_user >", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserGreaterThanOrEqualTo(String value) {
            addCriterion("send_user >=", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserLessThan(String value) {
            addCriterion("send_user <", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserLessThanOrEqualTo(String value) {
            addCriterion("send_user <=", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserLike(String value) {
            addCriterion("send_user like", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserNotLike(String value) {
            addCriterion("send_user not like", value, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserIn(List<String> values) {
            addCriterion("send_user in", values, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserNotIn(List<String> values) {
            addCriterion("send_user not in", values, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserBetween(String value1, String value2) {
            addCriterion("send_user between", value1, value2, "sendUser");
            return (Criteria) this;
        }

        public Criteria andSendUserNotBetween(String value1, String value2) {
            addCriterion("send_user not between", value1, value2, "sendUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserIsNull() {
            addCriterion("target_user is null");
            return (Criteria) this;
        }

        public Criteria andTargetUserIsNotNull() {
            addCriterion("target_user is not null");
            return (Criteria) this;
        }

        public Criteria andTargetUserEqualTo(String value) {
            addCriterion("target_user =", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserNotEqualTo(String value) {
            addCriterion("target_user <>", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserGreaterThan(String value) {
            addCriterion("target_user >", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserGreaterThanOrEqualTo(String value) {
            addCriterion("target_user >=", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserLessThan(String value) {
            addCriterion("target_user <", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserLessThanOrEqualTo(String value) {
            addCriterion("target_user <=", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserLike(String value) {
            addCriterion("target_user like", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserNotLike(String value) {
            addCriterion("target_user not like", value, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserIn(List<String> values) {
            addCriterion("target_user in", values, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserNotIn(List<String> values) {
            addCriterion("target_user not in", values, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserBetween(String value1, String value2) {
            addCriterion("target_user between", value1, value2, "targetUser");
            return (Criteria) this;
        }

        public Criteria andTargetUserNotBetween(String value1, String value2) {
            addCriterion("target_user not between", value1, value2, "targetUser");
            return (Criteria) this;
        }

        public Criteria andIsTestIsNull() {
            addCriterion("is_test is null");
            return (Criteria) this;
        }

        public Criteria andIsTestIsNotNull() {
            addCriterion("is_test is not null");
            return (Criteria) this;
        }

        public Criteria andIsTestEqualTo(Short value) {
            addCriterion("is_test =", value, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestNotEqualTo(Short value) {
            addCriterion("is_test <>", value, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestGreaterThan(Short value) {
            addCriterion("is_test >", value, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestGreaterThanOrEqualTo(Short value) {
            addCriterion("is_test >=", value, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestLessThan(Short value) {
            addCriterion("is_test <", value, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestLessThanOrEqualTo(Short value) {
            addCriterion("is_test <=", value, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestIn(List<Short> values) {
            addCriterion("is_test in", values, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestNotIn(List<Short> values) {
            addCriterion("is_test not in", values, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestBetween(Short value1, Short value2) {
            addCriterion("is_test between", value1, value2, "isTest");
            return (Criteria) this;
        }

        public Criteria andIsTestNotBetween(Short value1, Short value2) {
            addCriterion("is_test not between", value1, value2, "isTest");
            return (Criteria) this;
        }

        public Criteria andSmContentIsNull() {
            addCriterion("sm_content is null");
            return (Criteria) this;
        }

        public Criteria andSmContentIsNotNull() {
            addCriterion("sm_content is not null");
            return (Criteria) this;
        }

        public Criteria andSmContentEqualTo(String value) {
            addCriterion("sm_content =", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentNotEqualTo(String value) {
            addCriterion("sm_content <>", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentGreaterThan(String value) {
            addCriterion("sm_content >", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentGreaterThanOrEqualTo(String value) {
            addCriterion("sm_content >=", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentLessThan(String value) {
            addCriterion("sm_content <", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentLessThanOrEqualTo(String value) {
            addCriterion("sm_content <=", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentLike(String value) {
            addCriterion("sm_content like", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentNotLike(String value) {
            addCriterion("sm_content not like", value, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentIn(List<String> values) {
            addCriterion("sm_content in", values, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentNotIn(List<String> values) {
            addCriterion("sm_content not in", values, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentBetween(String value1, String value2) {
            addCriterion("sm_content between", value1, value2, "smContent");
            return (Criteria) this;
        }

        public Criteria andSmContentNotBetween(String value1, String value2) {
            addCriterion("sm_content not between", value1, value2, "smContent");
            return (Criteria) this;
        }

        public Criteria andCreatTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreatTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreatTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeLessThan(Date value) {
            addCriterion("create_time <", value, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "creatTime");
            return (Criteria) this;
        }

        public Criteria andCreatTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "creatTime");
            return (Criteria) this;
        }

        public Criteria andBaseUrlIsNull() {
            addCriterion("base_url is null");
            return (Criteria) this;
        }

        public Criteria andBaseUrlIsNotNull() {
            addCriterion("base_url is not null");
            return (Criteria) this;
        }

        public Criteria andBaseUrlEqualTo(String value) {
            addCriterion("base_url =", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlNotEqualTo(String value) {
            addCriterion("base_url <>", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlGreaterThan(String value) {
            addCriterion("base_url >", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlGreaterThanOrEqualTo(String value) {
            addCriterion("base_url >=", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlLessThan(String value) {
            addCriterion("base_url <", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlLessThanOrEqualTo(String value) {
            addCriterion("base_url <=", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlLike(String value) {
            addCriterion("base_url like", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlNotLike(String value) {
            addCriterion("base_url not like", value, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlIn(List<String> values) {
            addCriterion("base_url in", values, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlNotIn(List<String> values) {
            addCriterion("base_url not in", values, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlBetween(String value1, String value2) {
            addCriterion("base_url between", value1, value2, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andBaseUrlNotBetween(String value1, String value2) {
            addCriterion("base_url not between", value1, value2, "baseUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlIsNull() {
            addCriterion("short_url is null");
            return (Criteria) this;
        }

        public Criteria andShortUrlIsNotNull() {
            addCriterion("short_url is not null");
            return (Criteria) this;
        }

        public Criteria andShortUrlEqualTo(String value) {
            addCriterion("short_url =", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlNotEqualTo(String value) {
            addCriterion("short_url <>", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlGreaterThan(String value) {
            addCriterion("short_url >", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlGreaterThanOrEqualTo(String value) {
            addCriterion("short_url >=", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlLessThan(String value) {
            addCriterion("short_url <", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlLessThanOrEqualTo(String value) {
            addCriterion("short_url <=", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlLike(String value) {
            addCriterion("short_url like", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlNotLike(String value) {
            addCriterion("short_url not like", value, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlIn(List<String> values) {
            addCriterion("short_url in", values, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlNotIn(List<String> values) {
            addCriterion("short_url not in", values, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlBetween(String value1, String value2) {
            addCriterion("short_url between", value1, value2, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andShortUrlNotBetween(String value1, String value2) {
            addCriterion("short_url not between", value1, value2, "shortUrl");
            return (Criteria) this;
        }

        public Criteria andIsExeIsNull() {
            addCriterion("is_exe is null");
            return (Criteria) this;
        }

        public Criteria andIsExeIsNotNull() {
            addCriterion("is_exe is not null");
            return (Criteria) this;
        }

        public Criteria andIsExeEqualTo(Short value) {
            addCriterion("is_exe =", value, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeNotEqualTo(Short value) {
            addCriterion("is_exe <>", value, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeGreaterThan(Short value) {
            addCriterion("is_exe >", value, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeGreaterThanOrEqualTo(Short value) {
            addCriterion("is_exe >=", value, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeLessThan(Short value) {
            addCriterion("is_exe <", value, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeLessThanOrEqualTo(Short value) {
            addCriterion("is_exe <=", value, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeIn(List<Short> values) {
            addCriterion("is_exe in", values, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeNotIn(List<Short> values) {
            addCriterion("is_exe not in", values, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeBetween(Short value1, Short value2) {
            addCriterion("is_exe between", value1, value2, "isExe");
            return (Criteria) this;
        }

        public Criteria andIsExeNotBetween(Short value1, Short value2) {
            addCriterion("is_exe not between", value1, value2, "isExe");
            return (Criteria) this;
        }

        public Criteria andExeTimeIsNull() {
            addCriterion("exe_time is null");
            return (Criteria) this;
        }

        public Criteria andExeTimeIsNotNull() {
            addCriterion("exe_time is not null");
            return (Criteria) this;
        }

        public Criteria andExeTimeEqualTo(Date value) {
            addCriterion("exe_time =", value, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeNotEqualTo(Date value) {
            addCriterion("exe_time <>", value, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeGreaterThan(Date value) {
            addCriterion("exe_time >", value, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("exe_time >=", value, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeLessThan(Date value) {
            addCriterion("exe_time <", value, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeLessThanOrEqualTo(Date value) {
            addCriterion("exe_time <=", value, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeIn(List<Date> values) {
            addCriterion("exe_time in", values, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeNotIn(List<Date> values) {
            addCriterion("exe_time not in", values, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeBetween(Date value1, Date value2) {
            addCriterion("exe_time between", value1, value2, "exeTime");
            return (Criteria) this;
        }

        public Criteria andExeTimeNotBetween(Date value1, Date value2) {
            addCriterion("exe_time not between", value1, value2, "exeTime");
            return (Criteria) this;
        }

        public Criteria andTestUidIsNull() {
            addCriterion("test_uid is null");
            return (Criteria) this;
        }

        public Criteria andTestUidIsNotNull() {
            addCriterion("test_uid is not null");
            return (Criteria) this;
        }

        public Criteria andTestUidEqualTo(String value) {
            addCriterion("test_uid =", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidNotEqualTo(String value) {
            addCriterion("test_uid <>", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidGreaterThan(String value) {
            addCriterion("test_uid >", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidGreaterThanOrEqualTo(String value) {
            addCriterion("test_uid >=", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidLessThan(String value) {
            addCriterion("test_uid <", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidLessThanOrEqualTo(String value) {
            addCriterion("test_uid <=", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidLike(String value) {
            addCriterion("test_uid like", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidNotLike(String value) {
            addCriterion("test_uid not like", value, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidIn(List<String> values) {
            addCriterion("test_uid in", values, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidNotIn(List<String> values) {
            addCriterion("test_uid not in", values, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidBetween(String value1, String value2) {
            addCriterion("test_uid between", value1, value2, "testUid");
            return (Criteria) this;
        }

        public Criteria andTestUidNotBetween(String value1, String value2) {
            addCriterion("test_uid not between", value1, value2, "testUid");
            return (Criteria) this;
        }

        public Criteria andUrlFlagIsNull() {
            addCriterion("url_flag is null");
            return (Criteria) this;
        }

        public Criteria andUrlFlagIsNotNull() {
            addCriterion("url_flag is not null");
            return (Criteria) this;
        }

        public Criteria andUrlFlagEqualTo(Short value) {
            addCriterion("url_flag =", value, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagNotEqualTo(Short value) {
            addCriterion("url_flag <>", value, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagGreaterThan(Short value) {
            addCriterion("url_flag >", value, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagGreaterThanOrEqualTo(Short value) {
            addCriterion("url_flag >=", value, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagLessThan(Short value) {
            addCriterion("url_flag <", value, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagLessThanOrEqualTo(Short value) {
            addCriterion("url_flag <=", value, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagIn(List<Short> values) {
            addCriterion("url_flag in", values, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagNotIn(List<Short> values) {
            addCriterion("url_flag not in", values, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagBetween(Short value1, Short value2) {
            addCriterion("url_flag between", value1, value2, "urlFlag");
            return (Criteria) this;
        }

        public Criteria andUrlFlagNotBetween(Short value1, Short value2) {
            addCriterion("url_flag not between", value1, value2, "urlFlag");
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