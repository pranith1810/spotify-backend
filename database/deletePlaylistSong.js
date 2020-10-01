function deletePlaylistSong(connection, playlistId, songId) {
  return new Promise((resolve, reject) => {
    const query = `delete from playlist_songs
                    where playlist_id=? and song_id=?`;

    connection.query(query, [playlistId, songId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = deletePlaylistSong;
