/*Description: $.fn.dialog
Author: Kris Zhang
require: 
  string.format.js
*/
(function($) {

  $.fn.dialog = function(options) {

    var self    = this
      , $this   = $(self)
      , $body   = $(document.body)
      , $msgbox = $this.closest(".dialog");

    var create = function() {

      var msghtml
        = ''
        // + '<div class="dialog">'
        // + '<div class="msg">'
        // +   '<h3 class="msgh"></h3>'
        // +   '<div class="msgb"></div>'
        // +   '<table class="msgf">'
        // +   '<tr></tr>'
        // +   '</table>'
        // + '</div>'
        // + '<div class="mask"></div>'
        // + '</div>'

        
        + '<div id="mydialog" class="modal-myself dialog fade in">'
        + '<div class="modal-dialog">'
        +   '<div class="modal-content">'
        // +     '<div class="modal-header">'
        // +         '<button type="button" class="close">×</button>'
        // +         '<h4 class="modal-title"></h4>'
        // +     '</div>'
        +     '<div class="modal-body modal-body-myself"></div>'
        // +     '<div class="modal-footer"></div>'
        +   '</div>'
        + '</div>'
        + '<div class="modal-backdrop fade in" style="z-index:-1"></div>'
        + '</div>'
        ;


      $msgbox = $(msghtml);
      $(document.body).append($msgbox);
      $msgbox.find(".modal-body").append($this);
    };

    // var createButton = function() {
    //   var buttons = options.buttons || {}
    //     , $btnrow = $msgbox.find(".modal-footer");

    //   //clear old buttons
    //   $btnrow.html('');

    //   for (var button in buttons) {
    //     var btnObj  = buttons[button]
    //       , id      = ""
    //       , text    = ""
    //       , classed = "btn-default"
    //       , click   = "";

    //     if (btnObj.constructor == Object) {
    //       id      = btnObj.id;
    //       text    = btnObj.text;
    //       classed = btnObj.classed || classed;
    //       click   = btnObj.click;
    //     }

    //     if (btnObj.constructor == Function) {
    //       click = btnObj;
    //     }

    //     //<button data-bb-handler="danger" type="button" class="btn btn-danger">Danger!</button>
    //     $button = $('<button type="button" class="btn {1}">{0}</button>'.format(text, classed));

    //     id && $button.attr("id", id);
    //     if (click) {
    //       (function(click) {
    //         $button.click(function() {
    //           click.call(self);
    //         });
    //       })(click);
    //     }

    //     $btnrow.append($button);
    //   }
    // };

    var show = function() {
      $msgbox.show();
      $body.addClass("modal-open");
    };

    var close = function() {
      $msgbox.hide();
      $body.removeClass("modal-open");
    };

    if (options.constructor == Object) {
      if ($msgbox.size() < 1) {
        create();
      }
      // createButton();
      $(".modal-title", $msgbox).html(options.title || "");
      $(".modal-header .close", $msgbox).click(function() {
        var closeHandler = options.onClose || close;
        closeHandler.call(self);
      });
      options.classed && $msgbox.addClass(options.classed);
      show();
    }

    if (options == "destroy") {
      close();
      $msgbox.remove();
    }

    if (options == "close") {
      close();
    }

    if (options == "open") {
      show();
    }

    return $this;
  };

})(jQuery);

/**
* jquery.bootstrap.js
Copyright (c) Kris Zhang <kris.newghost@gmail.com>
License: MIT (https://github.com/newghost/bootstrap-jquery-plugin/blob/master/LICENSE)
*/
/* Extend string method */

/*
string.format, ref: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
*/
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

/*Description: $.messager
Author: Kris Zhang
require: 
  string.format.js
  $.fn.dialog
*/

$.messager = (function() {

  var alert = function(title, message) {
    // var model = $.messager.model;

    if (arguments.length < 2) {
      message = title || "zzz";
      title   = "&nbsp;zzz"
    }

    // $("<div>" + "message" + "</div>").dialog({
    $("#login").dialog({
          width:500,
          height:500
        // title:   title
        // override destroy methods;
      // , onClose: function() {
      //     $(this).dialog("destroy");
      //   }
      // , buttons: [{
      //       text: "model.ok"
      //     , classed: "btn-success"
      //     , click: function() {
      //         $(this).dialog("destroy");
      //       }
      //   }]
    });
  };

  // var confirm = function(title, message, callback) {
  //   var model = $.messager.model;

  //   $("<div>" + message + "</div>").dialog({
  //       title:   title
  //       // override destroy methods;
  //     , onClose: function() {
  //         $(this).dialog("destroy");
  //       }
  //     , buttons: [{
  //           text: model.ok
  //         , classed: "btn-success"
  //         , click: function() {
  //             $(this).dialog("destroy");
  //             callback && callback();
  //           }
  //       },
  //       {
  //           text: model.cancel
  //         , click: function() {
  //             $(this).dialog("destroy");
  //           }
  //       }]
  //   });
  // };

  return {
      alert:   alert
    // , confirm: confirm
  };

})();


$.messager.model = {
    ok: "OK"
  , cancel:  "Cancel"
};