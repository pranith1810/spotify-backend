function deleteUser(connection, userId) {
  return new Promise((resolve, reject) => {
    const query = `delete from users
                    where id=?`;

    connection.query(query, [userId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = deleteUser;
