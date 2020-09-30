function updateUserProfile(connection, userId, imgUrl) {
  return new Promise((resolve, reject) => {
    const query = `update users
                    SET img_url=?
                    WHERE id=?`;

    connection.query(query, [imgUrl, userId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = updateUserProfile;
