import Mock from 'mockjs'
import MissionTermination from "../admin/missionMgr/missionTermination/MissionTermination";

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
            icon: 'bulb',
            menuUrl: '/missionMgr',
            menuId: 3,
            children: [
                {
                    menuName: '调研任务申请',
                    menuUrl: '/missionMgr/missionApplication',
                    menuId: 32,
                },
                {
                    menuName: '调研任务审核',
                    menuUrl: '/missionMgr/reviewApplication',
                    menuId: 33,
                },
                {
                    menuName: '调研任务终止',
                    menuUrl: '/missionMgr/missionTermination',
                    menuId: 34,
                },
                // {
                //     menuName: '周期性调研',
                //     menuUrl: '/missionMgr/missionPeriodic',
                //     menuId: 35,
                // }
            ],
        },
        // {
        //     menuName: '调研资源管理',
        //     icon: 'profile',
        //     menuUrl: '/resourceMgr',
        //     menuId: 4,
        //     children: [
        //         {
        //             menuName: '调研资源规划',
        //             menuUrl: 'basic',
        //             menuId: 41,
        //         },
        //         {
        //             menuName: '调研资源统计图',
        //             menuUrl: '/resourceMgr/resourceMap',
        //             authority: 'admin',
        //             menuId: 42,
        //         },
        //     ],
        // },
        {
            menuName: '满意度运营分析',
            icon: 'check-circle-o',
            menuUrl: '/satisfactionOperation',
            menuId: 5,
            children: [
                {
                    menuName: '调研结果分析',
                    menuUrl: '/satisfactionOperation/analysisResult',
                    menuId: 51,
                }
            ]
        },
        {
            menuName: '客户忠诚度感知',
            icon: 'user',
            menuUrl: '/customerPerception',
            menuId: 6,
            children: [
                {
                    menuName: '感知总视图',
                    menuUrl: '/customerPerception/perceptionView',
                    menuId: 61,
                },
                {
                    menuName: '支局视图',
                    menuUrl: '/customerPerception/brandView',
                    authority: 'admin',
                    menuId: 62,
                },
                {
                    menuName: '用户视图',
                    menuUrl: '/customerPerception/useView',
                    menuId: 63,
                },
                {
                    menuName: '统计报表',
                    menuUrl: '/customerPerception/statisticReport',
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
            'list|10': [
                {
                    questionName: '@csentence',
                    questionName2: '', // 题目提示描述
                    'questionId|+1': 1,
                    'questionOrder|+1': 1,
                    'questionType|1': ['01', '02', '03', '04'],
                    questionCategory: '@csentence', // 题目分类
                    status: 1, // 默认1
                    'optionList|3': [
                        {
                            'optionOrder|+1': 1,
                            optionName: '@cname',
                        }],
                    optionLayout: 0, // 默认0
                    lenthCheck: 0, // 默认0
                    isNps: 0, // 默认0 nps
                    isSatisfied: 0, // 默认0 满意度
                    contentCheck: 0 // 默认0 内容限制
                }
            ],
            pageNum: pageNum,
            total: '@integer(10,50)',
        }
    })
});

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
// 获取问卷预览内容
Mock.mock('mock/questionPreview/getPreviewLIst', (params) => {
    return Mock.mock({
        "belongTo": 2,
        "catalogId": 201,
        "logic": [
            {
                "actType": 0,
                "andOr": 0,
                "isMain": 0,
                "logicType": "01",
                "optionOrder": "1",
                "setupQuestionOrder": 1,
                "skiptoQuestionOrder": -1
            },
            {
                "actType": 0,
                "andOr": 1,
                "isMain": 0,
                "logicType": "01",
                "optionOrder": "3",
                "setupQuestionOrder": 2,
                "skiptoQuestionOrder": 6
            },
            {
                "actType": 0,
                "andOr": 1,
                "isMain": 1,
                "logicType": "01",
                "optionOrder": "1,2",
                "setupQuestionOrder": 3,
                "skiptoQuestionOrder": 5
            },
            {
                "actType": 0,
                "andOr": 0,
                "isMain": 0,
                "logicType": "00",
                "optionOrder": "1",
                "setupQuestionOrder": 2,
                "skiptoQuestionOrder": 6
            },
            {
                "actType": 0,
                "andOr": 1,
                "isMain": 0,
                "logicType": "01",
                "optionOrder": "1",
                "setupQuestionOrder": 6,
                "skiptoQuestionOrder": 9
            },
            {
                "actType": 0,
                "andOr": 0,
                "isMain": 1,
                "logicType": "00",
                "optionOrder": "1",
                "setupQuestionOrder": 4,
                "skiptoQuestionOrder": 7
            },
            {
                "actType": 0,
                "andOr": 0,
                "isMain": 0,
                "logicType": "00",
                "optionOrder": "1",
                "setupQuestionOrder": 7,
                "skiptoQuestionOrder": 8
            }
        ],
        "qstnaireId": 520,
        "qstnaireLeadin": "欢迎参与本次问卷答题。",
        "qstnaireTitle": "测试问卷标题lyh",
        "question": [
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 1,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目a，2个选项",
                "questionName2": "",
                "questionOrder": 1,
                "questionType": "01",
                "status": 1
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 1,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    },
                    {
                        "optionName": "测试选项c",
                        "optionOrder": 3
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目a，3个选项",
                "questionName2": "单选测试题目",
                "questionOrder": 2,
                "questionType": "01",
                "status": 1
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 1,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    },
                    {
                        "optionName": "测试选项c",
                        "optionOrder": 3
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目a，3个选项",
                "questionName2": "复选测试",
                "questionOrder": 3,
                "questionType": "02",
                "status": 1
            },
            {
                "contentCheck": "",
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 1,
                "isCommon": "",
                "isNps": "",
                "isPaging": 1,//分页数据
                "isSatisfied": "",
                "lenthCheck": "",
                "optionLayout": "",
                "optionList": "",
                "questionCategory": "",
                "questionName": "",
                "questionName2": "",
                "questionOrder": 4,
                "questionType": "00",
                "status": ""
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 0,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目d，2个选项",
                "questionName2": "单选测试题目",
                "questionOrder": 4,
                "questionType": "01",
                "status": 1
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 1,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": "",
                "questionCategory": 0,
                "questionName": "测试题目a，填空题",
                "questionName2": "",
                "questionOrder": 5,
                "questionType": "03",
                "status": 1
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 0,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目e，2个选项",
                "questionName2": "",
                "questionOrder": 6,
                "questionType": "01",
                "status": 1
            },
            {
                "contentCheck": "",
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 0,
                "isCommon": "",
                "isNps": "",
                "isPaging": 1,//分页数据
                "isSatisfied": "",
                "lenthCheck": "",
                "optionLayout": "",
                "optionList": "",
                "questionCategory": "",
                "questionName": "",
                "questionName2": "",
                "questionOrder": 7,
                "questionType": "00",
                "status": ""
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 0,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目4a，2个选项",
                "questionName2": "",
                "questionOrder": 7,
                "questionType": "01",
                "status": 1
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 0,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    },
                    {
                        "optionName": "测试选项c",
                        "optionOrder": 3
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目78787a，3个选项",
                "questionName2": "单选测试题目",
                "questionOrder": 8,
                "questionType": "01",
                "status": 1
            },
            {
                "contentCheck": 0,
                "createTime": "当前时间",
                "createUid": 20,
                "isBlank": 0,
                "isCommon": 1,
                "isNps": 0,
                "isPaging": 0,
                "isSatisfied": 0,
                "lenthCheck": 0,
                "optionLayout": 0,
                "optionList": [
                    {
                        "optionName": "测试选项a",
                        "optionOrder": 1
                    },
                    {
                        "optionName": "测试选项b",
                        "optionOrder": 2
                    },
                    {
                        "optionName": "测试选项c",
                        "optionOrder": 3
                    }
                ],
                "questionCategory": 0,
                "questionName": "测试题目a，3个选项",
                "questionName2": "复选测试",
                "questionOrder": 9,
                "questionType": "02",
                "status": 1
            },
        ]
    })
})

//获取问卷列表
Mock.mock('mock/questionMgr/getQuestionnaireList', (params) => {
    let param = params.body ? JSON.parse(params.body) : "";
    let pageNum = param.pageNum ? param.pageNum : 1;
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
});

//获取任务列表
Mock.mock('mock/missionMgr/getMissionList', (params) => {
    let param = params.body ? JSON.parse(params.body) : "";
    let pageNum = param.pageNum ? param.pageNum : 1;
    return Mock.mock({
        'list|10': [{
            taskId: '@integer(1,6)',
            taskName: '@csentence',
            testFlag: '@cname',
            'objType|1': [1, 2],
            qstNaireId: '@integer(1,6)',
            createUid: '@integer(1,6)',
            catalogId: '@integer(1,6)',
            catalogName: '@cname',
            createTime: '@datetime',
            updateTime: '@datetime',
            channelId: '@integer(1,6)',
            'channelName|1': ['短信', '微信'],
            deal_tache: '@cname',
            deal_type: '@integer(1,6)',
            note: '',
            searchrn: '@integer(1,6)',
            'status|1': ['00', '01', '02', '03', '04', '05'],
            survey_count: '@integer(1,6)',
        }],
        pageNum: pageNum,
        pageSize: 10,
        totalCount: '@integer(10,50)'
    })
});

//结束调研
Mock.mock('mock/missionMgr/stopMission', (params) => {
    let params1 = JSON.parse(params.body);
    console.log(params1);
    return Mock.mock({
        'result': {
            'code': 0
        }
    })
});