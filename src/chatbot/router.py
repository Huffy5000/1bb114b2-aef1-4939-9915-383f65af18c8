from fastapi import APIRouter

router = APIRouter(
    prefix='/chatbot',
)

@router.get('/home/')
def home_test():
    return {"Home":"Get Successful"}
