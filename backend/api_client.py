import requests
from backend.config import EURI_API_URL, EURI_API_KEY

def ask_question(question):
    headers = {
        "Authorization": f"Bearer {EURI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "gpt-4.1-mini", 
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question}
        ]
    }

    try:
        response = requests.post(EURI_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data['choices'][0]['message']['content'].strip()
    except requests.RequestException as e:
        return f"[ERROR] Failed to contact API: {e}"
    except (KeyError, IndexError):
        return "[ERROR] Unexpected response format from API"
