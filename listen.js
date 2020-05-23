var mysql  = require('mysql');   
var mail = require("./mail");
var fs = require('fs');
var connection = mysql.createConnection({     
    host     : 'localhost',       
    user     : 'root',              
    password : 'root',       
    port: '3306',                   
    database: 'guahao' 
    });
var sql='show slave status';
var str;
var access;
function intervalFunc() {
	connection.query(sql,function (err, result) {
		var str=result[0];
		var rs1=str.Slave_IO_Running;
		var rs2=str.Slave_SQL_Running;
		temp(rs1,rs2);
	});
	function temp(rs1,rs2){
		if(rs1=='Yes' && rs2=='Yes'){
		console.log('--------------------------状态正常--------------------------');
		console.log('Slave_IO_Running  :',rs1);
		console.log('Slave_SQL_Running :',rs2);
		//读取邮件发送状态,状态正常应将状态值置空
		fs.readFile('status.config', function (err, data) {
			if (err) {
				 return console.error(err);
			}
			access=data.toString();
        });
		if(access!=null){
			fs.writeFile('status.config', '',  function(err) {
			   if (err) {
				   return console.error(err);
			   }
	        });	
		}
		}else{
		console.log('--------------------------状态异常--------------------------');
		console.log('Slave_IO_Running  :',rs1);
		console.log('Slave_SQL_Running :',rs2);
		//读取邮件发送状态
		fs.readFile('status.config', function (err, data) {
			if (err) {
				 return console.error(err);
			}
			str=data.toString();
        });
		    if(str==1){
				sendMail();
			}else{
				ISsendMail();
			}
		}
	}
}
setInterval(intervalFunc,1500);
function sendMail(){
	console.log('邮件已经发送···');
}
function ISsendMail(){
	console.log('正在发送邮件···');
	//调用邮件写入模块
	mail.mail();
	//写入邮件发送状态
	fs.writeFile('status.config', '1',  function(err) {
	   if (err) {
		   return console.error(err);
	   }
	});
}
