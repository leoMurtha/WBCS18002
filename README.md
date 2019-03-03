# WBCS18002
Official repository for the WBCS18002 Web Engineering Project.
## Group 26

# API Documentation

**Title**
----
  <_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

* **URL**

  <_The URL Structure (path only, no root url)_>

* **Method:**
  
  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `photo_id=[alphanumeric]`

* **Data Params**

  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
  
**EXAMPLE Show User**
----
  Returns json data about a single user.

* **URL**

  /users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, name : "Michael Bloom" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**All airports available in the USA**
----
  Returns json/csv list of links to the available airports in the USA along with their latest statistics.

* **URL**

  /airports

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**

   **Optional:**
    
   `month=[integer]`
   
   `year=[integer]`
    
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
      
      ```javascript
        [
          {
          "airport": {
              "code": "PHL",
              "name": "Philadelphia, PA: Philadelphia International",
              "link": "/airports/123"
          },
          "date": {
              "month": 4,
              "year": 2016,
          },
          "flights_statistics": {
              "cancelled": 7,
              "on time": 600,
              "total": 759,
              "delayed": 151,
              "diverted": 1
          },
          "carriers": [{
                  "code": "AA",
                  "name": "American Airlines Inc.",
                  "link": "/carriers/124"
              },
              {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
                  "link": "/carriers/144"
              }
          ]
      },

      {
          "airport": {
              "code": "AHR",
              "name": "American Hour Rapid",
              "link": "/airports/123"
          },
          "date": {
              "month": 4,
              "year": 2016,
          },
          "flights_statistics": {
              "cancelled": 7,
              "on time": 600,
              "total": 759,
              "delayed": 151,
              "diverted": 1
          },
          "carriers": [{
                  "code": "AA",
                  "name": "American Airlines Inc.",
                  "link": "/carriers/124"
              },
              {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
                  "link": "/carriers/144"
              }
          ]
      }
    ]
    ```
    
    
   
    
    If CSV:
    
| ﻿"airport__code" | airport__name                                | airport__link | 	flights_statistics__cancelled | flights_statistics__on time | flights_statistics__total | flights_statistics__delayed | flights_statistics__diverted | carriers__code | carriers__name         | carriers__link |
|-----------------|----------------------------------------------|---------------|-------------------------------|-----------------------------|---------------------------|-----------------------------|------------------------------|----------------|------------------------|----------------|
| PHL             | Philadelphia, PA: Philadelphia International | /airports/123 | 7                             | 600                         | 759                       | 151                         | 1                            | AA             | American Airlines Inc. | /carriers/124  |
|                 |                                              |               |                               |                             |                           |                             |                              | AS             | Alaska Airlines Inc.   | /carriers/144  |
| AHR             | American Hour Rapid                          | /airports/123 | 7                             | 600                         | 759                       | 151                         | 1                            | AA             | American Airlines Inc. | /carriers/124  |
|                 |                                              |               |                               |                             |                           |                             |                              | AS             | Alaska Airlines Inc.   | /carriers/144  |    
 
   
 
* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**
  ```curl -H "Accept: application/json" 'http://server/airports```
  
  ```javascript
    $.ajax({
      url: "/airports?type=json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

  If the user wishes to retrieve data on different dates then he should pass the optional parameter data in the valid format.
  User also should use the Accept header for specifying the extension of the response (json or csv) the default is json.

**All carriers operating in US airports**
----
  Returns json/csv list of links to the available airports in the USA along with their latest statistics.

* **URL**

  /airports

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**
 
   `type=[json | csv]`

   **Optional:**
    
   `date=[month/year] (6/2008)`
    
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
      
      ```javascript
        [
          {
          "airport": {
              "code": "PHL",
              "name": "Philadelphia, PA: Philadelphia International",
              "link": "/airports/123"
          },
          "flights_statistics": {
              "cancelled": 7,
              "on time": 600,
              "total": 759,
              "delayed": 151,
              "diverted": 1
          },
          "carriers": [{
                  "code": "AA",
                  "name": "American Airlines Inc.",
                  "link": "/carriers/124"
              },
              {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
                  "link": "/carriers/144"
              }
          ]
      },

      {
          "airport": {
              "code": "AHR",
              "name": "American Hour Rapid",
              "link": "/airports/123"
          },
          "flights_statistics": {
              "cancelled": 7,
              "on time": 600,
              "total": 759,
              "delayed": 151,
              "diverted": 1
          },
          "carriers": [{
                  "code": "AA",
                  "name": "American Airlines Inc.",
                  "link": "/carriers/124"
              },
              {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
                  "link": "/carriers/144"
              }
          ]
      }
    ]
    ```
    
    
   
    
    If CSV:
    
      Code |  Airport Name        |  Airport Link  |  Statistics
      -----|----------------------|----------------|-----------------
      PHL  |  Philadelphia Int... |  /airports/123 |  {cancelled: 7,}
      AHL  |  American Hour Rapid |  /airports/123 |  House Tyrell
 
   
 
* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/airports?type=json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

  If the user wishes to retrieve data on different dates then he should pass the optional parameter data in the valid format.

