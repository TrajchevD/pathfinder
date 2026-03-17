import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('pathfinder.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      distance REAL NOT NULL,
      duration INTEGER NOT NULL,
      coordinates TEXT NOT NULL
    );
  `);
}

export function saveActivity(
  date: string,
  distance: number,
  duration: number,
  coordinates: { latitude: number; longitude: number }[]
) {
  const coords = JSON.stringify(coordinates);
  db.runSync(
    `INSERT INTO activities (date, distance, duration, coordinates) VALUES (?, ?, ?, ?)`,
    [date, distance, duration, coords]
  );
}

export function getActivities() {
  return db.getAllSync(`SELECT * FROM activities ORDER BY id DESC`) as Activity[];
}

export function getActivityById(id: number) {
  return db.getFirstSync(`SELECT * FROM activities WHERE id = ?`, [id]) as Activity;
}

export interface Activity {
  id: number;
  date: string;
  distance: number;
  duration: number;
  coordinates: string;
}