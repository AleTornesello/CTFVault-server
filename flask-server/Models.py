from typing import Dict
from jsonschema import validate
from jsonschema.exceptions import ValidationError

class Writeup:
    """ Model for the writeup """

    writeup_schema = {
        "type" : "object",
        "properties" : {
            "contest_name" : {"type" : "string"},
            "challenge_name" : {"type" : "string"},
            "category" : {"type" : "string"},
            "content" : {"type" : "string"},
            "source" : {"type" : "string"},
        },
        "required" : ["contest_name", "challenge_name", "category", "content", "source"]
    }

    def __init__(
        self,
        contest_name : str,
        challenge_name : str,
        category : str,
        content : str,
        source : str,
    ) -> None:
        self.contest_name = contest_name
        self.challenge_name = challenge_name
        self.category = category
        self.content = content
        self.source = source

    def __str__(self) -> str:
        return f'{self.challenge_name} from {self.contest_name}'

    def to_json(self) -> Dict:
        return {
            "contest_name" : self.contest_name,
            "challenge_name" : self.challenge_name,
            "category" : self.category,
            "source" : self.source
        }

    @staticmethod
    def from_json(data : Dict):
        try:
            validate(instance = data, schema = Writeup.writeup_schema)
        except ValidationError as err:
            raise ValueError('Invalid json')

        writeup = Writeup(
            data["contest_name"],
            data["challenge_name"],
            data["category"],
            data["content"],
            data["source"],
        )

        return writeup
