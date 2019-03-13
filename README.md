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

## Template

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
  Returns json/csv list of links to the available airports in the USA.

* **URL**

  `/airports`

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**

   **Optional:**
     
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
      
      ```javascript
        [
          {
              "airport": {
                  "code": "PHL",
                  "name": "Philadelphia, PA: Philadelphia International",
	      	    "id": 123,
                  "url": "/airports/123"
              },
          {
              "airport": {
                  "code": "AHR",
                  "name": "American Hour Rapid",
    	      "id": 125,
                  "url": "/airports/125"
          }
          .
          .
          .
        ]
    ```
   
 
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

  * User should also use the Accept header for specifying the extension of the response (json or csv). The default is json.
  
**All carriers operating in US airports**
----
  Returns json/csv list of links to the available carriers operating at airports in the USA.

* **URL**

  `/carriers`

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:**

   **Optional:**
    
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
      
      ```javascript
      [
        {
        "carrier": {
            "code": "AA",
            "name": "American Airlines Inc.",
		        "id": 124,
            "url": "/carriers/124"
        },
        {
         "carrier": {
            "code": "AS",
            "name": "Alaska Airlines Inc.",
            "id": 144,
		        "url": "/carriers/144"
        },
        .
        .
        .
      ]
    ```
    

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
      dataType: 'csv'
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**
  * User should also use the Accept header for specifying the extension of the response (json or csv). The default is json.



**Show Airport Informations**
----
  Returns **all links to the carriers operating at a specific airport**, a link to the related statistics on a specific month and year and also a link to the airport routes. If case neither the year or the month are specified, the default will be the one with most recent date.

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

  ```javascript
  {
      "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "url": "/airports/123"
      },
      "routes_link": "/airports/123/routes",
      "carriers": [
          {
            "id": 124,
            "url": "/carriers/124?airport_id=123",
            "statistics_url":"/airports/1carrier=124&statistics='flights'"
          },
          .
          .
          .
        ]
  }
  ```


* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid id" }`

  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`

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
	    {
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
        "url": "/airports/123"
    },
    "carrier": {
        "code": "AA",
        "name": "American Airlines Inc.",
        "id": 124,
        "url": "/carriers/124",
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
			     {
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
`/airports/:id?carrier=:carrier_id&statistics='flights'&minimal=true`

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
    
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "url": "/airports/123"
    },
    "carrier": {
        "code": "AA",
        "name": "American Airlines Inc.",
        "id": 124,
        "url": "/carriers/124",
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
   
   

 **Show carrier informations**
----
  Returns json/csv data containing information of the specified carrier which includes the number of minutes of delay per carrier attributed to carrier-specific reasons (i.e. attributes carrier and late aircraft in the dataset)/all reasons, for a given month/all months available and for a specific airport/across all US airports. 


* **URL**

  `/carriers/:id`

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Required:** 
   
   `id=[integer]`


   **Optional:**

    `month=[integer]`

    `year=[integer]`
    
    `airport_id=[integer]s`
    
    `reasons=['all' | 'carrier_reasons']`
    
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    

   Number of minutes of delay per carrier attributed to all reasons for all months available (on this example only the months 6 and 7 of 2003) and across all US airports (which on this example are only 3)


 If JSON  
 ```javascript
[
    {
    "carrier": {
      "code": "AR",
      "name": "American Airlines Inc.",
      "id": 1243,
      "url": "/carriers/124",
      "date": {    
          "year": 2003, 
          "month": 6,
          "url": "/carriers/124?month=6&year=2003"
        } 
      },    
      "minutes delayed": {
          "all": 8314, 
          "carrier_reasons":{
            "late aircraft": 1269, 
            "carrier": 1367,   
            "all_reasons": "/carriers/124?reasons=all"
          }
          
      },
      "airports": [{
          "id": 134,
          "url": "/airports/134"
        },
          {
          "id": 123,
          "url": "/airports/123"
          }
      ]
    },
    .
    .
    .  
  ]
```


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

  ```/carriers/1232?airport_id=134&month=6&reasons=all```


**Show airport routes.**
----
  Returns a json/csv response containing links to the routes that the specified airport does.

* **URL**
`/airports/:id/routes`

* **Method:**
  `GET`
  
*  **URL Params**

   **Required:**
   
   `id=[integer]`
    
   **Optional:**
   
   `from=[month/year]`
   
   `to=[month/year]`  

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    
  
	```javascript
    "airport": {
        "code": "PHL",
        "name": "Philadelphia, PA: Philadelphia International",
        "id": 123,
        "url": "/airports/123"
    },
    "routes": [{
          "code": "AHR",
	        "name": "American Hour Rapid",
	        "destination_url": "/airports/133",
	        "route": "/airports/123/routes?destination=133&from=from&to=to"
        },
	],
    ```   
 
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
        	console.log(r);
      	}
    	});
  ```
* **Notes:**

   * User also should use the Accept header for specifying the extension of the response (json or csv) the default is json.
   
 

**Show route between two airports**
----
  Returns **descriptive statistics (mean, median, standard deviation) for carrier-specific delays (as above) for a flight between any two airports in the USA for a specific carrier or for all carriers serving this route**.
  
* **URL**

`/airports/:id/routes?destination=:airport_id`
or
`/airports/:id/routes?destination=:airport_id&carrier=:carrier_id`

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
    "destination": {
        "code": "AHR",
        "name": "American Hour Rapid",
        "id": 125,
        "url": "/airports/125"
    },
    "route": "/airports/125/routes?destination=125",
    "root_url": "/airports/123/routes",
    "carriers": [{
            "code": "AA",
            "name": "American Airlines Inc.",
            "id": 124,
            "url": "/carriers/124",
            "route": "/airports/125/routes?destination=125&carrier=124",
            "statistics": {
                "url": "/airports/123?carrier=124&statistics='flights'&minimal=true",
                "# of delays": {
                    "late aircraft": {
                        "mean": 18,
                        "median": 17,
                        "standard_deviation": 3
                    },
                    "carrier": {
                        "mean": 34,
                        "median": 32,
                        "standard_deviation": 5
                    }
                },
                "minutes delayed": {
                    "late aircraft": {
                        "mean": 1269,
                        "median": 1200,
                        "standard_deviation": 100
                    },
                    "carrier": {
                        "mean": 1367,
                        "median": 1300,
                        "standard_deviation": 150
                    }
                },
            }
        },
        .
        .
        .
    ]
}
```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Invalid id" }`

  * **Code:** 405 METHOD NOT ALLOWED <br />
    **Content:** `{ error : "Invalid method" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/airports/:id/routes?destination=:airport_id&carrier=:carrier_id",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
* **Notes:**
	* If no carrier is specified then the information about all carriers related to the routes are returned else only information about the specific carrier are returned.
