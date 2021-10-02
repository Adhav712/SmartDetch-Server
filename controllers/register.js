const HandleRegister = (req, res,bcrypt,db,saltRounds) => {
        const { email, firstname,lastname, password } = req.body;
        if(!email || !password){
            return res.status(400).json('Incorrect form submission');
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password,salt);
          db.transaction(trx => {
            trx.insert({
              hash: hash,
              email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
              return trx('users')
                .returning('*')
                .insert({
                  email: loginEmail[0],
                  firstname: firstname,
                  lastname: lastname,
                  joined: new Date()
                })
                .then(user => {
                  res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
          })
          .catch(err => res.status(400).json('unable to register'))
      }

module.exports = {
    HandleRegister
}