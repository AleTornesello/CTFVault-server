from typing import Dict

class Writeup:
    """ Model for the writeup """

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