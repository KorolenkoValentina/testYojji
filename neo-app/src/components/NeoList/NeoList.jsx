
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import NeoListItem from '../NeoListItem/NeoListItem ';

const API_KEY = '6sNjGOfATiWxAKPySg07YfFbxWfLaVlAZrKXbiox';
const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&api_key=${API_KEY}`;


const NeoList = () => {
  const [neos, setNeos] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Function to retrieve data from API
  const fetchData = async () => {
    try {
      const startDate = getCurrentStartDate();
      const endDate = getEndDate(startDate);
      const url = API_URL.replace('START_DATE', startDate);

      // Making a GET request to the API using the axios library
      const response = await axios.get(url);
      const data = response.data;

      const neoList = parseData(data, startDate, endDate);

      neoList.forEach((neo) => {
        addNeoToList(neo);
      });

      // Restart the data request after 5 seconds
      setTimeout(fetchData, 5000);
    } catch (error) {
      console.error('Error fetching NEO data:', error);
    }
  };

    // Function to get the current date in the format expected by API
    const getCurrentStartDate = () => {
      const today = new Date();
      const day = 1;
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };

    // Function for getting the end date based on the start date
    const getEndDate = (startDate) => {
    // Split the start date into year, month and day
    const [year, month, day] = startDate.split('-').map(Number);

    // Create a new date based on the start date
    const endDate = new Date(year, month - 1, day);
    endDate.setDate(endDate.getDate() + 6);

    //Get the year, month and day values for the end date
    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth() + 1;
    const endYear = endDate.getFullYear();

    return `${endYear}-${endMonth.toString().padStart(2, '0')}-${endDay.toString().padStart(2, '0')}`;
  };

  // Function for parsing data and forming the NEO list
  const parseData = (data, startDate, endDate) => {
    const neosData = data.near_earth_objects;
    const neoList = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const neos = neosData[currentDate];
      if (neos) {
        const aggregatedData = aggregateData(neos);
        aggregatedData.index = currentDate;
        neoList.push(aggregatedData);
      }
      currentDate = getNextDate(currentDate);
    }

    return neoList;
  };

  // Function to get the next date
  const getNextDate = (currentDate) => {
    // Split the current date into year, month and day
    const [year, month, day] = currentDate.split('-').map(Number);

    // Create a new date based on the current date
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);

    // We get the year, month and day values for the following date
    const nextDay = date.getDate();
    const nextMonth = date.getMonth() + 1;
    const nextYear = date.getFullYear();

    // Format the next date as a string and return it
    if (nextMonth > month) {
      return `${nextYear}-${nextMonth.toString().padStart(2, '0')}-01`;
    } else {
      return `${nextYear}-${nextMonth.toString().padStart(2, '0')}-${nextDay.toString().padStart(2, '0')}`;
    }
  };

  // Function for NEO data aggregation
  const aggregateData = (neos) => {
    const aggregatedData = {
      maxDiameter: { kilometers: 0 },
      hazardousCount: 0,
      closest: { kilometers: Infinity },
      fastest: { kilometers_per_hour: 0 },
    };

    neos.forEach((neo) => {
      const { estimated_diameter_max, is_potentially_hazardous_asteroid, close_approach_data } = neo;

      if (estimated_diameter_max > aggregatedData.maxDiameter.kilometers) {
        aggregatedData.maxDiameter.kilometers = estimated_diameter_max;
      }

      if (is_potentially_hazardous_asteroid) {
        aggregatedData.hazardousCount++;
      }

      close_approach_data.forEach((approach) => {
        const { miss_distance, relative_velocity } = approach;

        if (miss_distance.kilometers < aggregatedData.closest.kilometers) {
          aggregatedData.closest = miss_distance;
        }

        if (relative_velocity.kilometers_per_hour > aggregatedData.fastest.kilometers_per_hour) {
          aggregatedData.fastest = relative_velocity;
        }
      });
    });
    
    return aggregatedData;
  };

      //Function for adding NEOs to the list

      const addNeoToList = (newNeo) => {
        setNeos((prevNeos) => {
          const updatedNeos = [...prevNeos];
      
          //If the NEO list has reached the maximum length (6 items), delete the first item
          if (updatedNeos.length === 6) {
            updatedNeos.shift();
          }
      
          // Adding a new NEO to the list
          updatedNeos.push(newNeo);
      
          return updatedNeos;
        });
      };



  return (
    <div>
      <h1>Near-Earth Objects</h1>
      <ul>
        {neos.map((neo, index) => (
          <NeoListItem key={index} neo={neo} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default NeoList;

