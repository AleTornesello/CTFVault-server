from typing import List, Dict

from Models import Writeup

dummy_data = Writeup(
            'corCTF',
            'aliceinwonderland',
            'reverse',
            'content',
            'https://github.com/r00tstici/writeups/tree/master/corCTF_2021/AliceInCeptionland'
        )

class Database:
    """ Interface class for database interaction """

    def __init__(self) -> None:
        # Connect to database
        pass

    def get_writeup_from_id(self, id : int) -> Writeup:
        # Retrieve writeup from a given ID
        data = dummy_data
        return data

    def query_writeups(
        self,
        query : str,
        filters : Dict
    ) -> List[Writeup]:
        # Retrieve writeups from query-terms and filters
        data = [dummy_data, dummy_data, dummy_data]
        return data

    def add_writeup(self, writeup : Writeup) -> bool:
        # Add writeup to the database
        pass

    def update_writeup(self, writeup : Writeup, writeup_id : int) -> bool:
        # Update writeup content from a writeup id
        pass


if __name__ == '__main__':
    pass
    # Run tests