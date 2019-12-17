# Supplements API Documentation
The Supplements API provides a list of 9 of the more popular workout supplements and a description of why they are used.

## Get a list of all supplements in this database.
**Request Format:** /supplements

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Return a list of all the supplements you can look up in this API.


**Example Request:** /creatine

**Example Response:**
```json
{
  "name": "Creatine",
  "description": "A molecule that is naturally created within the human body that provides energy for muscles. Dietary supplementation may increase this content by up to 40%."
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid supplement name, returns an error with the message: `Supplement does not exist on this database.`

## Get a list of all resources for supplements in this database.
**Request Format:** /sources

**Request Type:** GET

**Returned Data Format**: Text

**Description:** Return a list of all the supplements with natural food sources you can look up in this API.

**Example Request:** /sources

**Example Response:**
```
Creatine:
red meat, fish
Beta-Alanine:
meat, poultry, fish
BCAAs:
dairy, meat, fish, beans
Protein:
dairy, meat, fish
Caffeine:
coffee, tea
Glutamine:
dairy, meat, fish, vegetables
Carnitine:
dairy, meat, fish
Fish Oil:
mackerel, salmon, cod
Citrulline:
watermelon, pumpkins, cucumbers
```
