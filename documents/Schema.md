# Schema Documentation

This document outlines the structure and fields for the `Book`, `Payment`, `User`, and `Subscription` schemas.

---

## Book

```json
{
  "title": "String",
  "type": {
    "type": "String",
    "enum": ["audiobook", "podcast"],
    "required": true
  },
  "author": "String",
  "narrator": "String",
  "duration": "Number",
  "audioFileUrl": "String",
  "categories": ["String"],
  "releaseDate": "Date",
  "reviews": [
    {
      "userId": "Number",
      "rating": "Number",
      "comment": "String"
    }
  ],
  "timestamps": true
}
```

# payment

```json
{
  "userId": "Number",
  "amount": "Number",
  "currency": "String",
  "status": {
    "type": "String",
    "enum": ["pending", "completed", "failed"]
  },
  "paymentMethod": "String",
  "createdAt": {
    "type": "Date",
    "default": "Date.now"
  }
}
```

# User

````json
{
  "name": "String",
  "email": {
    "type": "String",
    "unique": true,
    "required": true
  },
  "password": "String",
  "subscription": {
    "type": "String",
    "enum": ["free", "premium"],
    "default": "free"
  },
  "listeningHistory": [{
    "contentId": "Number",
    "lastPlayed": "Number",
    "progress": "Number"
  }],
  "bookmarks": [{
    "contentId": "Number",
    "timestamp": "Number"
  }],
  "timestamps": true
}
```
````

# Subsrciption

```json
{
  "name": "String",
  "price": "Number",
  "currency": "String",
  "features": ["String"],
  "duration": "Number" // in days
}
```
