CREATE TABLE prefectures (id INTEGER PRIMARY KEY, prefecture_name TEXT NOT NULL);
CREATE TABLE cities (id TEXT PRIMARY KEY, city_name TEXT NOT NULL, prefecture_id INTEGER NOT NULL, FOREIGN KEY(prefecture_id) REFERENCES prefectures(id));
