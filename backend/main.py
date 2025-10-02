from api_client import ask_question
from logger import log_interaction

def main():
    print("🤖 Welcome to AI Q&A Bot!")
    print("Type your question below. Type 'exit' to quit.\n")

    while True:
        question = input("You: ")
        if question.strip().lower() in ['exit', 'quit']:
            print("👋 Goodbye!")
            break

        answer = ask_question(question)
        print(f"AI: {answer}\n")

        log_interaction(question, answer)

if __name__ == "__main__":
    main()
