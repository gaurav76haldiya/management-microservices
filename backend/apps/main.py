from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

# Load CSV data (simulate loading services from a CSV file)
csv_file = "services.csv"
services_df = pd.read_csv(csv_file)

# Data models
class UserResponse(BaseModel):
    question: str
    answer: str

class PersonalInfo(BaseModel):
    name: str
    email: str
    zipcode: str
    address: str
    phone: str

# Endpoint to get questions based on CSV data
@app.get("/question")
async def get_question(step: int = 0):
    try:
        question = services_df["question"][step]  # Get question based on step
        return {"step": step, "question": question}
    except IndexError:
        raise HTTPException(status_code=404, detail="No more questions available")

# Endpoint to collect responses
@app.post("/response")
async def collect_response(response: UserResponse):
    # Logic to process the response and move to the next question
    return {"message": "Response received", "next_step": response.question}

# Endpoint to collect personal info
@app.post("/personal_info")
async def submit_personal_info(info: PersonalInfo):
    # Simulate storing the personal info
    return {"message": "Personal information collected", "details": info}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

