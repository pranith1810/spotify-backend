function addPlaylist(connection, userPlaylist) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user_playlists SET ?';
    connection.query(query, userPlaylist, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = addPlaylist;
