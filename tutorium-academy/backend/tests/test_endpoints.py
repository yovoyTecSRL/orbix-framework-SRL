import requests

BASE_URL = "http://localhost:8000"

def test_health():
    r = requests.get(f"{BASE_URL}/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"

def test_stats():
    r = requests.get(f"{BASE_URL}/stats")
    assert r.status_code == 200

def test_students():
    r = requests.get(f"{BASE_URL}/students")
    assert r.status_code == 200

def test_chat():
    r = requests.post(f"{BASE_URL}/chat", json={"message": "Hola IA"})
    assert r.status_code == 200
    assert "reply" in r.json()

def test_whiteboard_events():
    r = requests.get(f"{BASE_URL}/live/whiteboard/events")
    assert r.status_code == 200
