class FilterTool {
    //翻译审核状态
    filterStatus = (statu) => {
        let status = '';
        switch (statu) {
            case '00':
                status = '正常结束';
                break;
            case '01':
                status = '执行中';
                break;
            case '02':
                status = '草稿';
                break;
            case '03':
                status = '审批中';
                break;
            case '04':
                status = '审核退单';
                break;
            case '05':
                status = '审核作废';
                break;
            case '06':
                status = '发布中';
                break;
            case '10':
                status = '人工终止';
                break;
            default:
                status = ''
        }
        return status;
    }
    //翻译审核状态
    filterChannel = (chan) => {
        let channel = '';
        switch (chan) {
            case '0':
                channel = '链接与二维码';
                break;
            case '1':
                channel = '微信发送';
                break;
            case '2':
                channel = '邮件发送';
                break;
            case '3':
                channel = '短信发送';
                break;
            default:
                channel = ''
        }
        return channel;
    }
}

export default new FilterTool();
