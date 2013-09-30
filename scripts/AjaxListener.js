// @todo: update this with the one from the https://github.com/WebMole/iframe-ajax-listener
// Ajax Listener
// Overwrites ajax calls callbacks to include logging functions
var s_ajaxListener = new Object();
s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

s_ajaxListener.callback = function() {
    // this.method  --> the ajax method used
    // this.url     --> the url of the requested script (including query string, if any). (urlencoded)
    // this.data --> the data sent, if any. (urlencoded)


    function superCallback(callback) {
        var sendTime = new Date().getTime();

        // State changed inside this function
        return function() {
            var startTime = new Date().getTime();
            if (callback != undefined)
                callback();
            var endTime = new Date().getTime();
            console.log("State #" + this.readyState + " - Callback Time: " + (endTime - startTime) + "ms - Ellapsed Time (After Callback): " + (startTime - sendTime) + "ms");
            if (this.readyState == 4)
                console.log(this);
        }

    }

    XMLHttpRequest.prototype.open = function (method, url) {
        if (!method)
            var method = '';
        if (!url)
            var url = '';

        s_ajaxListener.tempOpen.apply(this, arguments);
        s_ajaxListener.method = method;
        s_ajaxListener.url = url;

        if (method.toLowerCase() == "get") {
            s_ajaxListener.data = url.split('?');
            s_ajaxListener.data = s_ajaxListener.data[1];
        }
    }

    XMLHttpRequest.prototype.send = function (method, url) {
        if (!method)
            var method = '';
        if (!url)
            var url = '';

        this.onreadystatechange = superCallback(this.onreadystatechange);

        s_ajaxListener.tempSend.apply(this, arguments);
        if (s_ajaxListener.method.toLowerCase() == "post")
            s_ajaxListener.data = method;
        s_ajaxListener.callback();
    }
}