let documents = undefined

function fetchDocuments() {
  fetch(
    'https://raw.githubusercontent.com/AlexHappyCode/Doc_Organizer_Website/main/documents/Document_Metadata.json',
  )
    .then(response => response.text())
    .then(data => {
      let jsonObj = JSON.parse(data)
      displayJson(jsonObj)
    })
}

/**
 * @param {Array} jsonObj The json object
 */
function displayJson(jsonObj, key) {
  jsonObj
    .filter(item => item['Title of File'].includes(key))
    .forEach((element, idx) => {
      let title = document.createTextNode(`File ${idx}`)
      document.getElementById('json').appendChild(title)
      let ul = document.createElement('ul')
      for (let key in element) {
        let entry = document.createElement('li')
        let textNode = document.createTextNode(`${key}: ${element[key]}`)
        entry.appendChild(textNode)
        ul.appendChild(entry)
      }
      document.getElementById('json').appendChild(ul)
    })
}
