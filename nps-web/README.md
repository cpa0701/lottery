#nps国际化前端说明

##菜单
目前菜单为静态，需在mock文件夹下的apiData.js里面进行配置

menuName：菜单名，menuUrl：路由路径，menuId：菜单id,children:子菜单

##mock
api接口分模块配在services文件夹下，使用mock需在请求前加入mock，如 var url = 'mock/menuInfoController/qryMenu';
mock的接口规则在mock文件夹下的apiData.js中按接口名称进行配置

##国际化
当前项目国际化为基于mobx进行配置，需将所有在前端页面中写死的文字进行国际化。
配置地址为locales文件夹下的en和zh-CN两个文件，注意配一个中文就要配一个对应英文，使用方法为通过注入自定义的stores（@inject('stores')），然后调用this.props.stores.I18nModel.outputLocale，
配置国际化时注意按模块进行划分，方便调用和管理

##样式
此项目所有样式全部基于ant-design，各页面的自定义样式放在各自的模块文件夹中建立相应less并在js中进行单独引入，不需使用css

##路由
路由为react-router-dom
通过按钮跳转需用Link标签，js控制跳转需要引入withRouter对组件进行包装后调用this.props.history.push('/')进行跳转