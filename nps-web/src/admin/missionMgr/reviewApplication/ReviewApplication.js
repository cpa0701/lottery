import React from 'react';
import {Tabs,Input,Button} from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
class ReviewApplication extends React.PureComponent{


render(){
    const operations = <Search
        placeholder="在结果中查询"
        onSearch={value => this.onSearch(value)}
        enterButton

    />;
    const btns=<div>
        <span style={{marginRight: '5px'}}>任务状态</span>
        <Button>全部</Button>
        <Button>正常结束</Button>
        <Button>执行中</Button>
        <Button>草稿</Button>
        <Button>审批</Button>
        <Button>否决</Button>
        <Button>作废</Button>
        <Button>发布</Button>
        <Button>人工终止</Button>
    </div>;
    return(
        <div>
            <Tabs tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                <TabPane tab="待我审核" key="1">{btns}</TabPane>
                <TabPane tab="审核通过" key="2">{btns}</TabPane>
                <TabPane tab="审核否决" key="3">{btns}</TabPane>
                <TabPane tab="审核作废" key="4">{btns}</TabPane>
                <TabPane tab="已发布" key="5">{btns}</TabPane>
            </Tabs>
        </div>
    );
}
}
export default ReviewApplication;