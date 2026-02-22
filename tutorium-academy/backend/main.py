from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3
import os
from odoo_adapter import get_odoo_adapter

app = FastAPI(title="Tutorium Academy API", description="MVP Endpoints")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.getenv("DB_PATH", "tutorium.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

class Student(BaseModel):
    id: int = None
    name: str

class Teacher(BaseModel):
    id: int = None
    name: str
    is_ai: bool = False

class Course(BaseModel):
    id: int = None
    title: str

class ChatRequest(BaseModel):
    message: str

class WhiteboardEvent(BaseModel):
    event: str
    data: dict

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/stats")
def stats():
    conn = get_db()
    students = conn.execute("SELECT COUNT(*) FROM students").fetchone()[0]
    teachers = conn.execute("SELECT COUNT(*) FROM teachers").fetchone()[0]
    courses = conn.execute("SELECT COUNT(*) FROM courses").fetchone()[0]
    return {"students": students, "teachers": teachers, "courses": courses}

@app.get("/students", response_model=List[Student])
def get_students():
    conn = get_db()
    rows = conn.execute("SELECT * FROM students").fetchall()
    return [Student(**dict(row)) for row in rows]

@app.post("/students", response_model=Student)
def add_student(student: Student):
    conn = get_db()
    cur = conn.execute("INSERT INTO students (name) VALUES (?)", (student.name,))
    conn.commit()
    student.id = cur.lastrowid
    return student

@app.get("/teachers", response_model=List[Teacher])
def get_teachers():
    conn = get_db()
    rows = conn.execute("SELECT * FROM teachers").fetchall()
    return [Teacher(**dict(row)) for row in rows]

@app.post("/teachers", response_model=Teacher)
def add_teacher(teacher: Teacher):
    conn = get_db()
    cur = conn.execute("INSERT INTO teachers (name, is_ai) VALUES (?, ?)", (teacher.name, teacher.is_ai))
    conn.commit()
    teacher.id = cur.lastrowid
    return teacher

@app.get("/courses", response_model=List[Course])
def get_courses():
    adapter = get_odoo_adapter()
    return adapter.list_courses()

@app.post("/courses", response_model=Course)
def add_course(course: Course):
    conn = get_db()
    cur = conn.execute("INSERT INTO courses (title) VALUES (?)", (course.title,))
    conn.commit()
    course.id = cur.lastrowid
    return course

@app.post("/chat")
def chat(req: ChatRequest):
    # Mock IA response
    if os.getenv("OPENAI_KEY"):
        # Integración real aquí (omitir por ahora)
        return {"reply": "IA real (no implementada)"}
    return {"reply": f"Mock IA: Recibí '{req.message}'"}

@app.get("/live/classroom")
def live_classroom():
    return {"status": "active", "students": 5, "teacher": "Prof. AI"}

whiteboard_events = []

@app.post("/live/whiteboard/event")
def save_whiteboard_event(event: WhiteboardEvent):
    whiteboard_events.append(event.dict())
    return {"ok": True}

@app.get("/live/whiteboard/events")
def get_whiteboard_events():
    return whiteboard_events

# Error handling
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return HTTPException(status_code=500, detail=str(exc))
