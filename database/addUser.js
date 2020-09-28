function addUser(connection, user) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users SET ?';
    connection.query(query, user, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = addUser;
