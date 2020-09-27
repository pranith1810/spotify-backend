function getAlbumSongs(connection, albumId) {
  return new Promise((resolve, reject) => {
    const query = `SELECT songs.id as song_id, songs.name as song_name, duration, audio_url, albums.id as album_id, albums.name as album_name, img_url FROM songs
                    INNER JOIN albums 
                    ON songs.album_id = albums.id
                    WHERE album_id=?`;

    connection.query(query, [albumId], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = getAlbumSongs;
