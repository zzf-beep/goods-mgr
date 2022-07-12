// 数据库初始化  手动执行
const mongoose = require('mongoose')
const { connect } = require('../src/db/index')
const character = require('../src/helpers/character')

const { defaultCharacter } = character
const User = mongoose.model('User')

const Character = mongoose.model('Character')

connect()
  .then(async () => {
    console.log('角色开始初始化');

    const characterList = await Character.insertMany(defaultCharacter)

    console.log('角色初始化完成');

    const user = new User({
      account: 'admin',
      password: 'admin',
      character: characterList.find(item => (item.name === 'admin'))._id
    })

    console.log('正在初始化用户:', user);
    
    await user.save()

    console.log('用户初始化完成');
  })