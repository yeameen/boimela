/**
 * $Id$
 *
 * "KeyboardOptions" javascript wrapper library based on the effort
 * from hasin hayder http://hasin.wordpress.com and somewhere in... blog team.
 *
 * @author somewhere in... ads team
 */
var KeyboardAction = {
  handler: {
    unijoy: function(pElement) {
      KeyboardOptions.debug("unijoy");
      BanglaKeyboardUtil.mGlobalOptionPhoneticEnabled = false;
      BanglaKeyboardUtil.mGlobalOptionUnijoyEnabled = true;
      BanglaKeyboardUtil.detectKeyboardMode(KeyboardOptions.mActiveTextField);
    },

    phonetic: function(pElement) {
      KeyboardOptions.debug("phonetic");
      BanglaKeyboardUtil.mGlobalOptionPhoneticEnabled = true;
      BanglaKeyboardUtil.mGlobalOptionUnijoyEnabled = false;
      BanglaKeyboardUtil.detectKeyboardMode(KeyboardOptions.mActiveTextField);
    },

    english: function(pElement) {
      KeyboardOptions.debug("english");
      BanglaKeyboardUtil.mGlobalOptionPhoneticEnabled = false;
      BanglaKeyboardUtil.mGlobalOptionUnijoyEnabled = false;
      BanglaKeyboardUtil.detectKeyboardMode(KeyboardOptions.mActiveTextField);
    },

    hideAction: function(pElement) {
      KeyboardOptions.keyboardOptionsPanel.hide("slow");
    }
  }
}

var KeyboardOptions = {

  SUPPORTED_KEYBOARD_INTERFACE : [
    {label: "&nbsp;", title: "phonetic keyboard", accesskey: "P",  type: "link", cssClass: "pho", invoke: KeyboardAction.handler.phonetic}
    ,{label: "&nbsp;", title: "bangla (unijoy) keyboard", accesskey: "U", type: "link", cssClass: "uni", invoke: KeyboardAction.handler.unijoy}
    ,{label: "&nbsp;", title: "english keyboard", accesskey: "E", type: "link", cssClass: "eng", invoke: KeyboardAction.handler.english}
  ],

  keyboardOptionsPanel : null,
  mActiveTextField: null,
  getKeyboardOptionsPanel: function(pEvent, obj) {
    if (KeyboardOptions.keyboardOptionsPanel == null) {
      KeyboardOptions.createKeyboardOptionsPanel(pEvent, obj);
    }
    return KeyboardOptions.keyboardOptionsPanel;
  },

  mHideTimeout : null,
  mHideLock : false,
  mKeyboardOptionsPanelFocused : false,
  COOKIE_NAME: "___KeyboardOptions_SET",
  createKeyboardOptionsPanel: function(pEvent, obj) {
    // create new keyboard option panel
    KeyboardOptions.keyboardOptionsPanel = $.create('div', {'class': 'keyboard-options'});
    // create icon panel
    var iconElement = $.create("div", {"class": "icon"});
    KeyboardOptions.keyboardOptionsPanel.append(iconElement);

    // create ul element
    var ulElement = $.create("div", {"class": "bar"});
    KeyboardOptions.keyboardOptionsPanel.append(ulElement);
    var keyboardOptionsCount = KeyboardOptions.SUPPORTED_KEYBOARD_INTERFACE.length;

    // find existing cookie value
    var existingCookieValue = BanglaKeyboardUtil.getCookie(KeyboardOptions.COOKIE_NAME);

    // add supported keyboard hooks
    for (var i = 0; i < keyboardOptionsCount; i++) {

      // create li element
      var liElement = $.create("span");
      // determine the last one
      if (i == (keyboardOptionsCount - 1)) {
        liElement.addClass("last");
      }

      var keyboardInterface = KeyboardOptions.SUPPORTED_KEYBOARD_INTERFACE[i];
      var elementId = i + ":" + keyboardInterface.label;
      var selected = (elementId == existingCookieValue);
      if (keyboardInterface.type.toLowerCase() == "option") {
        // create radio button
        var inputElement = $.create("input", {"class": "keyboard_option_button", type: "radio", name: "keyboard_options"});
        inputElement.attr("id", elementId);
        inputElement.attr("accessKey", keyboardInterface.accesskey);

        // set selected flag if user previousely selected
        if (selected) {
          inputElement.attr("checked", "checked");
          keyboardInterface.invoke(null);
        }

        // create label for the button
        var labelElement = $.create("label", {"class": "keyboard_option_label"});
        labelElement.html(keyboardInterface.label);
        // set observer for select event
        inputElement.bind("click", KeyboardOptions.defaultHandler);
        // add newly created button and label
        liElement.append(inputElement);
        liElement.append(labelElement);
      } else if (keyboardInterface.type.toLowerCase() == "link") {
        // create text element
        var cssClass = keyboardInterface.cssClass || "keyboard_option_link";
        var element = $.create("a", {"class": cssClass, href: "javascript: void(0)"});
        element.html(keyboardInterface.label);
        element.attr("id", elementId);
        element.attr("rel", "link");
        element.attr("accessKey", keyboardInterface.accesskey);
        if (keyboardInterface.title) {
          element.attr("title", keyboardInterface.title);
        }
        element.bind("click", KeyboardOptions.defaultHandler);
        if (selected) {
          element.addClass("selected");
          try {
            keyboardInterface.invoke(null);
          } catch(e) {}
        }

        // add newly created link element
        liElement.append(element);
      }
      ulElement.append(liElement);
    }

    // create move panel
    var moveElement = $.create("div", {"class": "move", "id": "keyboardoptions_MOVE_HANDLER"});
    KeyboardOptions.keyboardOptionsPanel.append(moveElement);

    // add event observer for keyboard option panel
    KeyboardOptions.keyboardOptionsPanel.bind("mouseover", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = true;
    });

    KeyboardOptions.keyboardOptionsPanel.bind("mouseout", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = false;
    });


    KeyboardOptions.keyboardOptionsPanel.bind("keypress", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = false;
    });
    $(document.body).append(KeyboardOptions.keyboardOptionsPanel);
  },

  defaultHandler: function(pEvent) {
    var targetElement = pEvent.target;
    if (targetElement) {
      // create cookie to keep this record
      BanglaKeyboardUtil.setCookie(KeyboardOptions.COOKIE_NAME, targetElement.id, 30, '/');
      if ("link" == targetElement.rel) {
        // remove selected from other links
        var jqElement = $(targetElement);
        var linkElements = targetElement.parentNode.parentNode.getElementsByTagName("a");
        if (linkElements && linkElements.length > 0) {
          jQuery.each(linkElements, function(pIndex, pElement) {
            if (pElement != targetElement) {
              jQuery(pElement).removeClass("selected");
            }
          });
        }
        if (targetElement.className.indexOf("selected") != -1) {
          jqElement.removeClass("selected"); 
        } else {
          jqElement.addClass("selected");
        }
      }
      KeyboardOptions.mActiveTextField.focus();
      $(KeyboardOptions.SUPPORTED_KEYBOARD_INTERFACE[targetElement.id.split(":")[0]].invoke($(KeyboardOptions.keyboardOptionsPanel)));
    }
  },

  findPosition: function(oElement) {
    if (typeof( oElement.offsetParent ) != 'undefined') {
      for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [ posX, posY ];
    } else {
      return [ oElement.x, oElement.y ];
    }
  },

  addShortkeyOptions: function(pEvent) {
    console.debug(pEvent);
  },

  addKeyboardOptions: function(pEvent) {
    KeyboardOptions.mActiveTextField = pEvent.target;
    var optionsPanel = KeyboardOptions.getKeyboardOptionsPanel(pEvent, KeyboardOptions.mActiveTextField);
    optionsPanel.css("position", "absolute");
    var position = KeyboardOptions.findPosition(KeyboardOptions.mActiveTextField);
    optionsPanel.css("top", (position[1] - (KeyboardOptions.mActiveTextField.clientHeight + 45) + KeyboardOptions.mActiveTextField.offsetHeight) + "px");
    optionsPanel.css("left", (position[0] - 2) + "px");
    optionsPanel.css("width", KeyboardOptions.mActiveTextField.offsetWidth + "px");
    optionsPanel.css("zIndex", "10020");
    if (Number(optionsPanel.width()) < 300) {
      optionsPanel.width(300);
    }
    optionsPanel.hide();
    optionsPanel.show();
    optionsPanel.css("opacity", 0.8);

    // enable drag support
    jQuery(".keyboard-options").bind('drag', function( event ){
      $(this).css({
        top: event.offsetY,
        left: event.offsetX
      });
    });
  },

  removeKeyboardOptions: function(pEvent) {
    if (!KeyboardOptions.mKeyboardOptionsPanelFocused) {
      KeyboardOptions.getKeyboardOptionsPanel().hide();
    }
  },

  debug: function(pMsg) {
    //    $("debug").innerHTML = pMsg + "<br/>" + $("debug").innerHTML;
  },

  apply: function(pElement) {
    pElement.bind("focus", KeyboardOptions.addKeyboardOptions);
    pElement.bind("blur", KeyboardOptions.removeKeyboardOptions);
//    pElement.bind("keypress", KeyboardOptions.addShortkeyOptions)
    BanglaKeyboardUtil.applyBanglaKeyboardSupport(pElement);
  },

  langBangla : "bangla",
  startBanglaSupport: function () {
    // find all elements which has "lang=bangla"
    $("input, textarea").each(function(i, pElement) {
      if (KeyboardOptions.langBangla == $(this).attr('lang')) {
        // apply event observer on focus and blur
        KeyboardOptions.apply($(this));
      }
    });
  },

  applyAll: function(pBaseElement) {
    var inputElements = pBaseElement.getElementsByTagName("input");
    for (var i = 0; i < inputElements.length; i++) {
      var inputElement = inputElements[i];
      if (KeyboardOptions.langBangla == inputElement.lang) {
        KeyboardOptions.apply(inputElement);
      }
    }

    var textareaElements = pBaseElement.getElementsByTagName("textarea");
    for (var i = 0; i < textareaElements.length; i++) {
      var textareaElement = textareaElements[i];
      if (KeyboardOptions.langBangla == textareaElement.lang) {
        KeyboardOptions.apply(textareaElement);
      }
    }
  }
}