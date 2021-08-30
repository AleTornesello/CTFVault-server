from typing import List, Dict

from Models import Writeup

class Database:
    """ Interface class for database interaction """

    def __init__(self) -> None:
        # Connect to database
        pass

    def get_writeup_from_id(self, id : int) -> Writeup:
        # Retrieve writeup from a given ID
        pass

    def query_writeups(
        self,
        query : str,
        filters : [Dict, None]
    ) -> List[Writeup]:
        # Retrieve writeups from query-terms and filters
        pass

    def add_writeup(self, writeup : Writeup) -> bool:
        # Add writeup to the database
        pass

    def update_writeup(self, writeup : Writeup, writeup_id : int) -> bool:
        # Update writeup content from a writeup id
        pass


if __name__ == '__main__':
    pass
    # Run tests