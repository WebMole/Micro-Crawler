// Pure Javascript Ajax Call
function vanillaAjaxCall(pageNumber) {
  function getXMLHttpRequest() {
    if (window.XMLHttpRequest) {
      return new window.XMLHttpRequest();
    } else {
      try {
        return new ActiveXObject("MSXML2.XMLHTTP");
      } catch (ex) {
        return null;
      }
    }
  }


  function handler() {
    if (ajaxRequest.readyState === 4 /* complete */ ) {
      if (ajaxRequest.status === 200) {
        document.documentElement.innerHTML = ajaxRequest.responseText;
      }
    }
  }
  var ajaxRequest = getXMLHttpRequest();

  if (ajaxRequest !== null) {
    try {
      if (pageNumber !== 0)
      {
        ajaxRequest.open("GET", "response" + pageNumber + ".html", true); // request some html
      }
      else
      {
        ajaxRequest.open("GET", "index.html", true); // request some html
      }
      ajaxRequest.onreadystatechange = handler; // handles readyState
      ajaxRequest.send(); // send request
    }
    catch(e) {
      console.log("Request error: " + e + " With request: " + ajaxRequest);
    }
  } else {
    window.alert("AJAX (XMLHTTP) not supported.");
  }
}