from typing import Dict
from flask import Flask
from flask import request

app = Flask(__name__)

v1_prefix : str = '/api/v1'

@app.route(f'{v1_prefix}/writeups/<int:writeup_id>', methods = ['GET', 'PUT'])
def writeup_id(writeup_id : int):
    if request.method == 'GET':
        return f'You requested id: {writeup_id}'
    
    return f'You updated id: {writeup_id}'


@app.route(f'{v1_prefix}/writeups', methods = ['POST'])
def post_writeup():
    return f'You uploaded a writeup'


@app.route(f'{v1_prefix}/search', methods = ['GET'])
def searh_writeup():
    return f'You were looking for a writeup'


if __name__ == '__main__':
    app.run(debug = True)