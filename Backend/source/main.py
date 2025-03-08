from api.gpt import GPTInstance

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

ai_instance = GPTInstance()

@app.route('/thread', methods=['POST'])
@cross_origin()
def create_thread():
    data = request.get_json()

    user_id = data['user_id']
    new = data['new']
    messages = data['messages']

    ai_instance.create_thread(new, user_id)
    ai_instance.add_messages_to_thread(user_id, messages)

    return jsonify({"response": "Thread created", "user_ID": user_id}), 200

@app.route('/message', methods=['POST'])
@cross_origin()
def add_messages():
    data = request.get_json()

    user_id = data['user_id']
    messages = data['messages']

    ai_instance.add_messages_to_thread(user_id, messages)

    return jsonify({"response": "Messages added", "user_ID": user_id, "messages": messages}), 200

@app.route('/message_history', methods=['POST'])
@cross_origin()
def get_messages():
    data = request.get_json()

    user_id = data['user_id']

    messages = ai_instance.get_messages(user_id)

    return jsonify(messages), 200

@app.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    data = request.get_json()

    user_id = data['user_id']
    message = data['message']

    ai_instance.add_messages_to_thread(user_id, message)
    assistant_message = ai_instance.run(user_id)

    if assistant_message is None:
        return jsonify({"response": "Failed to run"}), 500

    return jsonify({"user_ID": user_id, "user_message": message,
                    "assistant_message": assistant_message}), 200

@app.route('/delete_thread', methods=['POST'])
@cross_origin()
def delete_thread():
    data = request.get_json()

    user_id = data['user_id']

    ai_instance.delete_thread(user_id)

    return jsonify({"response": "Thread deleted", "user_ID": user_id}), 200

if __name__ == '__main__':
    app.run()