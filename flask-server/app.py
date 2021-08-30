from typing import Dict, List
from flask import Flask
from flask import request
from flask import jsonify

from Models import Writeup
from Database import Database

app = Flask(__name__)
db : Database = Database()

v1_prefix : str = '/api/v1'

@app.route(f'{v1_prefix}/writeups/<int:writeup_id>', methods = ['GET', 'PUT'])
def writeup_id(writeup_id : int):
    if request.method == 'GET':
        data : Writeup = db.get_writeup_from_id(writeup_id)
        return jsonify(data.to_json())
    
    return f'You updated id: {writeup_id}'


@app.route(f'{v1_prefix}/writeups', methods = ['POST'])
def post_writeup():
    return f'You uploaded a writeup'


@app.route(f'{v1_prefix}/search', methods = ['GET'])
def searh_writeup():
    query_string = request.args.get('q', None)
    filters : List[str] = {}

    filters['contest_name'] = request.args.get('contest_name', None)
    filters['challenge_name'] = request.args.get('challenge_name', None)
    filters['category'] = request.args.get('category', None)
    filters['source'] = request.args.get('source', None)

    data : List[Writeup] = db.query_writeups(query_string, filters)

    return jsonify([x.to_json() for x in data])


if __name__ == '__main__':
    app.run(debug = True)