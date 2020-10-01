function deletePlaylist(connection, userId, playlistId) {
  return new Promise((resolve, reject) => {
    const query = `delete from user_playlists
                    where user_id=? and playlist_id=?`;

    connection.query(query, [userId, playlistId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = deletePlaylist;
