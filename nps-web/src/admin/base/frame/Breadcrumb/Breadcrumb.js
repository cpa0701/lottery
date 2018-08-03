import React from 'react';
import AntPageHeader from 'ant-design-pro/lib/PageHeader';
import {withRouter} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import * as mobx from 'mobx';

const {autorun} = mobx;

// import "./Breadcrumb.less"

@inject("stores")
@observer
class Bread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail',
            menuMaps: []
        }
    }

    componentWillMount() {
        // this.changeBread();

    }

    changeBread = () => {
        autorun(() => {
            console.log(this.props.stores.MenuModel.menuMaps)
            this.setState({menuMaps: this.props.stores.MenuModel.menuMaps})
        })
    }

    render() {
        const {location} = this.props;
        const menuMaps = this.state.menuMaps;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            for (let i = 0; i < menuMaps.length; i++) {
                let menu = menuMaps[i];
                if (url === menu.menuUrl) {
                    let children = menu.children;
                    let href = '#' + url;
                    //拥有子菜单一般都不是链接菜单
                    if (children && children.length > 0) {
                        href = '';
                    }
                    return (
                        {
                            key: menu.menuId,
                            href: href,
                            title: menu.menuName
                        }
                    );
                }
            }
            return (
                {
                    key: url,
                    href: url,
                    title: url
                }
            );
        });

        //最前面增加首页链接
        let items = [{
            key: 'homeBread',
            href: '#',
            title: '首页'
        }].concat(extraBreadcrumbItems);
        return (
            <AntPageHeader title="" breadcrumbList={items}/>
        )
    }
}

export default withRouter(Bread);
