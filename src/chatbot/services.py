import google.generativeai as genai

def query_llm(model:genai.GenerativeModel,message:str) -> str:
    """
    Query the llm of choice with a message to generate a response. 
    Model must be configured outside of the function scope
    """
    response = model.generate_content(contents=message)
    return response.text







