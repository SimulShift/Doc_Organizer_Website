async function fetchDocuments() {
  return fetch(
    'https://raw.githubusercontent.com/SociallyResponsibleComputing/SRC_Website/main/documents/Document_Metadata.json'
  )
    .then(response => response.text())
    .then(data => {
      return JSON.parse(data)
    })
}

function satisfiesPredicate(item, key) {
  if (!key) return true
  const filename = item['filename'].toLowerCase()
  const activityTitle = item['Activity title'].toLowerCase()
  const programmingLanguage = item['Programming language'].toLowerCase()
  const CsTopic = item['CS topic'].toLowerCase()
  return (
    filename.includes(key.toLowerCase()) ||
    programmingLanguage.includes(key) ||
    activityTitle.includes(key) ||
    CsTopic.includes(key)
  )
}

function compareDates(a, b) {
  if ( a.date < b.date ){
    return -1;
  }
  if ( a.date > b.date ){
    return 1;
  }
  return 0;
}

/**
 * @param {Array} jsonObj The json object
 */
function displayJson(jsonObj, key) {
  jsonObj
    .filter(item => satisfiesPredicate(item, key))
    .sort(compareDates)
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

async function main() {
  const documents = await fetchDocuments()
  displayJson(documents, '')
  document.getElementById('search-input').addEventListener('input', event => {
    console.log('changing')
    json.innerHTML = ''
    displayJson(documents, event.target.value)
  })
}
main()
