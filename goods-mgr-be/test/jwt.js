var jwt = require('jsonwebtoken');
var token = jwt.sign({account: '123', _id: 001}, 'aaa');

console.log(token);

//打印出这个eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MTUwMTQ5Mzl9.PSZeLzrKuwQbpCjOPNqePUXgKqMXKiSNu35k11mxi2k

// 上面的两个点分为三段内容
// 三段内容分别为

// header头部
// 使用加密的算法 sha256
// jwt

// payload
// 加密后的数据体 对应第一个参数

// signature
// 使用签名的秘钥 对应最一个参数'aaa'

// jwt的解密功能 verify
// 三个参数分别对应
// 1. 要解密的token
// 2. 解密的token所对应的秘钥
// 3. 解密成功或者失败的回调函数,成功返回解密后的数据体,失败返回错误信息
jwt.verify(token, 'aaa', (err, payload) => {
  console.log(err);
  // 解析后的结果
  console.log(payload);
})
