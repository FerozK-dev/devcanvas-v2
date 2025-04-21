from fastapi import HTTPException
from sqlmodel import Session

from app.models import User


def user_by_id(user_id: int, db_session: Session) -> User:
    user = db_session.get(User, user_id)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user
