from fastapi import APIRouter

from .services import query_llm
from .config import model

router = APIRouter(
    prefix='/chatbot',
)

@router.post('/message/')
def query_chatbot(message:str):
    response = query_llm(model,message)
    return {"response":response}



