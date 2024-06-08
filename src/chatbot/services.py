import google.generativeai as genai

def query_llm(model:genai.GenerativeModel,message:str) -> str:
    """
    Query the llm of choice with a message to generate a response. 
    Model must be configured outside of the function scope
    """
    response = model.generate_content(contents=message,stream=True)
    # Catch Permission denied and resource exhausted errors
    # Catch internal and unavailable errors retry and send message, if issue persists servie is down
    # Invalid arguement
    
    #Service is down message
    # Please wait x and try again
    
    return response.text







