from pydantic import BaseModel, Field, field_validator
from typing import Optional, List


class SiteCreate(BaseModel):
    creator_name: str = Field(..., min_length=1, max_length=50)
    partner_name: str = Field(..., min_length=1, max_length=50)
    love_message: str = Field(..., min_length=1, max_length=2000)

    photo_base64: Optional[str] = None
    photo_caption: Optional[str] = Field(None, max_length=200)
    how_we_met: Optional[str] = Field(None, max_length=1000)
    favorite_memory: Optional[str] = Field(None, max_length=1000)
    reasons: Optional[List[str]] = Field(None, max_length=6)
    song_url: Optional[str] = None
    pet_name: Optional[str] = Field(None, max_length=30)
    secret_message: Optional[str] = Field(None, max_length=500)

    @field_validator("photo_base64")
    @classmethod
    def validate_photo_size(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            # ~2MB in base64 is roughly 2.7M chars
            if len(v) > 2_800_000:
                raise ValueError("Photo must be under 2MB")
        return v

    @field_validator("reasons")
    @classmethod
    def validate_reasons(cls, v: Optional[List[str]]) -> Optional[List[str]]:
        if v is not None:
            if len(v) > 6:
                raise ValueError("Maximum 6 reasons allowed")
            v = [r.strip() for r in v if r.strip()]
        return v

    @field_validator("song_url")
    @classmethod
    def validate_song_url(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v.strip():
            v = v.strip()
            valid_prefixes = (
                "https://open.spotify.com/",
                "https://spotify.com/",
                "https://www.youtube.com/",
                "https://youtube.com/",
                "https://youtu.be/",
                "https://music.youtube.com/",
            )
            if not v.startswith(valid_prefixes):
                raise ValueError("Song URL must be a Spotify or YouTube link")
        else:
            v = None
        return v


class SiteResponse(BaseModel):
    id: str
    creator_name: str
    partner_name: str
    love_message: str
    photo_base64: Optional[str] = None
    photo_caption: Optional[str] = None
    how_we_met: Optional[str] = None
    favorite_memory: Optional[str] = None
    reasons: Optional[List[str]] = None
    song_url: Optional[str] = None
    pet_name: Optional[str] = None
    secret_message: Optional[str] = None
    view_count: int = 0
    accepted: bool = False


class SiteCreated(BaseModel):
    id: str
    url: str
