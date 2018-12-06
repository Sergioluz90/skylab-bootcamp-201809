const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:26081990@localhost:3306/mysql')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'compositeIndex'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  // force: true will drop the table if it already exists
  User.sync({force: true})
  .then(() => {
      console.log('comprobamos si existe ya:')
    // Table created // Es para instancias persistentes
    return User.create({
      username: 'John90',
      name: 'John'
    })
  })
  .catch(err=> console.log(err))
  .then(()=>{
      // Es para instancias no persistentes
      const user=User.build({
          username:'nitrox',
          name:'sergio'
      })
      return user.save().catch(console.log)
  })
  .then(()=>console.log('pasamos a la siguiente funcion: '))
  .then(()=>  User.findAll()
  .then(users => {
    console.log('Mostramos usuarios:')
    console.log(users)
  })
  .catch(err=>console.log('error: '+err)))

  

