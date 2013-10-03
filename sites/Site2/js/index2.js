$(document).ready(function () {
    $("button").click(function () {
        var contents = $(this).html();
        var out = "";
        if (contents == "Element 1")
            out = "A first paragraph";
        if (contents == "Element 2")
            out = "A second paragraph";
        if (contents == "Element 3")
            out = "A third paragraph";
        $("#target").html(out);
        return false;
    });
});