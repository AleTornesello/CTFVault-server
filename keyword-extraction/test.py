import jsons

from keyword_extraction import Keyword, KeywordExtraction
from keyword_metric import KeywordTfIdf, calculate_TF_IDF


text = """The Internet Protocol(IP) is the principal communications protocol in the Internet protocol suite for relaying datagrams across network boundaries. Its routing function enables internetworking, and essentially establishes the Internet.
IP has the task of delivering packets from the source host to the destination host solely based on the IP addresses in the packet headers. For this purpose, IP defines packet structures that encapsulate the data to be delivered. It also defines addressing methods that are used to label the datagram with source and destination information.
Historically, IP was the connectionless datagram service in the original Transmission Control Program introduced by Vint Cerf and Bob Kahn in 1974, which was complemented by a connection-oriented service that became the basis for the Transmission Control Protocol(TCP). The Internet protocol suite is therefore often referred to as TCP/IP.
The first major version of IP, Internet Protocol Version 4 (IPv4), is the dominant protocol of the Internet. Its successor is Internet Protocol Version 6 (IPv6), which has been in increasing deployment on the public Internet since c. 2006.'
""".strip().lower()

keywords = list(KeywordExtraction().extract(text))
tf_idf = list(calculate_TF_IDF(text, keywords, limit=5))
print('#'*50)
print(keywords)
print('\n')
print('#'*50)
print(jsons.dump(tf_idf))
