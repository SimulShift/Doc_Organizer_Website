fetch('Document_Metadata.json')
  .then(response => response.text())
  .then(data => {
  	console.log(data);
  })

console.log('')
var tag = document.createElement('p');
var text = document.createTextNode("This is my text");
tag.appendChild(text);
document.body.appendChild(tag);