'use strict';
// Get input value from client side
// Convert client value into array
// Create an object using client array and object key will be the client value and object value will be increased by the same value of client value of array
//
// Show Output value in client side

const showValue = document.getElementById('showValue')

// Country Data fetch and return cca2 or cca3 short name to Full country name 
async function fetchCountry(shortName){
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await response.json()
        for(let i = 0; i < data.length; i++){
            if(data[i].cca2 === shortName || data[i].cca3 === shortName){
                return data[i]?.name?.common
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function getInputValue(){
    const outputValue = document.getElementById("outputValue")
    outputValue.innerHTML = ""
    const invalidDataShow = document.getElementById("invalidData")
    invalidDataShow.innerHTML = ""
    const inputValue = document.getElementById("formText").value
    const inputValueArr = inputValue.toUpperCase().split("\n")
    const duplicateCountObj = {}

    // Update country name by its count
    for(let i = 0; i<inputValueArr.length; i++){
        if(duplicateCountObj[inputValueArr[i]]){
            duplicateCountObj[inputValueArr[i]]++
        } else {
            duplicateCountObj[inputValueArr[i]] = 1
        }
    };

    // Show Output value in client side
    for (const key in duplicateCountObj) {
        const getData = await fetchCountry(key)
        if (duplicateCountObj.hasOwnProperty(key) && getData !== undefined) {
            // const countryCount = duplicateCountObj[key] > 1 ? `(${duplicateCountObj[key]})` : '';
            const listItem = document.createElement("li")
            listItem.textContent = `${getData} (${duplicateCountObj[key]})`
            outputValue.appendChild(listItem);
        } 
        // else {
        //     const invalidListItem = document.createElement("li")
        //     invalidListItem.textContent = `${key}`
        //     invalidDataShow.appendChild(invalidListItem);
        // }
    }
}

showValue.addEventListener("click", getInputValue)