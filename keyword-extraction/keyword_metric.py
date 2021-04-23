from typing import Iterable, Iterator, List
from dataclasses import dataclass

from math import log
from nltk import tokenize
from itertools import islice

from keyword_extraction import Keyword

"""
Term Frequency – How frequently a term occurs in a text. It is measured as the number of times a term t appears in the text / Total number of words in the document

Inverse Document Frequency – How important a word is in a document. It is measured as log(total number of sentences / Number of sentences with term t)

TF-IDF – Words’ importance is measure by this score. It is measured as TF * IDF
"""


@dataclass
class KeywordTfIdf:
    text: str
    occurrences: int
    sentence_occurrences: int = 0

    term_frequency: float = 0
    inverse_document_frequency: float = 0

    @property
    def tf_idf(self) -> float:
        return self.term_frequency * self.inverse_document_frequency


class TfIdf:
    def __init__(self, text, keywords: Iterable[Keyword]):
        self.text = text
        self.__keywords = self.__map_to_keyword_TF_IDF(keywords)

    def __map_to_keyword_TF_IDF(self, keywords):
        return list(map(lambda keyword: KeywordTfIdf(keyword.text, keyword.occurrences), keywords))

    def __calculate_term_frequency(self):
        word_count = len(self.text.split())

        for keyword in self.__keywords:
            keyword.term_frequency = keyword.occurrences / word_count

    def __calculate_inverse_document_frequency(self):
        sentences = tokenize.sent_tokenize(self.text)
        sentences_count = len(sentences)

        for keyword in self.__keywords:
            keyword.sentence_occurrences = self.__count_occurrences(
                keyword.text, sentences)
            keyword.inverse_document_frequency = log(
                sentences_count / keyword.sentence_occurrences)

    def __count_occurrences(self, word, sentences):
        return sum(1 for sentence in sentences if word in sentence)

    def process(self) -> List[KeywordTfIdf]:
        self.__calculate_term_frequency()
        self.__calculate_inverse_document_frequency()
        return self.__keywords


def calculate_TF_IDF(text, keywords: Iterable[Keyword], limit: int = None) -> Iterator[KeywordTfIdf]:
    metric = TfIdf(text, keywords)
    keywords = metric.process()
    keywords = sorted(
        keywords, key=lambda keyword: keyword.tf_idf, reverse=True)
    return islice(keywords, limit)
