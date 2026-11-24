from datetime import datetime
from pydantic import BaseModel, ConfigDict
from app.schemas.post import PostResponse


class UserCreate(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class UserProfile(BaseModel):
    username: str
    created_at: datetime
    recent_posts: list[PostResponse]


