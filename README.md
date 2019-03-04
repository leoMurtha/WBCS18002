# WBCS18002
Official repository for the WBCS18002 Web Engineering Project.

## Group 26

# Case Study Description
The Web app to be developed helps users to decide which carriers (airlines) and
which airports to use in the USA for their air travel needs. It builds on the
Airline delays dataset made available by the CORGIS dataset project, itself a
curated version of the data published by the Bureau of Transporation Statistics
of the US Government. Both a JSON and a CSV version of the dataset are
available. It contains statistics for all reported delays per carrier per airport per month in the USA from 2003 to 2016
The goal of this project is to deliver to users both basic and advanced features
based on this dataset as a Web app. It comes with a minimum set of
requirements on what features are to be delivered, and fosters creativity on the
app developer side by allowing for identification of further features proposed
and implemented by each group.

# API Documentation

# Introduction
 This documentation describes each API call possibilities following the template bellow (author: https://gist.github.com/iros/3426278).

***Template***
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

# API 

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
	      	"id": 123,
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
                  "id": 124,
		  "link": "/carriers/124"
              },
              {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
                  "id": 144,
		  "link": "/carriers/144"
              }
          ]
      },

      {
          "airport": {
              "code": "AHR",
              "name": "American Hour Rapid",
	      "id": 125,
              "link": "/airports/125"
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
		  "id": 124,
                  "link": "/carriers/124"
              },
              {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
		  "id": 144,
                  "link": "/carriers/144"
              }
          ]
      }
    ]
    ```
    
    
   
    
   
    If CSV:
    
    
| ﻿"airport__code" | airport__name                                | airport__link | flights_statistics__cancelled | flights_statistics__on time | flights_statistics__total | flights_statistics__delayed | flights_statistics__diverted | carriers__code | carriers__name         | carriers__link |
|-----------------|----------------------------------------------|---------------|-------------------------------|-----------------------------|---------------------------|-----------------------------|------------------------------|----------------|------------------------|----------------|
| PHL             | Philadelphia, PA: Philadelphia International | /airports/123 | 7                             | 600                         | 759                       | 151                         | 1                            | AA             | American Airlines Inc. | /carriers/124  |
|                 |                                              |               |                               |                             |                           |                             |                              | AS             | Alaska Airlines Inc.   | carriers/144   |
| AHR             | American Hour Rapid                          | /airports/123 | 7                             | 600                         | 759                       | 151                         | 1                            | AA             | American Airlines Inc. | /carriers/124  |
|                 |                                              |               |                               |                             |                           |                             |                              | AS             | Alaska Airlines Inc.   | carriers/144   |
   
 
* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**

  ```curl -H "Accept: application/json" 'http://server/airports?month=5&year=2008```
  
  ```javascript
    $.ajax({
      url: "/airports",
      type : "GET",
      dataType: "csv",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

  * If the user wishes to retrieve data on different dates then he should pass the optional parameter data in the valid format.
  * User should also use the Accept header for specifying the extension of the response (json or csv). The default is json.
  
**All carriers operating in US airports**
----
  Returns json/csv list of links to the available carriers operating at airports in the USA along with their latest statistics.

* **URL**

  /carriers

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
          "carrier": {
                  "code": "AA",
                  "name": "American Airlines Inc.",
		  "id": 124,
                  "link": "/carriers/124"
              },
          "carrier_statistics": {
              "cancelled": 40,
              "on time": 259,
              "total": 400,
              "delayed": 101,
              "diverted": 0
              },
            "airports":[{
              "code": "AHR",
              "name": "American Hour Rapid",
	      "id": 126,
              "link": "/airports/126"
              },
              {
              "code": "PHL",
              "name": "Philadelphia, PA: Philadelphia International",
              "id": 127,
	      "link": "/airports/127"
              }
            ]
          }, 
          {
           "carrier": {
                  "code": "AS",
                  "name": "Alaska Airlines Inc.",
                  "id": 144,
		  "link": "/carriers/144"
              },
          "carrier_statistics": {
               "cancelled": 15,
              "on time": 211,
              "total": 245,
              "delayed": 10,
              "diverted": 9
              },
            "airports":[{
              "code": "AHR",
              "name": "American Hour Rapid",
              "id": 133,
	      "link": "/airports/133"
              },
              {
              "code": "PHL",
              "name": "Philadelphia, PA: Philadelphia International",
              "id": 134,
	      "link": "/airports/134"
              }
            ]
          }
      ]
    ```
    
    
   
    
    If CSV:


| ﻿"carrier__code" | carrier__name          | carrier__id | carrier__link | carrier_statistics__cancelled | carrier_statistics__on time | carrier_statistics__total | carrier_statistics__delayed | carrier_statistics__diverted | airports__code | airports__name                               | airports__id | airports__link |
|-----------------|------------------------|-------------|---------------|-------------------------------|-----------------------------|---------------------------|-----------------------------|------------------------------|----------------|----------------------------------------------|--------------|----------------|
| AA              | American Airlines Inc. | 124         | /carriers/124 | 40                            | 259                         | 400                       | 101                         | 0                            | AHR            | American Hour Rapid                          | 126          | /airports/126  |
|                 |                        |             |               |                               |                             |                           |                             |                              | PHL            | Philadelphia, PA: Philadelphia International | 127          | /airports/127  |
| AS              | Alaska Airlines Inc.   | 144         | /carriers/144 | 15                            | 211                         | 245                       | 10                          | 9                            | AHR            | American Hour Rapid                          | 133          | /airports/133  |
|                 |                        |             |               |                               |                             |                           |                             |                              | PHL            | Philadelphia, PA: Philadelphia International | 134          | /airports/134  |


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
      url: "/carriers",
      type : "GET",
      dataType: json
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

  If the user wishes to retrieve data on different dates then he should pass the optional parameter data in the valid format.
  
  



**Show Airport Informations**
----
  Returns **all carriers operating at a specific airport** and related statistics on a specific month and year. If case neither the year or the month are specify, the default will be the most recent date.

* **URL**

`/airports/:id`

* **Method:**

`GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `month=[integer]`
   `year=[integer]`

* **Success Response:**
  
  If JSON:
      
```javascript
{
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "link": "/airports/123",
        "parent_link": "/airports"
    },
    "routes_link": "/airports/123/routes",
    "carriers": [{
            "code": "AA",
            "name": "American Airlines Inc.",
            "id": 124,
            "link": "/carriers/124",
            "date": {
                "year": 2003,
                "month": 6
            },
            "statistics": {
                "flights": {
                    "cancelled": 5,
                    "on time": 561,
                    "total": 752,
                    "delayed": 186,
                    "diverted": 0,
                    "link": "/airports/123?carrier=124&statistics='flights'&minimal=true"
                }
            }
        },
        {
            "code": "AS",
            "name": "Alaska Airlines Inc.",
            "id": 144,
            "link": "/carriers/144",
            "date": {
                "year": 2003,
                "month": 6
            },
            "statistics": {
                "flights": {
                    "cancelled": 0,
                    "on time": 44,
                    "total": 60,
                    "delayed": 16,
                    "diverted": 0,
                    "link": "/airports/123?carrier=124&statistics='flights'&minimal=true"
                }
            }
        }
    ]
}
```

If CSV:

| ﻿"airport__code" | airport__name                                | airport__id | airport__link | airport__parent_link | routes_link          | carriers__code | carriers__name         | carriers__id | carriers__link | carriers__date__year | carriers__date__month | carriers__statistics__flights__cancelled | carriers__statistics__flights__on time | carriers__statistics__flights__total | carriers__statistics__flights__delayed | carriers__statistics__flights__diverted | carriers__statistics__flights__link                         |
|-----------------|----------------------------------------------|-------------|---------------|----------------------|----------------------|----------------|------------------------|--------------|----------------|----------------------|-----------------------|------------------------------------------|----------------------------------------|--------------------------------------|----------------------------------------|-----------------------------------------|-------------------------------------------------------------|
| PHL             | Philadelphia, PA: Philadelphia International | 123         | /airports/123 | /airports            | /airports/123/routes | AA             | American Airlines Inc. | 124          | /carriers/124  | 2003                 | 6                     | 5                                        | 561                                    | 752                                  | 186                                    | 0                                       | /airports/123?carrier=124&statistics='flights'&minimal=true |
|                 |                                              |             |               |                      |                      | AS             | Alaska Airlines Inc.   | 144          | /carriers/144  | 2003                 | 6                     | 0                                        | 44                                     | 60                                   | 16                                     | 0                                       | /airports/123?carrier=124&statistics='flights'&minimal=true |


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid id" }`

  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "`Invalid method`" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/airports/:id",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**
	* If no date (month and year) are specified, the most recent date is used.




**All statistics about flights of a carrier from/to a US airport for a given month or all months available.**
----
  Returns json or csv all of the statistics about flights of a carrier from/to a US airport for a given month or all months available.

* **URL**

/airports/:id?carrier=:carrier_id&statistics='flights'

* **Method:**
  `GET`| `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   **Required:**
   `id=[integer]`
   `carrier_id=[integer]`
   `statistics=['flights' | 'delays']` 
    
   **Optional:**
   `month=[integer]`
	`year=[integer]`

* **Data Params**
		
	```javascript
    {
	    u: {
	        "cancelled": [integer],
	        "on time": [integer],
	        "total": [integer],
	        "delayed": [integer],
	        "diverted": [integer]
	    }
	}
    ```
    

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "link": "/airports/123"
    },
    "carrier": {
        "code": "AA",
        "name": "American Airlines Inc.",
        "id": 124,
        "link": "/carriers/124",
    },
    "flights_statistics": {
        "cancelled": 5,
        "on time": 561,
        "total": 752,
        "delayed": 186,
        "diverted": 0
    },
    "date": {
        "year": 2003,
        "month": 6
    }
    ```
       

	
	If CSV:
	
| airport/code | airport/name | airport/id | airport/link | carrier/code | carrier/name | carrier/id | carrier/link | flights_statistics/cancelled | flights_statistics/on time | flights_statistics/total | flights_statistics/delayed | flights_statistics/diverted | date/year | date/month |
|--------------|----------------------------------------------|------------|---------------|--------------|------------------------|------------|---------------|------------------------------|----------------------------|--------------------------|----------------------------|-----------------------------|-----------|------------|
| PHL | Philadelphia, PA: Philadelphia International | 123 | /airports/123 | AA | American Airlines Inc. | 124 | /carriers/124 | 5 | 561 | 752 | 186 | 0 | 2003 | 6 |
    

   
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Airport not found" }
    { error : "Carrier not found" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid statistics type" }`
	
   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid data in POST/PUT" }`


* **Sample Call:**

  ```curl -H "Accept: application/json" http://server//airports/123?carrier=1234&statistics='flights'```
  
  ```javascript
	$.ajax({
      type: 'POST',
      url: "/airports/123?carrier=1245&statistics='flights'",
      data:{ 
			   u: {
			       "cancelled": 5,
		           "on time": 561,
			       "total": 752,
			       "delayed": 186,
	             "diverted": 0
		          }  
		      }   
      dataType: "json",
      success: function(resultData) { alert("Post Complete") }
	});

    $.ajax({
      url: "/airports/123?carrier=1245&statistics='flights'",
      type : "GET",
      dataType: "csv",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

   * User also should use the Accept header for specifying the extension of the response (json or csv) the default is json.



**Number of on-time, delayed, and cancelled flights of a carrier from/to a US airport for a given month or for all months available.**
----
  Returns - as json/csv - a minimal representation of the statistics about flights of a carrier from/to a US airport for a given month or for all months available.

* **URL**
/airports/:id?carrier=:carrier_id&statistics='flights'&minimal=true

* **Method:**
  `GET`
  
*  **URL Params**

   **Required:**
   `id=[integer]`
   `carrier_id=[integer]`
   `statistics=['flights' | 'delays']` 
   `minimal=[boolean]`
    
   **Optional:**
   `month=[integer]`
	`year=[integer]`  

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "link": "/airports/123"
    },
    "carrier": {
        "code": "AA",
        "name": "American Airlines Inc.",
        "id": 124,
        "link": "/carriers/124",
    },
    "flights_statistics": {
        "cancelled": 5,
        "on time": 561,
        "delayed": 186,
	"all_statistics": "/airports/123?carrier=1245&statistics='flights'"
	   },
    "date": {
        "year": 2003,
        "month": 6
    }
    ```
       

	
	If CSV:
	
| airport/code | airport/name                                 | airport/id | airport/link  | carrier/code | carrier/name           | carrier/id | carrier/link  | flights_statistics/cancelled | flights_statistics/on time | flights_statistics/delayed | flights_statistics/all_statistics               | date/year | date/month |
|--------------|----------------------------------------------|------------|---------------|--------------|------------------------|------------|---------------|------------------------------|----------------------------|----------------------------|-------------------------------------------------|-----------|------------|
| PHL          | Philadelphia, PA: Philadelphia International | 123        | /airports/123 | AA           | American Airlines Inc. | 124        | /carriers/124 | 5                            | 561                        | 186                        | /airports/123?carrier=1245&statistics='flights' | 2003      | 6          |
    

   
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Airport not found" }
    { error : "Carrier not found" }`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid statistics type" }`
	

* **Sample Call:**

  ```curl -H "Accept: application/json" http://server//airports/123?carrier=1234&statistics='flights'&minimal=true```
  
  ```javascript
	$.ajax({
      url: "/airports/123?carrier=1245&statistics='flights'&minimal=true",
      type : "GET",
      dataType: "csv",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

   * User also should use the Accept header for specifying the extension of the response (json or csv) the default is json.
   
   
<<<<<<< HEAD
 **Number of minutes of delay per carrier attributed to carrier-specific reasons (i.e. attributes carrier and late aircraft in the dataset) or to all reasons, for a given month or for all months available and for a specific airport or across all US airports**
----
  Returns a json/csv list of number of minutes of delay per carrier in general or with specific attributes.
=======
 **Show carrier informations**
----
  Returns json/csv data containing informations of the specified carrier which includes the number of minutes of delay per carrier attributed to carrier-specific reasons (i.e. attributes carrier and late aircraft in the dataset)/all reasons, for a given month/all months available and for a specific airport/across all US airports. 
>>>>>>> 073b6f8137d3efd091b211bc4d9b16d9c59fd095


* **URL**

  /carriers/:id

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:** 


   **Optional:**

    `month=[integer]
    `
    `year=[integer]`
    
    `airport_id=[integer] `
    
    `reasons=['all' | 'carrier_reasons']`
    
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
<<<<<<< HEAD
   Number of minutes of delay per carrier attributed to all reasons for all months available (on this example only the months 6 and 7 of 2003) and across all US airports (which on this example are only 3)
=======
   
      Number of minutes of delay per carrier attributed to carrier-specific reasons for all airports for all months available (on this example only the months 6 and 7 of 2003) and across all US airports (which on this example are only 3).
>>>>>>> 073b6f8137d3efd091b211bc4d9b16d9c59fd095

 If JSON  
 ```javascript
      [
          {
          "carrier": {
            "code": "AA",
            "name": "American Airlines Inc.",
            "id": 124,
            "link": "/carriers/124",
            "date": {    
                "year": 2003, 
                "month": 6,
                "link": "/carriers/124?month=6&year=2003"
              } 
            },    
            "minutes delayed": {
              "all": 8314, 
                
                "carrier_reasons":{
                  "late aircraft": 1269, 
                  "carrier": 1367,   
                  "all_reasons_link": "/carriers/124?reasons=all"

                }
                
            },
            "airports": [{
                "id": 134,
                "code": "PHL",
                "name": "Philadelphia, PA: Philadelphia International",
                "link": "/airports/134"
              },
                {
                "id": 123,
                "code": "AHR",
                "name": "American Hour Rapid",
                "link": "/airports/123"
                }
            ]
          },

          {
            "carrier": 
              {
              "code": "AA",
              "name": "American Airlines Inc.",
              "id": 124,
              "link": "/carriers/124",
              
              "date": 
                {    
                  "year": 2003, 
                  "month": 7,
                  "link": "/carriers/124?month=7&year=2003"
                } 
              },    
              "minutes delayed": 
              {
                
                "all": 7678, 
                
                "carrier_reasons":{
                  "late aircraft": 1000, 
                  "carrier": 1000,   
                  "all_reasons_link": "/carriers/124?reasons=all"

                }
                        
              },
              "airports":
              [ {
                "id": 134,
                "code": "PHL",
                "name": "Philadelphia, PA: Philadelphia International",
                "link": "/airports/134"
                },
                {
                "id": 123,
                "code": "AHR",
                "name": "American Hour Rapid",
                "link": "/airports/123"
                }
              ]
          },

          {
            "carrier":
            {
              "code": "AS",
              "name": "Alaska Airlines Inc.",
              "id": 144,
              "link": "/carriers/144",
             
              "date": 
              {    
                "year": 2003, 
                "month": 6,
                "link": "/carriers/144?month=6&year=2003"
              } 
            },    
            "minutes delayed": 
            {
                
                "all": 7645, 
               
                "carrier_reasons":{
                  "late aircraft": 1001, 
                  "carrier": 1002,   
                  "all_reasons_link": "/carriers/144?reasons=all"

                }
                      
            },
            "airports":
            [ {
              "id": 133,
              "code": "ATL",
              "name": "Atlanta, GA: Hartsfield-Jackson Atlanta International",
              "link": "/airports/133"
              },
              {
              "id": 123,
              "code": "AHR",
              "name": "American Hour Rapid",
              "link": "/airports/123"
              }
            ]
          },
          {
            "carriers":
            {
              "code": "AS",
              "name": "Alaska Airlines Inc.",
              "id": 144,
              "link": "/carriers/144",

              "date": 
              {    
                "year": 2003, 
                "month": 7,
                "link": "/carriers/144?month=7&year=2003"
              } 
            },    
            "minutes delayed": 
            {
                
                "all": 7656, 
                
                "carrier_reasons":{
                  "late aircraft": 1000, 
                  "carrier": 1000,   
                  "all_reasons_link": "/carriers/144?reasons=all"

                }
                      
            },
            "airports":
            [ {
              "id":133,
              "code": "ATL",
              "name": "Atlanta, GA: Hartsfield-Jackson Atlanta International",
              "link": "/airports/133"
              },
              {
              "id": 123,
              "code": "AHR",
              "name": "American Hour Rapid",
              "link": "/airports/123"
              }
            ]
          }
        ]
```
    
  
  If CSV:


| ﻿"carriers__code" | carriers__name       | carriers__id | carriers__link | carriers__date__year | carriers__date__month | carriers__date__link            | carrier__code | carrier__name          | carrier__id | carrier__link | carrier__date__year | carrier__date__month | carrier__date__link             | minutes delayed__all | minutes delayed__carrier_reasons__late aircraft | minutes delayed__carrier_reasons__carrier | minutes delayed__carrier_reasons__all_reasons_link | airports__id | airports__code | airports__name                                        | airports__link |
|------------------|----------------------|--------------|----------------|----------------------|-----------------------|---------------------------------|---------------|------------------------|-------------|---------------|---------------------|----------------------|---------------------------------|----------------------|-------------------------------------------------|-------------------------------------------|----------------------------------------------------|--------------|----------------|-------------------------------------------------------|----------------|
|                  |                      |              |                |                      |                       |                                 | AA            | American Airlines Inc. | 124         | /carriers/124 | 2003                | 6                    | /carriers/124?month=6&year=2003 | 8314                 | 1269                                            | 1367                                      | /carriers/124?reasons=all                          | 134          | PHL            | Philadelphia, PA: Philadelphia International          | /airports/134  |
|                  |                      |              |                |                      |                       |                                 |               |                        |             |               |                     |                      |                                 |                      |                                                 |                                           |                                                    | 123          | AHR            | American Hour Rapid                                   | /airports/123  |
|                  |                      |              |                |                      |                       |                                 | AA            | American Airlines Inc. | 124         | /carriers/124 | 2003                | 7                    | /carriers/124?month=7&year=2003 | 7678                 | 1000                                            | 1000                                      | /carriers/124?reasons=all                          | 134          | PHL            | Philadelphia, PA: Philadelphia International          | /airports/134  |
|                  |                      |              |                |                      |                       |                                 |               |                        |             |               |                     |                      |                                 |                      |                                                 |                                           |                                                    | 123          | AHR            | American Hour Rapid                                   | /airports/123  |
|                  |                      |              |                |                      |                       |                                 | AS            | Alaska Airlines Inc.   | 144         | /carriers/144 | 2003                | 6                    | /carriers/144?month=6&year=2003 | 7645                 | 1001                                            | 1002                                      | /carriers/144?reasons=all                          | 133          | ATL            | Atlanta, GA: Hartsfield-Jackson Atlanta International | /airports/133  |
|                  |                      |              |                |                      |                       |                                 |               |                        |             |               |                     |                      |                                 |                      |                                                 |                                           |                                                    | 123          | AHR            | American Hour Rapid                                   | /airports/123  |
| AS               | Alaska Airlines Inc. | 144          | /carriers/144  | 2003                 | 7                     | /carriers/144?month=7&year=2003 |               |                        |             |               |                     |                      |                                 | 7656                 | 1000                                            | 1000                                      | /carriers/144?reasons=all                          | 133          | ATL            | Atlanta, GA: Hartsfield-Jackson Atlanta International | /airports/133  |
|                  |                      |              |                |                      |                       |                                 |               |                        |             |               |                     |                      |                                 |                      |                                                 |                                           |                                                    | 123          | AHR            | American Hour Rapid                                   | /airports/123  |




* **Error Response:**
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Invalid date" } { error : "Airport not found"}`

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date format" }`
  
  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`
  

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/carriers/:id",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**

  If the user wishes to retrieve data from a specific airport or on specific month or attributed to carrier-specific reasons then he should pass the optional parameter data in the valid format.
  In this case, there would be a query on the URL such as the example below:

  ```/carriers/1232?airport_id=134&month=6```


**Show airport routes.**
----
  Returns a json/csv response containing the routes that the current airport does.

* **URL**
/airports/:id/routes

* **Method:**
  `GET`
  
*  **URL Params**

   **Required:**
   `id=[integer]`
    
   **Optional:**
   
   `month=[integer]`
   `year=[integer]`  

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
    If JSON:
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "link": "/airports/123"
    },
    "routes": [{
            "code": "AHR",
	        "name": "American Hour Rapid",
	        "link": "/airports/133",
	        "route": "/airports/123/routes?destiny=133"
        },
        {
            "code": "ATT",
	        "name": "American True True",
	        "link": "/airports/139",
	        "route": "/airports/123/routes?destiny=139"
        }
	],
    "date": {
        "year": 2003,
        "month": 6
    }
    ```
       

	
	If CSV:
	
| ﻿"airport__code" | airport__name                                | airport__id | airport__link | routes__code | routes__name        | routes__link  | routes__route                    | date__year | date__month |
|-----------------|----------------------------------------------|-------------|---------------|--------------|---------------------|---------------|----------------------------------|------------|-------------|
| PHL             | Philadelphia, PA: Philadelphia International | 123         | /airports/123 | AHR          | American Hour Rapid | /airports/133 | /airports/123/routes?destiny=133 | 2003       | 6           |
|                 |                                              |             |               | ATT          | American True True  | /airports/139 | /airports/123/routes?destiny=139 |            |             |

   
 
* **Error Response:**
  
  * **Code:** 404 NOT FOUND  <br />
    **Content:** `{ error : "Airport not found"}` 
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid date" }`

* **Sample Call:**

  ```curl -H "Accept: application/json" http://server//airports/123/routes```
  
  ```javascript
      $.ajax({
      	url: "/airports/123/routes,
      	type : "GET",
      	dataType: "csv",
      	success : function(r) {
        	console.log(r.routes);
      	}
    	});
  ```
* **Notes:**

   * User also should use the Accept header for specifying the extension of the response (json or csv) the default is json.
   
 

**Show route between two airports**
----
  Returns **descriptive statistics (mean, median, standard deviation) for carrier-specific delays (as above) for a flight between any two airports in the USA for a specific carrier or for all carriers serving this route**.
  
* **URL**

`/airports/:id/routes?destiny=:airport_id`
or
`/airports/:id/routes?destiny=:airport_id&carrier=:carrier_id`

* **Method:**

`GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`
    `airport_id=[integer]`

   **Optional:**
 
   `carrier_id=[integer]`

* **Success Response:**
  
  If JSON and All Carriers:
      
```javascript  
{
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "link": "/airports/123"
    },
    "destiny": {
        "code": "AHR",
        "name": "American Hour Rapid",
        "id": 125,
        "link": "/airports/125"
    },
    "link": "/airports/125/routes?destiny=125",
    "link_back": "/airports/123/routes",
    "carriers": [{
            "code": "AA",
            "name": "American Airlines Inc.",
            "id": 124,
            "link": "/carriers/124",
            "link_route": "/airports/125/routes?destiny=125&carrier=124",
            "statistics": {
                "# of delays": {
                    "late aircraft": {
                        "mean": 18,
                        "median": 17,
                        "standart deviation": 3
                    },
                    "carrier": {
                        "mean": 34,
                        "median": 32,
                        "standart deviation": 5
                    }
                },
                "minutes delayed": {
                    "late aircraft": {
                        "mean": 1269,
                        "median": 1200,
                        "standart deviation": 100
                    },
                    "carrier": {
                        "mean": 1367,
                        "median": 1300,
                        "standart deviation": 150
                    }
                },
                "link": "/airports/123?carrier=124&statistics='flights'&minimal=true"
            }
        },
        {
            "code": "AS",
            "name": "Alaska Airlines Inc.",
            "id": 144,
            "link": "/carriers/144",
            "link_route": "/airports/125/routes?destiny=125&carrier=144",
            "statistics": {
                "# of delays": {
                    "late aircraft": {
                        "mean": 20,
                        "median": 19,
                        "standart deviation": 2
                    },
                    "carrier": {
                        "mean": 24,
                        "median": 22,
                        "standart deviation": 5
                    }
                },
                "minutes delayed": {
                    "late aircraft": {
                        "mean": 1459,
                        "median": 1400,
                        "standart deviation": 200
                    },
                    "carrier": {
                        "mean": 1134,
                        "median": 1100,
                        "standart deviation": 100
                    }
                },
                "link": "/airports/123?carrier=144&statistics='flights'&minimal=true"
            }
        }
    ]
}
```


If CSV:

```markdown
| ﻿"airport__code" | airport__name                                | airport__id | airport__link | destiny__code | destiny__name       | destiny__id | destiny__link | link                             | link_back            | carriers__code | carriers__name         | carriers__id | carriers__link | carriers__link_route                         | carriers__statistics__| | carriers__statistics__|| | carriers__statistics__||__mean | carriers__statistics__||__median | carriers__statistics__||__standart deviation | carriers__statistics__link                                  |
|-----------------|----------------------------------------------|-------------|---------------|---------------|---------------------|-------------|---------------|----------------------------------|----------------------|----------------|------------------------|--------------|----------------|----------------------------------------------|-------------------------|--------------------------|--------------------------------|----------------------------------|----------------------------------------------|-------------------------------------------------------------|
| PHL             | Philadelphia, PA: Philadelphia International | 123         | /airports/123 | AHR           | American Hour Rapid | 125         | /airports/125 | /airports/125/routes?destiny=125 | /airports/123/routes | AA             | American Airlines Inc. | 124          | /carriers/124  | /airports/125/routes?destiny=125&carrier=124 | # of delays             | late aircraft            | 18                             | 17                               | 3                                            | /airports/123?carrier=124&statistics='flights'&minimal=true |
|                 |                                              |             |               |               |                     |             |               |                                  |                      |                |                        |              |                |                                              |                         | carrier                  | 34                             | 32                               | 5                                            |                                                             |
|                 |                                              |             |               |               |                     |             |               |                                  |                      |                |                        |              |                |                                              | minutes delayed         | late aircraft            | 1269                           | 1200                             | 100                                          |                                                             |
|                 |                                              |             |               |               |                     |             |               |                                  |                      |                |                        |              |                |                                              |                         | carrier                  | 1367                           | 1300                             | 150                                          |                                                             |
|                 |                                              |             |               |               |                     |             |               |                                  |                      | AS             | Alaska Airlines Inc.   | 144          | /carriers/144  | /airports/125/routes?destiny=125&carrier=144 | # of delays             | late aircraft            | 20                             | 19                               | 2                                            | /airports/123?carrier=144&statistics='flights'&minimal=true |
|                 |                                              |             |               |               |                     |             |               |                                  |                      |                |                        |              |                |                                              |                         | carrier                  | 24                             | 22                               | 5                                            |                                                             |
|                 |                                              |             |               |               |                     |             |               |                                  |                      |                |                        |              |                |                                              | minutes delayed         | late aircraft            | 1459                           | 1400                             | 200                                          |                                                             |
|                 |                                              |             |               |               |                     |             |               |                                  |                      |                |                        |              |                |                                              |                         | carrier                  | 1134                           | 1100                             | 100                                          |                                                             |
```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid id" }`

  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/airports/:id/routes?destiny=:airport_id&carrier=:carrier_id&type=json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**
	* If no carrier is specified information about all carriers related to the routes are returned else only informations about the specific carrier are returned.



