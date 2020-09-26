const { connection } = require('./dbConnect');
const config = require('../config/config.js');
const logger = require('../logger.js');

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

function createSongsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS songs(
                    id VARCHAR(36) NOT NULL PRIMARY KEY,
                    name TEXT,
                    duration  INT,
                    audio_url TEXT,
                    img_url TEXT,
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

function createSongArtistsTable() {
  return new Promise((resolve, reject) => {
    const query = `CREATE TABLE IF NOT EXISTS song_artists(
                    song_id VARCHAR(36) REFERENCES songs(id),
                    artist_id VARCHAR(36) REFERENCES artists(id)
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
    await createSongsTable();
    await createArtistsTable();
    await createPlaylistsTable();
    await createSongArtistsTable();
    await createUserPlaylistsTable();
    await createPlaylistSongsTable();
    await createArtistSongsTable();
    await createUserLikedSongsTable();
    logger.info('All tables are created successfully');
  } catch (error) {
    logger.error(`Error while initializing database and creating tables: ${error}`);
    throw error;
  }
}

module.exports = dbInitialize;
