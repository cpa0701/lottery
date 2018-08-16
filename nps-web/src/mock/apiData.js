import Mock from 'mockjs'

const Random = Mock.Random;


let serialize = (str1) => {
    if (str1 === '') {
        return {}
    }
    //修复 jquery.serialize() 会把空格转成'+'的坑
    let str = str1.replace(/\+/g, " ");
    let obj = {};
    let params = str.split('&');
    for (let i = 0; i < params.length; i++) {
        let val = params[i].split("=");
        //多选的select，在jquery.serialize()的时候名称都是相同的，如右：rules=1&rules=3
        //这个时候需要把值以数组的形式保存，如右：rules：[1,3]
        if (obj[val[0]]) {
            let arr = [];
            Object.prototype.toString.call(obj[val[0]]) === "[object Array]" ? arr = arr.concat(obj[val[0]]) : arr.push(obj[val[0]]);
            arr.push(unescape(val[1]));
            obj[val[0]] = arr;
        } else {
            obj[val[0]] = unescape(val[1])
        }
    }
    return obj
};
Mock.setup({
    timeout: '1000'
});

//登录
Mock.mock('mock/test', {
    'usercode': '00000',
})
//菜单
Mock.mock('mock/menuInfoController/qryMenu', {
    'menuData': [
        {
            menuName: '首页',
            icon: 'home',
            menuUrl: '/',
            menuId: 1
        },
        {
            menuName: '调研问卷管理',
            icon: 'form',
            menuUrl: '/npsMgr',
            menuId: 2,
            children: [
                {
                    menuName: '题目管理',
                    menuUrl: '/npsMgr/questionLibMgr',
                    menuId: 21,
                },
                {
                    menuName: '问卷管理',
                    menuUrl: '/npsMgr/questionMgr',
                    menuId: 22,
                    children: [
                        {
                            menuName: '问卷申请',
                            menuUrl: '/npsMgr/questionMgr/questionApplication',
                            menuId: 221,
                        },
                        {
                            menuName: '问卷审核',
                            menuUrl: '/npsMgr/questionMgr/questionAudit',
                            menuId: 222,
                        },
                        {
                            menuName: '问卷库',
                            menuUrl: '/npsMgr/questionMgr/questionnaireLibrary',
                            menuId: 223,
                        }
                    ]
                }
            ],
        },
        {
            menuName: '调研任务管理',
            icon: 'table',
            menuUrl: 'list',
            menuId: 3,
            children: [
                {
                    menuName: '触发式调研任务申请',
                    menuUrl: 'table-list',
                    menuId: 31,
                },
                {
                    menuName: '调研任务申请',
                    menuUrl: 'basic-list',
                    menuId: 32,
                },
                {
                    menuName: '调研任务审核',
                    menuUrl: 'card-list',
                    menuId: 33,
                },
                {
                    menuName: '调研任务终止',
                    menuUrl: 'basic-list',
                    menuId: 34,
                },
                {
                    menuName: '周期性调研',
                    menuUrl: 'card-list',
                    menuId: 35,
                }
            ],
        },
        {
            menuName: '调研资源管理',
            icon: 'profile',
            menuUrl: 'profile',
            menuId: 4,
            children: [
                {
                    menuName: '调研资源规划',
                    menuUrl: 'basic',
                    menuId: 41,
                },
                {
                    menuName: '调研资源统计图',
                    menuUrl: 'advanced',
                    authority: 'admin',
                    menuId: 42,
                },
            ],
        },
        {
            menuName: '满意度运营分析',
            icon: 'check-circle-o',
            menuUrl: 'result',
            menuId: 5,
            children: [
                {
                    menuName: '调研结果分析',
                    menuUrl: 'success',
                    menuId: 51,
                }
            ]
        },
        {
            menuName: '客户忠诚度感知',
            icon: 'user',
            menuUrl: 'profile',
            menuId: 6,
            children: [
                {
                    menuName: '感知总视图',
                    menuUrl: 'basic',
                    menuId: 61,
                },
                {
                    menuName: '支局视图',
                    menuUrl: 'advanced',
                    authority: 'admin',
                    menuId: 62,
                },
                {
                    menuName: '用户视图',
                    menuUrl: 'basic',
                    menuId: 63,
                },
                {
                    menuName: '统计报表',
                    menuUrl: 'advanced',
                    authority: 'admin',
                    menuId: 64,
                },
            ],
        },
        {
            menuName: '系统管理',
            icon: 'setting',
            menuUrl: '/system',
            menuId: 7,
            children: [
                {
                    menuName: '部门人员管理',
                    menuUrl: '/system/dept',
                    menuId: 71,
                },
                {
                    menuName: '角色管理',
                    menuUrl: '/system/role',
                    menuId: 72,
                },
                {
                    menuName: '权限配置管理',
                    menuUrl: '/system/authority',
                    menuId: 73,
                },
                {
                    menuName: '区域管理',
                    menuUrl: '/system/domain',
                    menuId: 74,
                },
            ]
        }
    ],
})

//获取部门树
Mock.mock('mock/dept/getDeptTree', (params) => {
    let params1 = JSON.parse(params.body);
    if (!params1.rowId)
        return Mock.mock({
            'treeData|5': [{
                'rowId|+1': 1,
                'ideptId|+1': 12131,
                'iDeptLevel': '2',
                'sdeptName': '@cname',
                'iParentId': '0',
                'sdispName': '/常规/',
                'spathId': '/0/412530/',
                'idomainId|+1': 1010001,
                'sDomainName': '@cname',
                'iSortIndex': '1',
                'iDeptType|+1': 1,
                'childCount': '2'
            }]
        })
    else {
        return Mock.mock({
            'treeData|2': [{
                'rowId|+1': params1.rowId * 10 + 1,
                'ideptId|+1': params1.ideptId * 10 + 1,
                'iDeptLevel': params1.iDeptLevel + 1,
                'sdeptName': '@cname',
                'iParentId': params1.rowId,
                'sdispName': '/常规/',
                'spathId': '/0/412530/',
                'idomainId|+1': params1.idomainId * 10 + 1,
                'sDomainName': '@cname',
                'iSortIndex': '1',
                'iDeptType|+1': 1,
                'childCount': '@integer(0,10)'
            }]
        })
    }
})
//获取所有权限树
Mock.mock('mock/dept/getAllAuthorityData', (params) => {
    return Mock.mock({
        'treeData|10': [{
            'rowId|+1': 1,
            'ideptId|+1': 12131,
            'iDeptLevel': '2',
            'sdeptName': '@cname',
            'iParentId': '0',
            'sdispName': '/常规/',
            'spathId': '/0/412530/',
            'idomainId|+1': 1010001,
            'sDomainName': '@cname',
            'iSortIndex': '1',
            'iDeptType|+1': 1,
            'childCount': '2'
        }]
    })
})
//判断部门唯一性
Mock.mock('mock/dept/checkDeptName', () => {
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//新增部门
Mock.mock('mock/dept/addDept', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//删除角色
Mock.mock('mock/dept/dleRole', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//删除部门
Mock.mock('mock/dept/dleDept', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//编辑部门
Mock.mock('mock/dept/ediDept', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//编辑部门
Mock.mock('mock/dept/editAuthority', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//新增角色
Mock.mock('mock/dept/addRole', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})

//获取人员信息
Mock.mock('mock/dept/getStaffData', (params) => {
    let params1 = JSON.parse(params.body);
    return Mock.mock({
        'dataList|10': [
            {
                "account": "@integer(100000,200000)",
                "cellphone": /^((13[0-9])|(15([0-3]|[5-9]))|(18[0,5-9]))-\d{4}-\d{4}$/,
                "createdAt": "@date",
                "createdBy": "@cname",
                "deptId": '@integer(1,9999999)',
                "email": "@email",
                "id": '@integer(1,9999999)',
                "identityCard": /\d{18}/,
                "modifiedAt": "@date",
                "modifiedBy": "@cname",
                "name": "@cname",
                "no": /\d{8}/,
                "password": "@integer(1,9999999)",
                "remark": "@cparagraph",
                "sex|1": ['M', 'F'],
                "state|1": [0, 1, 2]
            }
        ],
        'pageInfo': {
            'totalRow': '@integer(1,500)',
            'pageNum': 10,
            'pageIndex': params1.pageInfo.pageIndex
        }
    })
})
//新增人员
Mock.mock('mock/dept/addStaff', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//删除人员
Mock.mock('mock/dept/dleStaff', (params) => {
    let params1 = JSON.parse(params.body);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//编辑人员
Mock.mock('mock/dept/ediStaff', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})
//更改部门
Mock.mock('mock/dept/changeDept', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
})

//获取部门页面角色树
Mock.mock('mock/dept/getRoleTree', (params) => {
    let params1 = JSON.parse(params.body);
    if (!params1.rowId)
        return Mock.mock({
            'treeData|5': [{
                'rowId|+1': 1,
                'ideptId|+1': 12131,
                'iDeptLevel': '2',
                'sdeptName': '@cname',
                'iParentId': '0',
                'sdispName': '/常规/',
                'spathId': '/0/412530/',
                'idomainId|+1': 1010001,
                'sDomainName': '@cname',
                'iSortIndex': '1',
                'iDeptType|+1': 1,
                'childCount': '2'
            }]
        })
    else {
        return Mock.mock({
            'treeData|2': [{
                'rowId|+1': params1.rowId * 10 + 1,
                'ideptId|+1': params1.rowId * 10 + 1,
                'iDeptLevel': params1.iDeptLevel + 1,
                'sdeptName': '@cname',
                'iParentId': params1.rowId,
                'sdispName': '/常规/',
                'spathId': '/0/412530/',
                'idomainId|+1': params1.idomainId * 10 + 1,
                'sDomainName': '@cname',
                'iSortIndex': '1',
                'iDeptType|+1': 1,
                'childCount': '@integer(0,10)'
            }]
        })
    }
})
//获取部门页面权限树
Mock.mock('mock/dept/getAuthorityTree', (params) => {
    let params1 = JSON.parse(params.body);
    if (!params1.rowId)
        return Mock.mock({
            'treeData|5': [{
                'rowId|+1': 1,
                'ideptId|+1': 12131,
                'iDeptLevel': '2',
                'sdeptName': '@cname',
                'iParentId': '0',
                'sdispName': '/常规/',
                'spathId': '/0/412530/',
                'idomainId|+1': 1010001,
                'sDomainName': '@cname',
                'iSortIndex': '1',
                'iDeptType|+1': 1,
                'childCount': '2'
            }]
        })
    else {
        return Mock.mock({
            'treeData|2': [{
                'rowId|+1': params1.rowId * 100 + 1,
                'ideptId|+1': params1.rowId * 10 + 1,
                'iDeptLevel': params1.iDeptLevel + 1,
                'sdeptName': '@cname',
                'iParentId': params1.rowId,
                'sdispName': '/常规/',
                'spathId': '/0/412530/',
                'idomainId|+1': params1.idomainId * 10 + 1,
                'sDomainName': '@cname',
                'iSortIndex': '1',
                'iDeptType|+1': 1,
                'childCount': '@integer(0,10)'
            }]
        })
    }
})

//获取角色树
Mock.mock('mock/system/rolesController/qryRolesTree', {
    "treeData": [
        {
            name: '角色树',
            key: '0',
            isParent: false,
            children: [
                {
                    name: '系统管理员',
                    key: '1.1',
                    isParent: true,
                    parentId: '0',
                    children: [
                        {
                            name: '角色A',
                            key: '1.1.1',
                            isParent: true,
                            parentId: '1.1',
                        },
                        {
                            name: '角色B',
                            key: '1.1.2',
                            isParent: true,
                            parentId: '1.1',
                        }
                    ]
                },
                {
                    name: '业务员',
                    key: '1.2',
                    isParent: true,
                    parentId: '0',
                    children: [
                        {
                            name: '角色C',
                            key: '1.2.1',
                            isParent: true,
                            parentId: '1.2',
                        },
                        {
                            name: '角色D',
                            key: '1.2.2',
                            isParent: true,
                            parentId: '1.2',
                        }
                    ]
                },
            ]
        }
    ]
})
//区域管理
Mock.mock("mock/SystemController/doMain", {
    "domainData": [
        {
            key: 1,
            name: '区域树',
            type: '省',
            id: '',
            No: '1',
            'children': [{
                key: 11,
                name: '集团',
                'type|1': [1, 2, 3],
                'id|1': [1, 2, 3],
                No: '2',
                'children|3': [
                    {
                        key: "@natural(1,10000)",
                        name: '@cname',
                        'type|1': [1, 2, 3],
                        'id|1': [1, 2, 3],
                        No: "@natural(1,10000)",
                    }],
            }]
        }, {
            key: 12,
            name: '重保域',
            type: '本地网',
            id: 'ZB',
            No: '5'
        }],

})
//获取用户表数据
Mock.mock('mock/system/rolesController/getUserDate', {
    "userData": [
        {
            id: 1,
            userName: '张三',
            deptName: '综合管理',
            create: '人事1'
        },
        {
            id: 2,
            userName: '李四',
            deptName: '研发部',
            create: '人事2'
        },
        {
            id: 3,
            userName: '王五',
            deptName: '财务',
            create: '人事1'
        }
    ]
})
//权限配置管理
Mock.mock("mock/systemController/Authority", {
    "authorityData": [
        {
            key: 0,
            name: '权限树',
            url: '',
            icon: 'qwerer',
            describe: '权限树',
            No: 1,
            type: '菜单',
            area: '全局',
            activate: '是',
            sensitive: '',
            'children|7': [
                {
                    key: "@natural(1,10000)",
                    name: '@cname',
                    url: '@url',
                    icon: '@cname',
                    describe: '@cword(5)',
                    No: "@natural(1,10000)",
                    'type|1': ['菜单', '其他'],
                    'area|1': ['全局', '信管系统', '重保', '统计分析'],
                    'activate|1': ['是', '否'],
                    sensitive: '',
                    'children|2': [
                        {
                            key: "@natural(1,10000)",
                            name: '@cname',
                            url: '@url',
                            icon: '@cname',
                            describe: '@cword(5)',
                            No: "@natural(1,10000)",
                            'type|1': ['菜单', '其他'],
                            'area|1': ['全局', '信管系统', '重保', '统计分析'],
                            'activate|1': ['是', '否'],
                            sensitive: '',
                        }
                    ]
                }
            ]
        },
    ]
})

// 新增题目
Mock.mock('mock/questionMgr/addQuestion', (params) => {
    let param = JSON.parse(params.body);
    console.log('新增题目测试', param);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
});
// 获取题库
Mock.mock('mock/questionMgr/getQuestionLIst', (params) => {
    let param = params.body ? JSON.parse(params.body) : "";
    console.log(params);
    let pageNum = param ? param.pageNum : 1;
    return Mock.mock({
        result: {
            'list|10': [{
                title: '@csentence',
                'id|+1': 1,
                'type|1': ['radio', 'checkbox', 'blank']
            }],
            pageNum: pageNum,
            total: '@integer(10,50)',
        }
    })
})

// 获取问卷内容
Mock.mock('mock/questionPreview/getQuestionLIst', (params) => {
    Random.extend({
        constellation: (questionId) => {
            let setupQuestionId = Math.floor(questionId - questionId * Math.random());
            let skiptoQuestionId = Math.floor(questionId + (100 - questionId) * Math.random());
            setupQuestionId = setupQuestionId ? setupQuestionId : '';
            skiptoQuestionId = skiptoQuestionId === questionId ? '' : skiptoQuestionId;
            return Mock.mock({
                'optionName': '@cname',
                'optionId': '@integer(1,9999)',
                'optionOrder': '@integer(1,9999)',
                'setupQuestionId|1': [setupQuestionId, ''],
                'skiptoQuestionId|1': [skiptoQuestionId, '']
            })
        },
        repeat: (questionId) => {
            let count = Math.floor(Math.random() * 6 + 2);
            let list = [];
            for (let i = 0; i < count; i++) {
                let optionId = questionId * 10 + i;
                list.push(Mock.mock('@constellation(' + questionId + ')'))
            }
            return list
        },
        isSetup: (options) => {
            let result = false;
            result = options.some(item => {
                if (item.setupQuestionId)
                    return true
            })
            return result
        }

    })
    return Mock.mock({
        // 'id': "@integer(10000,99999)",
        // naireCatagory: "203",
        // qstnaireBelong: "2",
        // qstnaireChannel: "1",
        // qstnaireLeadin: "请输入欢迎语",
        // qstnaireTitle: "测试逻辑fxm",
        // 'logic': [
        //     {
        //         actType: "01",
        //         logicType:'00',
        //         group: [{
        //             actType: "01",
        //             isMain: "",
        //             logicGroup: "5#1#10#XX5jtN06ub",
        //             optionOrder: "2",
        //             qstnaireId: "13764",
        //             setupQuestionOrder: "2",
        //             skiptoQuestionOrder: ""
        //         }],
        //         isMain: "1",
        //         logicGroup: "5#1#10#XX5jtN06ub",
        //         optionOrder: "1",
        //         qstnaireId: "13764",
        //         setupQuestionOrder: "5",
        //         skiptoQuestionOrder: "10",
        //     },
        //     {
        //         actType: "01",
        //         logicType:'00',
        //         group: [{
        //             actType: "01",
        //             isMain: "",
        //             logicGroup: "5#2#11#mpa483CfFB",
        //             optionOrder: "2",
        //             qstnaireId: "13764",
        //             setupQuestionOrder: "2",
        //             skiptoQuestionOrder: ""
        //         }],
        //         isMain: "1",
        //         logicGroup: "5#2#11#mpa483CfFB",
        //         optionOrder: "2",
        //         qstnaireId: "13764",
        //         setupQuestionOrder: "5",
        //         skiptoQuestionOrder: "11"
        //     }
        // ],
        // question: [
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         "choice": ["男性", "女性"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-07-31 02:22:03.0",
        //         createUid: "566",
        //         id: 9323571,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q1",
        //         questionCategory: "20101",
        //         questionId: "5053",
        //         questionName: "您的性别是？",
        //         questionOrder: "1",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "您的性别是？",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["0-6分", "7-8分", "9-10分"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-07-31 02:20:11.0",
        //         createUid: "566",
        //         id: 2472871,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "1",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q2",
        //         questionCategory: "20101",
        //         questionId: "5052",
        //         questionName: "（复制）请用0到10分来评价中国电信重庆客服”微信公众号、“电信营业厅”APP等线上自助服务渠道使用感知？（0分非常不满意，10分非常满意。）",
        //         questionOrder: "2",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "（复制）请用0到10分来评价中国电信重庆客服”微信公众号、“电信营业厅”APP等线上自助服务渠道使用感知？（0分非常不满意，10分非常满意。）",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["0-6分", "7-8分", "9-10分"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-07-30 12:27:31.0",
        //         createUid: "566",
        //         id: 3085924,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "1",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q3",
        //         questionCategory: "20101",
        //         questionId: "5047",
        //         questionName: "请用0到10分来评价中国电信重庆客服”微信公众号、“电信营业厅”APP等线上自助服务渠道使用感知？（0分非常不满意，10分非常满意。）",
        //         questionOrder: "3",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请用0到10分来评价中国电信重庆客服”微信公众号、“电信营业厅”APP等线上自助服务渠道使用感知？（0分非常不满意，10分非常满意。）",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2", "答案3"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-09 05:56:07.0",
        //         createUid: "566",
        //         id: 8924046,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q4",
        //         questionCategory: "20101",
        //         questionId: "5827",
        //         questionName: "【复制】请输入题目",
        //         questionOrder: "4",
        //         questionTags: "",
        //         questionType: "02",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "【复制】请输入题目",
        //         type: "checkbox"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2", "答案3"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-01 11:58:42.0",
        //         createUid: "566",
        //         id: 2584835,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q5",
        //         questionCategory: "20101",
        //         questionId: "5063",
        //         questionName: "请输入题目",
        //         questionOrder: "5",
        //         questionTags: "",
        //         questionType: "02",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "checkbox"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["0-6分", "7-8分", "9-10分"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-07-30 12:27:31.0",
        //         createUid: "566",
        //         id: 4194045,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "1",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q6",
        //         questionCategory: "20101",
        //         questionId: "5048",
        //         questionName: "请问您愿不愿意向您的亲朋好友推荐中国电信宽带产品及服务？（请用0到10分来评价，0分非常不愿意，10分非常愿意。）",
        //         questionOrder: "6",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请问您愿不愿意向您的亲朋好友推荐中国电信宽带产品及服务？（请用0到10分来评价，0分非常不愿意，10分非常愿意。）",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-02 02:40:51.0",
        //         createUid: "566",
        //         id: 5455552,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q7",
        //         questionCategory: "20101",
        //         questionId: "5065",
        //         questionName: "请输入题目",
        //         questionOrder: "7",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-02 02:40:51.0",
        //         createUid: "566",
        //         id: 5250947,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q8",
        //         questionCategory: "20101",
        //         questionId: "5066",
        //         questionName: "请输入题目",
        //         questionOrder: "8",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-02 02:40:51.0",
        //         createUid: "566",
        //         id: 9223502,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q9",
        //         questionCategory: "20101",
        //         questionId: "5067",
        //         questionName: "请输入题目",
        //         questionOrder: "9",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-02 02:40:51.0",
        //         createUid: "566",
        //         id: 1881053,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q10",
        //         questionCategory: "20101",
        //         questionId: "5068",
        //         questionName: "请输入题目",
        //         questionOrder: "10",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-02 02:40:51.0",
        //         createUid: "566",
        //         id: 4808253,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q11",
        //         questionCategory: "20101",
        //         questionId: "5064",
        //         questionName: "请输入题目",
        //         questionOrder: "11",
        //         questionTags: "",
        //         questionType: "02",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "checkbox"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-03 01:25:59.0",
        //         createUid: "566",
        //         id: 3749837,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q12",
        //         questionCategory: "20101",
        //         questionId: "5069",
        //         questionName: "请输入题目",
        //         questionOrder: "12",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-03 01:25:59.0",
        //         createUid: "566",
        //         id: 3073842,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q13",
        //         questionCategory: "20101",
        //         questionId: "5070",
        //         questionName: "请输入题目",
        //         questionOrder: "13",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     },
        //     {
        //         autoCommit: true,
        //         cTools: true,
        //         choice: ["答案1", "答案2"],
        //         className: "question",
        //         contentCheck: "0",
        //         createTime: "2018-08-03 01:25:59.0",
        //         createUid: "566",
        //         id: 6784152,
        //         isBlank: "0",
        //         isCommon: "0",
        //         isExtquestion: 0,
        //         isNps: "0",
        //         isPaging: "0",
        //         isSatisfied: "0",
        //         lenthCheck: "0",
        //         optionLayout: "1",
        //         order: 999,
        //         qTools: true,
        //         qname: "Q14",
        //         questionCategory: "20101",
        //         questionId: "5071",
        //         questionName: "请输入题目",
        //         questionOrder: "14",
        //         questionTags: "",
        //         questionType: "01",
        //         showIsBlank: true,
        //         status: "01",
        //         subtext: "",
        //         text: "请输入题目",
        //         type: "radio"
        //     }
        // ],
        // sortListId: "questionList",
        // title: {text: "测试逻辑fxm", subtext: "请输入欢迎语"}
        'qstnaireTitle': '@csentence',
        'list|100': [{
            'questionName': '@csentence',
            'id|+1': 1,
            'type|1': ['radio', 'checkbox', 'blank'],
            'optionList': '@repeat(@questionId)',
            'isSetup': '@isSetup(@optionList)'
        }]
    })
})

//获取问卷列表
Mock.mock('mock/questionMgr/getQuestionnaireList', (params) => {
    let param = params.body ? JSON.parse(params.body) : "";
    let pageNum = param ? param.pageNum : 1;
    return Mock.mock({
        'list|10': [{
            qstnaireTitle: '@csentence',
            catalogId: '@integer(1,6)',
            channelId: '@integer(1,6)',
            'qstnaireId|+1': 1,
            'status|1': ['草稿', '审核', '发布'],
            createTime: '@datetime',
            createUid: '@cname',
        }],
        pageNum: pageNum,
        total: '@integer(10,50)'
    })
})