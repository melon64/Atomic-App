import cohere

class Cohere:
    def __init__(self):
        # self.co = cohere.Client(settings.cohere_api_key)
        self.co = cohere.Client('p4u5yGV8CvOr89ISnzCpIp3l5XSECKULIVJvarB7')

    def test(self):
        message = "testing"
        response = self.co.chat(
            message,
            model="command",
            temperature=0.9
        )

        answer = response.text
        print(answer)