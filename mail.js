var nodemailer = require('nodemailer');
var fs = require('fs');
function mail(){
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
    user: '459857350@qq.com',
    pass: '*********' //授权码,通过QQ获取
 
  }
  });
  var mailOptions = {
    from: 'slave server<459857350@qq.com>', // 发送者
    to: 'liangruiping10@126.com', // 接受者,可以同时发送多个,以逗号隔开
    subject: 'slave server status error', // 标题
    text: 'slave server status error,please checking !!!', // 文本
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }else{
       //写入邮件发送日志
	   var data ='\n'+Date()+' '+info.response;
       var data = Buffer.from(data);
	   fs.appendFile('send.log', data, (err) => {
			if(err) throw err
	   })
	}
  });
}
exports.mail = mail;
