function addLikedSong(connection, userLikedSong) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user_liked_songs SET ?';
    connection.query(query, userLikedSong, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = addLikedSong;
