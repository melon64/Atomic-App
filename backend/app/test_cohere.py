from services.cohere_api import CohereAPI

scheduler = CohereAPI()
json = scheduler.generate_schedule("bench 225 pounds by the end of the week", None)
print(json)
