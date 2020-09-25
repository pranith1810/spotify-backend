const addUser = (connection, user) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users SET ?';  
      connection.query(query, user, (error) => {
        error ? reject(error) : resolve();
      });
    });
  }
  
  module.exports = addUser;
  