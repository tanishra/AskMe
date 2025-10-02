from datetime import datetime

def log_interaction(question, answer):
    with open("interaction_log.txt", "a", encoding="utf-8") as f:
        f.write(f"Time: {datetime.now()}\n")
        f.write(f"Q: {question}\n")
        f.write(f"A: {answer}\n")
        f.write("-" * 40 + "\n")
