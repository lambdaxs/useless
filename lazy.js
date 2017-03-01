/**
 * Created by xiaos on 17/1/16.
 */
const https = require('https');
const querystring = require('querystring');
const ConfigManager = require('../lib/config_manager')
const util = require('util')


//发送短信服务
const UtilSmsSendRouter = {}
UtilSmsSendRouter.send_sms_service = (req,res)=>{
    const {phone,msg} = req.body

    if (util.isUndefined(phone)) return errorRequest(req,res,Code.MISS_PARAMS,'phone')
    if (util.isUndefined(msg)) return errorRequest(req,res,Code.MISS_PARAMS,'msg')

    send_sms_action(phone,msg)
        .then(_=>{
            return jsonResponse(res,true,req)
        },err=>{
            return errorRequest(req,res,err)
        })
}

module.exports = UtilSmsSendRouter

/**
 * luosimao的短信发送服务
 * @param {string}  mobile
 * @param {String}  message
 */
const send_sms_action = (mobile,message) => {
    //获取配置数据
    const {api_key,sign} = ConfigManager.configManager['sms']['luosimao']
    // //校验
    if (!api_key)return Promise.reject(errorResult('appkey为空'))
    if (!sign) return Promise.reject(errorResult('签名为空'))
    if (!mobile) return Promise.reject(errorResult('手机号为空'))

    //控制单发群发
    const {postData,path} = handleOptions(mobile,message)

    const content = querystring.stringify(postData);
    const options = {
        host:'sms-api.luosimao.com',
        path,
        method:'POST',
        auth:`api:key-${api_key}`,
        agent:false,
        rejectUnauthorized : false,
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length' :content.length
        }
    }

    return new Promise((reslove,reject)=>{
        const request = https.request(options, (response) => {
            let rs = ''
            response.setEncoding('utf8')
            response.on('data', function (chunk) {
                rs += chunk
            })

            response.on('end', function () {
                let {error,msg} = JSON.parse(rs)

                if (error && error < 0) {//发送失败
                    msg = errorDescMap().get(error) || '未知错误'
                    reject(errorResult(msg))
                } else {//发送成功
                    reslove()
                }
            })
        })
        request.write(content)
        request.end()
    })
}

//返回接口错误数据
const errorResult = (error_msg)=>{
    const error_code = 20039
    error_msg = `短信发送失败,${error_msg}`
    return  {
        error_code,
        error_msg
    }
}

//错误描述信息码表
const errorDescMap = ()=>{
    const options = [[-10,'验证信息失败'],[-11,'用户接口被禁用'],[-20,'短信余额不足'],[-30,'短信内容为空'],[-31,'短信内容存在敏感词'],[-32,'短信内容缺少签名信息'],[-33,'短信过长,超过300字'],[-34,'签名不可用'],[-40,'错误的手机号'],[-41,'号码在黑名单中'],[-42,'短信发送频率过快'],[-50,'请求发送IP不在白名单中']]
    return new Map(options)
}

//单发群发
const handleOptions = (mobile,message)=>{
    let path = ''
    let mobileList = mobile.replace(/(^,)|(,$)/g, '').split(',').filter(v => v != '')
    //组装发送data
    let postData = {
        message:`${message}【${sign}】`
    }

    if (mobileList.length === 1){//单发
        mobile = mobileList.pop()
        path = '/v1/send.json'
        postData.mobile = mobile
    }else {//群发
        mobile = mobileList.join(',')
        path = '/v1/send_batch.json'
        postData.mobile_list = mobile
    }

    return {
        postData,
        path
    }
}

