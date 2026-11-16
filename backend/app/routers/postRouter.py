from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.post import Post

from app.schemas.post import PostCreate, PostResponse, PostUpdate
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.post("/create", response_model=PostResponse)
def create_post(
        post_data: PostCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    new_post = Post(
        description=post_data.description,
        user_id=current_user.id
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


@router.get("", response_model=list[PostResponse])
def get_all_posts(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    posts = db.query(Post).order_by(Post.created_at.desc()).all()

    return posts


@router.get("/{post_id}", response_model=PostResponse)
def get_post_by_id(
        post_id: int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    post = db.query(Post).filter(
        Post.id == post_id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    return post


@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.user_id == current_user.id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}


@router.put("/{post_id}", response_model=PostResponse)
def update_post(
        post_id: int,
        post_data: PostUpdate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    post = db.query(Post).filter(
        Post.id == post_id,
        Post.user_id == current_user.id
    ).first()

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    post.description = post_data.description

    db.commit()
    db.refresh(post)

    return post


