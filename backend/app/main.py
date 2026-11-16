from fastapi import FastAPI
from app.routers import auth, postRouter
from app.models.user import User
from app.models.post import Post

app = FastAPI()
app.include_router(auth.router)
app.include_router(postRouter.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
