import os
from dotenv import load_dotenv

load_dotenv()

EURI_API_URL = os.getenv("EURI_API_URL")
EURI_API_KEY = os.getenv("EURI_API_KEY")
