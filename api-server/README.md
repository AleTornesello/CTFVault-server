# CTFVault-server

Backend of CTFVault - a simple search-oriented CTF writeups container

## API structure

- ctfs

```
{
	id
	name,
	competition_date,
	repository_url
}
```

- `GET /{name}` : tutte le ctf (solo i dati generali: nome, data, ecc...)
- `GET /:id` : il dettaglio di una ctf
- `POST /` : creazione ctf
- `PUT /:id` : modifica ctf
- `DELETE /:id` : cancellazione ctf

---

- challenges

```
{
	id
	name,
	writeup,
	category,
	solved_by,
	challenge_repo_url,
	tags
}
```

- `GET /{name, writeup_content, category, solved_by, tags}` : ricerca challenge
- `GET /:id` : il dettaglio di una challenge
- `POST /` : creazione challenge
- `PUT /:id` : modifica challenge
- `DELETE /:id` : cancellazione challenge
