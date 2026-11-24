from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models.user import User
from app.models.post import Post

from app.schemas.post import  PostResponse
from app.schemas.user import UserProfile
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=UserProfile)
def get_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    recent_posts = db.query(Post).options(joinedload(Post.user)).filter(
        Post.user_id == current_user.id
    ).order_by(Post.created_at.desc()).limit(5).all()

    return UserProfile(
        username=current_user.username,
        created_at=current_user.created_at,
        recent_posts=recent_posts
    )