# CTFVault-server
Backend of CTFVault - a simple search-oriented CTF writeups container

## API
### GET /writeups/{id}
Get writeup with id

### POST /writeups
Upload writeup

### PUT /writeups/{id}
Update writeup

### GET /search?query= & category= & ....	

## Architecture
- WEB API for writeup uploading and searching
- Different parser that upload writeups through API
