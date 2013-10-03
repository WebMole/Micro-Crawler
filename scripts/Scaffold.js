// @todo: save preferences in local storage :)

/**
 * Crawler Object containing the selected Web State Machine (wsm) and edges (elements to click)
 * @constructor
 */
function MuCrawler()
{
  this.wsm = null;
  this.ifr = document.getElementById("navwindow");
  this.next_click = new WsmEdge();
  this.last_el_color = "";
  this.last_el = null;
  this.step_count = 0;
  this.pause_interval = 500;
  this.app_prefix = "";
  this.highlight_elements = false; // @todo: fix element highlighting checkbox to work out of the box (click twice to make it work atm)
  this.use_timeout = true;
  this.base_domain = "";
  this.stay_on_base_domain = true; // If false, will continue navigation even if we move from one site to another
  this.verifyLink = true; // if true, prevents click instead of going into the url and comparing domain
  this.crawler_prefix = document.URL.substring(0, document.URL.lastIndexOf("/") + 1);

  this.load_url = function(url)
  {
    if (url[0] == "/" || url.substring(0, 5) == "http:")
    {
      // Absolute URL
      var without_c_p = url.substring(this.crawler_prefix.length);
      this.app_prefix = without_c_p.substring(0, without_c_p.lastIndexOf("/") + 1);
      this.ifr.src = url;
      $("#starturl").val(url);
    }
    else if (url[0] == "#")
    {
      // Anchor within page
      var new_url = this.app_prefix + url;
        this.ifr.src = new_url;
        $("#starturl").val(this.crawler_prefix + new_url);
    }
    else
    {
      // Relative URL
      var new_url = this.app_prefix + url
      this.app_prefix = new_url.substring(0, new_url.lastIndexOf("/") + 1);
      this.ifr.src = new_url;
      $("#starturl").val(this.crawler_prefix + new_url);
    }

    // retrieve base domain on iframe load if none is specified
    if (this.stay_on_base_domain)
    {
      // when the iframe has loaded
      $("#").load(this.updateBaseDomain(this));
    }
  };

  this.updateBaseDomain = function()
  {
    if (this.base_domain === "")
    {
      this.base_domain = this.getCurrentDomain();
      $("#domain").val(this.base_domain);
    }
  };

  this.getCurrentDomain = function()
  {
    return this.base_domain = this.ifr.contentDocument.domain;
  }

  this.dot_refresh = function()
  {
    if (mucrawler.wsm === undefined || mucrawler.wsm === null)
    {
      console.log("Cannot serialize: WSM is undefined");
      return;
    }
    var type = $("input[name=outputType]:checked").val();
    if (type === "dot")
    {
      $("#dot-contents").val(mucrawler.wsm.toDot());
      //$("#nodecontents").html(this.wsm.m_domTree.toString(true));
    }
    else if (type === "xml")
    {
      $("#dot-contents").val(mucrawler.wsm.toXml());
      //$("#nodecontents").html(this.wsm.m_domTree.toXml(true));
    }
  };

  this.generate_dot_graph = function()
  {
    var result = Viz(mucrawler.wsm.toDot(), "svg");
    $("#dot-graph").html(result);
  };

  this.instantiate_wsm = function(wsmtype)
  {
    if (wsmtype === "vanilla")
      this.wsm = new VanillaWsm();
    else if (wsmtype === "nobacktrack")
      this.wsm = new NoBacktrackWsm();
    else if (wsmtype === "onepointoh")
      this.wsm = new WebOnePointOhWsm();
    else if (wsmtype === "backtrack")
      this.wsm = new BacktrackWsm();
    else if (wsmtype === "tansuo")
      this.wsm = new TansuoWsm();
    $("#elpath").html("Start exploration");
    $("#stats-panel").show();
    this.step_count = 0;
    this.refresh_stats();
    $("#no-stats-panel").hide();
  };

  this.refresh_stats = function()
  {
    $("#wsm-size-nodes").html(this.wsm.countNodes());
    $("#wsm-size-bytes").html(this.wsm.getByteSize());
    $("#wsm-size-edges").html(this.wsm.countEdges());
    $("#stepid").html(this.step_count);
  };

  this.next_step = function()
  {
    // If no WSM is instantiated, create one based on user's choice
    if (this.wsm === null)
    {
      alert("No WSM instantiated. Instantiate a WSM first.");
      return;
    }

    if ($("#dot-autorefresh").prop("checked"))
    {
      mucrawler.dot_refresh();
    }

    if ($("#graph-autorefresh").prop("checked"))
    {
      this.generate_dot_graph(mucrawler.wsm.toDot());
    }

    var doc = this.ifr.contentDocument || this.ifr.contentWindow.document;

    // Attempt click at element in iframe
    if (this.next_click === null)
    {
      // Finished Navigation
      $("#elpath").html("I SAID we are done!");
      mucrawler.dot_refresh();
      this.generate_dot_graph(mucrawler.wsm.toDot());
      return; // We are done
    }
    if (this.next_click.getContents() !== "")
    {
      var el = get_element_from_path(doc, new PathExpression(this.next_click.getContents()));
      this.performClick(el);
    }
    else
    {
      // We jump to the said URL
      var dest = this.next_click.getDestination();
      var node = this.wsm.getNodeFromId(dest);
      if (node !== null)
      {
        var dom = node.getContents();
        var url = dom.getAttribute("url");
        this.load_url(url);
      }
    }
    this.step_count++;

    if (this.use_timeout)
    {
      // We manually call the callback after waiting
      setTimeout(iframeReady, this.pause_interval);
    }
    else
    {
      // Let's not waste time and explore!
      // @todo: !use_timeout does not seem to work
      iframeReady();
    }
  };

  this.performClick = function(el)
  {
    if (el === undefined)
    {
      console.error("Element should not be undefined");
    }
    else if (el === null)
    {
      console.log("Null returned (maybe an iframe)");
    }
    // Anchor
    else if (el.nodeName === "A" || el.nodeName === "a")
    {
      // domain verification
      if (this.stay_on_base_domain && this.verifyLink)
      {
        if (el.hostname !== undefined || el.hostname !== null || el.hostname !== "")
        {
          // if domain is in whiteList, click!
          // @todo: create an array of accepted domains or use wild characters
          if (el.hostname === this.base_domain)
          {
            $(el)[0].click();
          }
        }
        else
        {
          $(el)[0].click();
        }
      }
    }
    else
    {
      // jQuery trickery to provoke click
      $(el).click();
    }
  }

  this.iframeReady = function()
  {
    var doc = this.ifr.contentDocument || this.ifr.contentWindow.document;
    var dom = DomNode.parseFromDoc(doc);
    // Add URL
    dom.setAttribute("url", this.ifr.src);

    // @todo: verify ajax here with 3rd param
    this.wsm.setCurrentDom(dom, this.next_click.getContents(), false);
    $("#nodeid").html(this.wsm.m_currentNodeId);
    this.next_click = this.wsm.getNextClick();
    if (this.next_click === null)
    {
      $("#elpath").html("We are done!");
    }
    else if (this.next_click.getContents() === "")
    {
      $("#elpath").html("Jump to state " + this.next_click.getDestination());
    }
    else
    {
      $("#elpath").html(this.next_click.getContents());
      // Highlight next click in iframe
      if (this.highlight_elements)
      {
        if (this.last_el !== null && this.last_el_color !== "")
        {
          this.last_el.style.border = this.last_el_color;
        }
        var el = get_element_from_path(doc, new PathExpression(this.next_click.getContents()));
        this.last_el = el;
        this.last_el_color = el.style.border;
        if (this.last_el_color === "")
            this.last_el_color = "none";
        el.style.border = 'dashed 1px red';
      }
    }
    $("#nodecontents").html(this.wsm.m_domTree.toString(true));
    $("#wsm-size-nodes").html(this.wsm.countNodes());
    $("#wsm-size-bytes").html(this.wsm.getByteSize());
    $("#wsm-size-edges").html(this.wsm.countEdges());
    $("#stepid").html(this.step_count);
    // Will pause navigation if automode not checked
    // @todo: make a play/pause & stop navigation (may be easier to use)
    if ($("#automode").prop("checked"))
      this.next_step();
  };
}

function iframeReady()
{
  mucrawler.iframeReady();
}

function define_oracles()
{
  eval($("#stop-oracle").val());
  eval($("#test-oracle").val());
}

function poll_interval_slide_change(event, ui)
{
  var out = "0.25 s";
  if (ui.value == 1)
  {
    out = "0.1 s";
    mucrawler.pause_interval = 100;
  }
  else if (ui.value == 2)
  {
    out = "0.25 s";
    mucrawler.pause_interval = 250;
  }
  else if (ui.value == 3)
  {
    out = "0.5 s";
    mucrawler.pause_interval = 500;
  }
  else if (ui.value == 4)
  {
    out = "1 s";
    mucrawler.pause_interval = 1000;
  }
  else if (ui.value == 5)
  {
    out = "2 s";
    mucrawler.pause_interval = 2000;
  }
  $("#poll-interval").html(out);
}

$(document).ready(function() {
    // Our main crawler session
    mucrawler = new MuCrawler();

    // Assign handler to button "load"
    $("#btn-load").click(function () {
        mucrawler.load_url($("#starturl").val());
    });

    // Pressing Enter on URL input
    $("#starturl").keyup(function (e) {
        if (e.keyCode == 13)
        {
          mucrawler.load_url($("#starturl").val());
        }
    });

    // Step button Handler
    $("#elpath").click(function () {
        mucrawler.next_step();
        return false;
    });

    // Assign handler to button "DOT refresh"
    $("#btn-dot-refresh").click(mucrawler.dot_refresh);

    // Assing handler to button "Graph refresh"
    $("#btn-graph-refresh").click( mucrawler.generate_dot_graph );

    // Selects all text on the dot-contents textarea
    $("#dot-contents").on('mouseup', function() { $(this).select(); });

    // Assign handler "Refresh"
    $("input[name=outputType]").click(mucrawler.dot_refresh);

    // Assign handler to button "instantiate"
    $("#btn-instantiate-wsm").click(function () {
        mucrawler.instantiate_wsm($("#wsmtype").val());
    });

    // Assign handler to button "define oracles"
    $("#btn-define-oracles").click(function () {
        define_oracles();
    });

    // Interval Slider
    $("#poll-interval-slider").slider({"min": 1, "max": 5, "value" : 3, "change": poll_interval_slide_change});

    // Element Highliting button
    $("#highlight").click(function() {
        if ($("#highlight").prop("checked"))
        {
          mucrawler.highlight_elements = false;
        }
        else
        {
          mucrawler.highlight_elements = true;
        }
    });

    $("#ignoreattributes").click(function() {
        if ($("#ignoreattributes").prop("checked"))
        {
          DomNode.IGNORE_ATTRIBUTES = true;
        }
        else
        {
          DomNode.IGNORE_ATTRIBUTES = false;
        }
    });

    $("#useTimeout").click(function() {
        if ($("#useTimeout").prop("checked"))
        {
          mucrawler.use_timeout = true;
        }
        else
        {
          mucrawler.use_timeout = false;
        }
    });

    define_oracles();
});
