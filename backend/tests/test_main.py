from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_question():
    response = client.get("/question?step=0")
    assert response.status_code == 200
    assert "question" in response.json()

def test_submit_response():
    response = client.post("/response", json={"question": "Do you need service?", "answer": "Yes"})
    assert response.status_code == 200
    assert "message" in response.json()

def test_submit_personal_info():
    response = client.post("/personal_info", json={
        "name": "John Doe",
        "email": "john@example.com",
        "zipcode": "12345",
        "address": "123 Main St",
        "phone": "555-1234"
    })
    assert response.status_code == 200
    assert "details" in response.json()

