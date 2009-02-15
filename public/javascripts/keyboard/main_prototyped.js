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
    {label: "<u>p</u>honetic", accesskey: "P",  type: "option", invoke: KeyboardAction.handler.phonetic}
    ,{label: "<u>u</u>nijoy", accesskey: "U", type: "option", invoke: KeyboardAction.handler.unijoy}
    ,{label: "<u>e</u>nglish", accesskey: "E", type: "option", invoke: KeyboardAction.handler.english}
    ,{label: "<u>h</u>ide", accesskey: "H", type: "link", invoke: KeyboardAction.handler.hideAction}
  ],

  keyboardOptionsPanel : null,
  mActiveTextField: null,
  getKeyboardOptionsPanel: function(pEvent, obj) {
    if(KeyboardOptions.keyboardOptionsPanel == null) {
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
        	<!-- KeyboardOptions.keyboardOptionsPanel = new Element('div', {'class': 'keyboard-options'}); -->
    KeyboardOptions.keyboardOptionsPanel = $.create('div', {'class': 'keyboard-options'});
    // create ul element
    		//var ulElement = new Element("ul");
	var ulElement = $.create("ul");
    KeyboardOptions.keyboardOptionsPanel.append(ulElement);
    var keyboardOptionsCount = KeyboardOptions.SUPPORTED_KEYBOARD_INTERFACE.length;

    // find existing cookie value
    var existingCookieValue = BanglaKeyboardUtil.getCookie(KeyboardOptions.COOKIE_NAME);

    // add supported keyboard hooks
    for (var i = 0; i < keyboardOptionsCount; i++) {

      // create li element
      		//var liElement = new Element("li");
             var liElement = $.create("li");
      // determine the last one
      if (i == (keyboardOptionsCount - 1)) {
        	//liElement.className = "last";
	  liElement.addClass("last");
      }

      var keyboardInterface = KeyboardOptions.SUPPORTED_KEYBOARD_INTERFACE[i];
      var elementId = i + ":" + keyboardInterface.label;
      var selected = (elementId == existingCookieValue);
      if (keyboardInterface.type.toLowerCase() == "option") {
        // create radio button
         		//var inputElement = new Element("input", {"class": "keyboard_option_button", type: "radio", name: "keyboard_options"});
		var inputElement = $.create("input", {"class": "keyboard_option_button", type: "radio", name: "keyboard_options"});		
        		//inputElement.id = elementId;
		inputElement.attr("id",elementId);
		        //inputElement.accessKey = keyboardInterface.accesskey;
		inputElement.attr("accessKey",keyboardInterface.accesskey);

        // set selected flag if user previousely selected
        if (selected) {
          		//inputElement.checked = "checked";
		  inputElement.attr("checked","checked");		
          keyboardInterface.invoke(null);
        }

        // create label for the button
        		//var labelElement = new Element("label", {"class": "keyboard_option_label"});
		var labelElement = $.create("label", {"class": "keyboard_option_label"});		
            //labelElement.update(keyboardInterface.label);
            labelElement.html(keyboardInterface.label);
        // set observer for select event
         		//Event.observe(inputElement, "click", KeyboardOptions.defaultHandler);
		inputElement.bind("click", KeyboardOptions.defaultHandler);		
        // add newly created button and label
        		//liElement.appendChild(inputElement);
		liElement.append(inputElement);		
        		//liElement.appendChild(labelElement);
		liElement.append(labelElement);		
      } else if (keyboardInterface.type.toLowerCase() == "link") {
        // create text element
        		//var element = new Element("a", {"class": "keyboard_option_link", href: "javascript: void(0)"});
		var element = $.create("a", {"class": "keyboard_option_link", href: "javascript: void(0)"});		
        		//element.update(keyboardInterface.label);
				element.html(keyboardInterface.label);
		        //element.id = elementId;
		element.attr("id",elementId);		
        		//element.rel = "link";
		element.attr("rel","link");		
        		//element.accessKey = keyboardInterface.accesskey;
		element.attr("accessKey",keyboardInterface.accesskey);		
        		//Event.observe(element, "click", KeyboardOptions.defaultHandler)
		element.bind("click", KeyboardOptions.defaultHandler);		

        // add newly created link element
        		//liElement.appendChild(element);
		liElement.append(element);
      }
		      //ulElement.appendChild(liElement);
		ulElement.append(liElement);	  
    }

    // add event observer for keyboard option panel
    /*Event.observe(KeyboardOptions.keyboardOptionsPanel, "mouseover", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = true;
    });*/
	KeyboardOptions.keyboardOptionsPanel.bind("mouseover", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = true;
    });

    /*Event.observe(KeyboardOptions.keyboardOptionsPanel, "mouseout", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = false;
    });*/
	KeyboardOptions.keyboardOptionsPanel.bind("mouseout", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = false;
    });
	
	
    /*Event.observe(KeyboardOptions.keyboardOptionsPanel, "keypress", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = false;
    });*/
	KeyboardOptions.keyboardOptionsPanel.bind("keypress", function(pEvent) {
      KeyboardOptions.mKeyboardOptionsPanelFocused = false;
    });
		    //document.body.appendChild(KeyboardOptions.keyboardOptionsPanel);
	$(document.body).append(KeyboardOptions.keyboardOptionsPanel);		
  },

  defaultHandler: function(pEvent) {
    var targetElement = pEvent.target;
    if (targetElement) {
      // create cookie to keep this record
      BanglaKeyboardUtil.setCookie(KeyboardOptions.COOKIE_NAME, targetElement.id, 30, '/');
      if ("link" != targetElement.rel) {
        KeyboardOptions.mActiveTextField.focus();
      }
      //new Effect.Highlight(KeyboardOptions.mActiveTextField, {duration: 0.2});
	  //$(KeyboardOptions.mActiveTextField).animate({background-color: "#7fffd4"},1500);
     
	  $( KeyboardOptions.SUPPORTED_KEYBOARD_INTERFACE[targetElement.id.split(":")[0]].invoke($(KeyboardOptions.keyboardOptionsPanel)) );
    }
  },

  findPosition: function( oElement ) {
    if( typeof( oElement.offsetParent ) != 'undefined' ) {
      for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent ) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [ posX, posY ];
    } else {
      return [ oElement.x, oElement.y ];
    }
  },

  addKeyboardOptions: function(pEvent) {
    KeyboardOptions.mActiveTextField = pEvent.target;
    var optionsPanel = KeyboardOptions.getKeyboardOptionsPanel(pEvent, KeyboardOptions.mActiveTextField);
    		//optionsPanel.style.position = "absolute";
	optionsPanel.css("position","absolute");
    var position = KeyboardOptions.findPosition(KeyboardOptions.mActiveTextField);
    /*optionsPanel.style.top = (position[1] - (KeyboardOptions.mActiveTextField.clientHeight + 35) + KeyboardOptions.mActiveTextField.offsetHeight) + "px";
    optionsPanel.style.left = (position[0] - 2) + "px";
    optionsPanel.style.width = KeyboardOptions.mActiveTextField.offsetWidth + "px";
    optionsPanel.style.zIndex = "10020";*/
	optionsPanel.css("top" , (position[1] - (KeyboardOptions.mActiveTextField.clientHeight + 35) + KeyboardOptions.mActiveTextField.offsetHeight) + "px");
    optionsPanel.css("left" , (position[0] - 2) + "px");
    optionsPanel.css("width", KeyboardOptions.mActiveTextField.offsetWidth + "px");
    optionsPanel.css("zIndex","10020");
    /*if (Number(optionsPanel.style.width.replace("px", "")) < 300) {
      optionsPanel.style.width = 300;
    }*/
	if (Number(optionsPanel.width()) < 300) {
      optionsPanel.width(300);
    }
    optionsPanel.hide();
    optionsPanel.show();
    //optionsPanel.setOpacity(0.8);
	optionsPanel.css("opacity",0.8);	
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
    		/*Event.observe(pElement, "focus", KeyboardOptions.addKeyboardOptions);
    		Event.observe(pElement, "blur", KeyboardOptions.removeKeyboardOptions);*/
	pElement.bind("focus", KeyboardOptions.addKeyboardOptions);
    pElement.bind("blur", KeyboardOptions.removeKeyboardOptions);		
    BanglaKeyboardUtil.applyBanglaKeyboardSupport(pElement);
  },

  langBangla : "bangla",
  startBanglaSupport: function () {
    // find all elements which has "lang=bangla"
    /*$$('input', 'textarea').each(function(pElement) {
      if (KeyboardOptions.langBangla == pElement.lang) {
        // apply event observer on focus and blur
        KeyboardOptions.apply(pElement);
      }
    });*/
	$("input").each(function(i,pElement) {
	  if (KeyboardOptions.langBangla == $(this).attr('lang')) {
        // apply event observer on focus and blur
        KeyboardOptions.apply($(this));
		//alert(this);
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