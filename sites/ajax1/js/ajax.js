// Pure Javascript Ajax Call
function vanillaAjaxCall() {
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
        if (ajaxRequest.readyState == 4 /* complete */ ) {
            if (ajaxRequest.status == 200) {
                document.getElementById("ajaxAnswerHere").innerHTML = ajaxRequest.responseText;
            }
        }
    }

    ajaxRequest = getXMLHttpRequest();

    if (ajaxRequest !== null) {
        try {
            ajaxRequest.open("GET", "ajaxAnswer.html", true); // request some html
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