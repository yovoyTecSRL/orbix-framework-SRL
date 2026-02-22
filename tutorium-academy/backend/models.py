# Simple SQLite table creation (run once)
import sqlite3

conn = sqlite3.connect("tutorium.db")
conn.execute("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT)")
conn.execute("CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY, name TEXT, is_ai BOOLEAN)")
conn.execute("CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, title TEXT)")
conn.commit()
conn.close()
