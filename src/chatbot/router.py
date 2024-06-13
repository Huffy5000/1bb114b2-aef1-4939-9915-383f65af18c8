from fastapi import APIRouter
from fastapi import Request

from .services import query_llm
from .config import model

router = APIRouter(
    prefix='/chatbot',
)

@router.post('/message/')
async def query_chatbot(request:Request):
    form_data = await request.form()
    message = form_data.get('message')
    response = query_llm(model,message)
    return {"response":response}



