from typing import Iterable, Iterator
from dataclasses import dataclass
import string

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

from collections import Counter


@dataclass
class Keyword:
    text: str
    occurrences: float


class KeywordExtraction:
    def __init__(self, language='english'):
        self.language = language
        self.stop_words = set(stopwords.words(self.language))
        self.stop_words.update(string.punctuation)
        self.filters = [
            lambda word: word not in self.stop_words,
            lambda word: len(word) > 2
        ]

    def add_filter(self, predicate):
        self.filters.append(predicate)

    def extract(self, text: str, limit: int = None) -> Iterator[Keyword]:
        words = word_tokenize(text, self.language)
        keywords = self.__apply_filters(words)

        word_counter = Counter(keywords)
        return map(lambda keyword: Keyword(keyword[0], keyword[1]), word_counter.most_common(limit))

    def __apply_filters(self, words: Iterable[str]) -> Iterator[str]:
        for predicate in self.filters:
            words = filter(predicate, words)
        return words
