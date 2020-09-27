function getAllAlbums(connection) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name, img_url FROM albums';

    connection.query(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = getAllAlbums;
