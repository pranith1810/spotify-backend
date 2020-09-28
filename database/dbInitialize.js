const { connection } = require('./dbConnect');
const config = require('../config/config.js');
const logger = require('../logger.js');
const initialAlbumsData = require('../seedData/initialAlbumData.json');
const initialSongsData = require('../seedData/initialSongsData.json');
const initialArtistsData = require('../seedData/initialArtistsData.json');
const initialArtistSongsData = require('../seedData/initialArtistSongsData.json');

function createDb() {
  return new Promise((resolve, reject) => {
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${config.database}`;
    connection.query(createDbQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function useDb() {
  return new Promise((resolve, reject) => {
    const useDbQuery = `USE ${config.database}`;
    connection.query(useDbQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createUserTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        name TEXT,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        password TEXT,
        img_url TEXT,
        is_active BOOLEAN DEFAULT FALSE,
        date_of_birth DATETIME,
        gender TEXT
    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createAlbumsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS albums(
                    id VARCHAR(36) NOT NULL PRIMARY KEY,
                    name TEXT,
                    img_url TEXT
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertIntoAlbumsTable() {
  return new Promise((resolve, reject) => {
    initialAlbumsData.forEach((object) => {
      connection.query(
        `USE ${config.database}; INSERT IGNORE INTO albums SET ?`, object, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  });
}

function createSongsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS songs(
                    id VARCHAR(36) NOT NULL PRIMARY KEY,
                    name TEXT,
                    duration  INT,
                    audio_url TEXT,
                    album_id VARCHAR(36) REFERENCES albums(id)
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertIntoSongsTable() {
  return new Promise((resolve, reject) => {
    initialSongsData.forEach((object) => {
      connection.query(
        `USE ${config.database}; INSERT IGNORE INTO songs SET ?`, object, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  });
}

function createArtistsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS artists(
                    id VARCHAR(36) NOT NULL PRIMARY KEY,
                    name TEXT,
                    img_url TEXT
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertIntoArtistsTable() {
  return new Promise((resolve, reject) => {
    initialArtistsData.forEach((object) => {
      connection.query(
        `USE ${config.database}; INSERT IGNORE INTO artists SET ?`, object, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  });
}

function createPlaylistsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS playlists(
                    id VARCHAR(36) NOT NULL PRIMARY KEY,
                    name TEXT
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createUserPlaylistsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS user_playlists(
                    user_id VARCHAR(36) REFERENCES users(id),
                    playlist_id VARCHAR(36) REFERENCES playlists(id)
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createPlaylistSongsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS playlist_songs(
                    playlist_id VARCHAR(36) REFERENCES playlists(id),
                    song_id VARCHAR(36) REFERENCES songs(id)
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function createArtistSongsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS artist_songs(
                    artist_id VARCHAR(36) REFERENCES artists(id),
                    song_id VARCHAR(36) REFERENCES songs(id)
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertIntoArtistSongsTable() {
  return new Promise((resolve, reject) => {
    initialArtistSongsData.forEach((object) => {
      connection.query(
        `USE ${config.database}; INSERT IGNORE INTO artist_songs SET ?`, object, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  });
}

function createUserLikedSongsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS user_liked_songs(
                    user_id VARCHAR(36) REFERENCES users(id),
                    song_id VARCHAR(36) REFERENCES songs(id)
                    );`;

    connection.query(query, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function dbInitialize() {
  try {
    await createDb();
    logger.info(`${config.database} database created`);
    await useDb();
    logger.info(`Using ${config.database} database`);
    await createUserTable();
    await createAlbumsTable();
    await insertIntoAlbumsTable();
    await createSongsTable();
    await insertIntoSongsTable();
    await createArtistsTable();
    await insertIntoArtistsTable();
    await createPlaylistsTable();
    await createUserPlaylistsTable();
    await createPlaylistSongsTable();
    await createArtistSongsTable();
    await insertIntoArtistSongsTable();
    await createUserLikedSongsTable();
    logger.info('All tables are created successfully');
  } catch (error) {
    logger.error(`Error while initializing database and creating tables: ${error}`);
    throw error;
  }
}

function createDbAndTables() {
  return new Promise((resolve, reject) => {
    dbInitialize()
      .then(() => {
        logger.info('Database initialization successful');
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = createDbAndTables;
