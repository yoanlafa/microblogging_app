from fastapi import FastAPI
from app.routers import auth
from app.models.user import User
from app.models.post import Post

app = FastAPI()
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
