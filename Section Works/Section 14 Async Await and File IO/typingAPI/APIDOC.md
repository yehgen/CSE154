# *Tricky Typing Test* API Documentation
This API can provide random words for use in a typing test, update high scores
for the typing test, and provide the list of high scores.

## /words
**Request Format:** /words[?limit=*limit*]

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Fetches random words from the English dictionary. By default it will return 250 words, but the optional limit query parameter can control exactly how many are returned. Words are space separated in the response.


**Example Request:** /words?limit=5

**Example Response:**

```
aardvark misapply speedboat exponentiation gesticulation
```

**Error Handling:** Responds with a 400 status plain text message if limit is below 1.

## /highscore
**Request Format:** /highscore[?limit=*limit*]

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Retrieves the high scores from the servers. If the optional limit parameter is given, it will only return up to the provided limit of top scores.

**Example Request:** /highscore?limit=2

**Example Response:**

```json
[
  {
    "name": "opos",
    "score": 100
  },
  {
    "name": "deo",
    "score": 56
  }
]
```

**Error Handling:**
Responds with a 400 status plain text message if limit is below 1.

## /highscore/:name/:score
**Request Format:** /highscore/:name/:score

**Request Type:** GET (Though perhaps it should be POST later...)

**Returned Data Format**: Plain Text

**Description:** Adds the entry to the high score list with the given name and score.

**Example Request:** /highscore/mowgli/250

**Example Response:** Entry successfully added!

**Error Handling:**
Responds with a 400 status plain text message if the provided score is not an integer.
