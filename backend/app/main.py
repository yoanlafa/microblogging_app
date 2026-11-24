from fastapi import FastAPI
from app.routers import auth, postRouter, userRouter
from app.models.user import User
from app.models.post import Post
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(postRouter.router)
app.include_router(userRouter.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
