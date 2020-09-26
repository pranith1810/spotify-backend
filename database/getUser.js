function getUser(connection, user) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, email, password FROM users WHERE email=?';
    connection.query(query, user, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = getUser;
