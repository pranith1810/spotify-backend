const getUser = (connection, user) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, email, password FROM users WHERE email=?'  
      connection.query(query, user, (error,result) => {
        error ? reject(error) : resolve(result);
      });
    });
  }
  
  module.exports = getUser;
  