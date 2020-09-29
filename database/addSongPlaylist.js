function addSongPlaylist(connection, playlistSong) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO playlist_songs SET ?';
    connection.query(query, playlistSong, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = addSongPlaylist;
