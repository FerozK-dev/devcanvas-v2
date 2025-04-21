from fastapi import Depends
from typing import Annotated
from app.dependencies.jwt import verify_jwt
from app.dependencies.database import get_db
from sqlmodel import Session
from app.models import UserPublic
from app.services.user import user_by_id


def get_current_user(
    user_id: Annotated[int, Depends(verify_jwt)],
    db_session: Annotated[Session, Depends(get_db)],
) -> UserPublic:
    user = user_by_id(user_id, db_session)

    return UserPublic.model_validate(user)
