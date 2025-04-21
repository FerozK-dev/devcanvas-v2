from jose import jwt, JWTError
from app.settings import settings
from fastapi import HTTPException, Request


def verify_jwt(request: Request):
    auth_header = request.headers.get("auth_token")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    token = auth_header

    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM]
        )

        user_id = int(payload.get("userId"))
        if user_id is None:
            raise ValueError("No user ID in token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
