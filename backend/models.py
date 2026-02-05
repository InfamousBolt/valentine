from pydantic import BaseModel, Field


class SiteCreate(BaseModel):
    encrypted_data: str = Field(..., max_length=4_000_000)
    iv: str = Field(..., min_length=16, max_length=24)


class SiteResponse(BaseModel):
    id: str
    encrypted_data: str
    iv: str
    view_count: int = 0
    accepted: bool = False


class SiteCreated(BaseModel):
    id: str
    url: str
