function getPlaylistSongs(connection, playlistId) {
  return new Promise((resolve, reject) => {
    const query = `SELECT distinct songs.id as song_id, songs.name as song_name, duration, audio_url,artists.name as artist_name, albums.img_url as img_url FROM songs
              INNER JOIN playlist_songs
              on playlist_songs.song_id = songs.id
              INNER JOIN albums
              on songs.album_id = albums.id
              INNER JOIN artist_songs 
              ON songs.id = artist_songs.song_id
              INNER JOIN artists
              on artists.id = artist_songs.artist_id
              where playlist_songs.playlist_id =?`;

    connection.query(query, [playlistId], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = getPlaylistSongs;
