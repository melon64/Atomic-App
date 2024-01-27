""" a """
import cohere
from typing import List, Dict


class CohereAPI:
    """ no """
    def __init__(self):
        # self.co = cohere.Client(settings.cohere_api_key)
        self.co = cohere.Client('p4u5yGV8CvOr89ISnzCpIp3l5XSECKULIVJvarB7')

    def generate_schedule(self, goal: str, schedule: List[Dict[str, str]]) -> str:
        message = "This is a bot that will take a goal and break it down into \
                    smaller subsequent tasks to be completed by the \
                    completion date specified. The response should follow a \
                    JSON format that contains each subsequent task, where \
                    each task is also a JSON object that contains the keys \
                    \"title\" for the title of the task, \"start\" for when in the day\
                    the user should begin this subsequent task, \"end\" for when the user should stop doing this task, and \
                    \"day-of-week\" for which weekday the subsequent task \
                    should be done on. To give an example of what this bot should do, \
                    if the goal is to prepare for an upcoming tech interview \
                    by the end of this week, then an example of something that \
                    the bot could return would be \n\
                    {\n\
                        \"tasks\": [{\n\
                            \"title\": Complete 3 leetcode medium problems.\n\
                            \"start\": 10:00\n\
                            \"duration\": 2\n\
                            \"day-of-week\": mon\n\
                        },\n\
                        {\n\
                            \"title\": Practice to a friend.\n\
                            \"start\": 13:00\n\
                            \"duration\": 2\n\
                            \"day-of-week\": tue\n\
                        },\n]\n\
                    }\n\
                    It is crucial that the response is in valid json format with no additional explanation text following the response. It is also crucial that the bot follows my template exactly.\
                    The following is the goal I would like the bot to break down: "
        message += goal
        chat_history = []
        response = self.co.chat(
            model='command',
            message=message,
            temperature=0.3,
            chat_history=chat_history,
            prompt_truncation='AUTO',
            stream=False,
            citation_quality='accurate',
            connectors=[],
            documents=[]
        )
        return response.text
