import os
import threading

from dotenv import load_dotenv
from openai import OpenAI

from source.db.database import MongoDatabase

class GPTInstance:

    client = None
    assistant = None
    mongo = None
    threads = {}

    def __init__(self):
        load_dotenv()
        self.client = OpenAI(api_key=os.getenv("OPENAI_KEY"))
        self.create_assistant()
        self.mongo = MongoDatabase(os.getenv("CONNECTION_STRING"))
        self.create_threads_onload()

    def create_assistant(self):
        self.assistant = self.client.beta.assistants.create(
            name="Mai",
            instructions="You are a mentor named Mai. A mentor acts as a guide and advisor, "
                         "providing support, advice, feedback, and guidance to help a mentee "
                         "develop their skills, achieve their goals, and grow professionally, "
                         "often serving as a role model by sharing their own experience and "
                         "knowledge to encourage the mentee's personal and career development; "
                         "essentially, they help someone reach their full potential by offering "
                         "direction and accountability.",
            model="gpt-3.5-turbo"
        )

    def create_threads_onload(self):
        threads = self.mongo.get_thread_collection().find()
        for thread in threads:
            self.threads[thread['_id']] = self.client.beta.threads.create()

            for i, message in enumerate(thread['messages']):
                item = thread['messages'][f"{i}"]
                self.client.beta.threads.messages.create(
                    thread_id = self.threads[thread['_id']].id,
                    role = item['role'],
                    content = item['text']
                )


    def create_thread(self, new, user_id):
        if new:
            self.threads[user_id] = self.client.beta.threads.create()

            document = {
                "_id": user_id,
                "messages": self.get_messages(user_id)
            }
            self.mongo.get_thread_collection().insert_one(document)

    def delete_thread(self, user_id):
        if user_id in self.threads:
            self.mongo.get_thread_collection().delete_one({'_id': user_id})
            self.threads.pop(user_id)

    def add_messages_to_thread(self, user_id, messages):
        thread_id = self.threads[user_id].id
        for message in messages:
            self.client.beta.threads.messages.create(
                thread_id = thread_id,
                role = "user",
                content = message
            )

        def update_mongo():
            filter_criteria = {'_id': user_id}
            update_values = {'$set': {'messages': self.get_messages(user_id)}}
            self.mongo.get_thread_collection().update_one(filter_criteria, update_values)

        mongo_thread = threading.Thread(target=update_mongo)
        mongo_thread.start()

    def run(self, user_id):
        thread_id = self.threads[user_id].id
        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=thread_id,
            assistant_id=self.assistant.id
        )

        if run.status == 'completed':
            messages = list(self.client.beta.threads.messages.list(
                thread_id=thread_id
            ))

            # Update the messages in the database
            filter_criteria = {'_id': user_id}
            update_values = {'$set': {'messages': self.get_messages(user_id)}}
            self.mongo.get_thread_collection().update_one(filter_criteria, update_values)

            message_content = messages[0].content[0].text
            return message_content.value

        return None

    def get_messages(self, user_id):
        if user_id not in self.threads:
            return {}

        thread_id = self.threads[user_id].id
        messages = list(self.client.beta.threads.messages.list(
            thread_id=thread_id
        ))
        json_messages = {}

        for i, message in enumerate(messages[::-1]):
            json_messages[f"{i}"] = {"id": i+1, "role": message.role, "text": message.content[0].text.value}
        return json_messages