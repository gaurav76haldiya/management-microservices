from pydantic import BaseModel

class UserResponse(BaseModel):
    question: str
    answer: str

class PersonalInfo(BaseModel):
    name: str
    email: str
    zipcode: str
    address: str
    phone: str

