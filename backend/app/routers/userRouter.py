from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from pathlib import Path
import shutil
from PIL import Image, UnidentifiedImageError
from io import BytesIO
from uuid import uuid4


from app.database import get_db
from app.models.user import User
from app.models.post import Post

from app.schemas.post import  PostResponse
from app.schemas.user import UserProfile
from app.dependencies import get_current_user


MAX_FILE_SIZE = 2 * 1024 * 1024  # 2 MB
MAX_IMAGE_PIXELS = 10_000_000  # 10 million pixels

UPLOAD_DIR = Path("uploads/profile_pictures")

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
        recent_posts=recent_posts,
        profile_picture=current_user.profile_picture
    )

@router.post("/me/profile-picture")
async def upload_profile_picture(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contents = await file.read(MAX_FILE_SIZE + 1)

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image must not exceed 5 MB."
        )

    try:
        image = Image.open(BytesIO(contents))

        if image.format not in ["JPEG", "PNG"]:
            raise HTTPException(
                status_code=400,
                detail="Only JPEG and PNG images are allowed."
            )

        if image.width * image.height > MAX_IMAGE_PIXELS:
            raise HTTPException(
                status_code=400,
                detail="Image dimensions are too large."
            )

        image_format = image.format
        image.verify()

    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError):
        raise HTTPException(
            status_code=400,
            detail="Invalid image file."
        )

    extension = ".jpg" if image_format == "JPEG" else ".png"
    filename = f"{uuid4().hex}{extension}"

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    file_path = UPLOAD_DIR / filename

    old_file = None

    if current_user.profile_picture:
        old_filename = Path(current_user.profile_picture).name
        candidate = (UPLOAD_DIR / old_filename).resolve()

        if candidate.parent == UPLOAD_DIR.resolve() and candidate.is_file():
            old_file = candidate

    try:
        file_path.write_bytes(contents)

        current_user.profile_picture = f"/uploads/profile_pictures/{filename}"

        db.commit()

    except Exception:
        db.rollback()

        file_path.unlink(missing_ok=True)

        raise

    if old_file and old_file != file_path:
        try:
            old_file.unlink(missing_ok=True)
        except OSError:
            pass

    return {
        "message": "Profile picture uploaded successfully",
        "profile_picture": current_user.profile_picture
    }

