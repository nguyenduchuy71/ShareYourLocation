import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.database import Base, get_db
from main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override get_db dependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def client():
    Base.metadata.create_all(bind=engine)
    client = TestClient(app)
    yield client
    Base.metadata.drop_all(bind=engine)

def test_signup(client):
    response = client.post("/signup", json={"email": "testuser@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "userId" in response.json()

def test_signup_existing_email(client):
    # Try signing up with the same email again
    response = client.post("/signup", json={"email": "testuser@example.com", "password": "password123"})
    assert response.status_code == 400

def test_login(client):
    response = client.post("/login", json={"email": "testuser@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "userId" in response.json()

def test_login_invalid_credentials(client):
    response = client.post("/login", json={"email": "testuser@example.com", "password": "wrongpassword"})
    assert response.status_code == 400

def test_login_nonexistent_user(client):
    response = client.post("/login", json={"email": "nonexistent@example.com", "password": "password123"})
    assert response.status_code == 400
