function deleteLikedSong(connection, userId, songId) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM user_liked_songs
                    where song_id=? and user_id=?`;

    connection.query(query, [songId, userId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = deleteLikedSong;
