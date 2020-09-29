function getAllUserPlaylists(connection, userId) {
  return new Promise((resolve, reject) => {
    // const query = `SELECT playlist_id, name as playlist_name FROM user_playlists
    //                 where user_id=?`;

    const query = `SELECT distinct user_playlists.playlist_id, user_playlists.name as playlist_name,albums.img_url 
                    FROM user_playlists
                    left join playlist_songs 
                    on user_playlists.playlist_id=playlist_songs.playlist_id
                    left join songs 
                    on songs.id = playlist_songs.song_id 
                    left JOIN albums
                    on songs.album_id = albums.id
                    where user_id=?`;

    connection.query(query, [userId], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = getAllUserPlaylists;
