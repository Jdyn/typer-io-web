function copyToClipboard(elementId, callback) {
  var tempElement = document.createElement('input');
  tempElement.setAttribute('value', document.getElementById(elementId).innerHTML);
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);

  callback(true)
}

export default copyToClipboard;
