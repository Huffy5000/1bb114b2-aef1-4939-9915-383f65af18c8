from fastapi import FastAPI
import chatbot.router as chatbot_router

app = FastAPI()

app.include_router(chatbot_router.router)


