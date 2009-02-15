var BanglaKeyboardUtil = {
  mActiveField: null,
  mGlobalOptionPhoneticEnabled: false,
  mGlobalOptionUnijoyEnabled: false,

  parseBooleanValue: function(pValue) {
    if (pValue == null) {
      return false;
    } else {
      return pValue.toLowerCase() == "true";
    }
  },

  detectKeyboardMode: function(pInputElement) {
    if (BanglaKeyboardUtil.mGlobalOptionPhoneticEnabled) {
      makeUniPhoneticEditor(pInputElement);
    }
    else if (BanglaKeyboardUtil.mGlobalOptionUnijoyEnabled) {
      makeUnijoyEditor(pInputElement);
    } else {
      // clean up keyboard hooks
      pInputElement.onkeypress = null;
      pInputElement.onkeydown = null;
      pInputElement.onkeyup = null;
    }
  },

  convertToAscii: function(FromElement, ToElement) {
    var unicode = $(FromElement).value;
    $(ToElement).value = ConvertToASCII('bijoy', unicode);
  },

  applyBanglaKeyboardSupport: function(pElement) {
    pElement.bind('focus', function(pEvent) {
      BanglaKeyboardUtil.mActiveField = pEvent.target;
      BanglaKeyboardUtil.detectKeyboardMode(BanglaKeyboardUtil.mActiveField);
    });
  },

  /* thanks to scott andrew [http://www.scottandrew.com/weblog] for this awesome cookie func */
  getCookie: function(name) {
    var start = document.cookie.indexOf( name + "=" );
    var len = start + name.length + 1;
    if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
      return null;
    }
    if ( start == -1 ) return null;
    var end = document.cookie.indexOf( ';', len );
    if ( end == -1 ) end = document.cookie.length;
    return unescape( document.cookie.substring( len, end ) );
  },

  setCookie: function( name, value, expires, path, domain, secure ) {
    var today = new Date();
    today.setTime( today.getTime() );
    if ( expires ) {
      expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name+'='+escape( value ) +
    ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
    ( ( path ) ? ';path=' + path : '/' ) +
    ( ( domain ) ? ';domain=' + domain : '' ) +
    ( ( secure ) ? ';secure' : '' );
  },

  deleteCookie: function( name, path, domain ) {
    if ( getCookie( name ) ) document.cookie = name + '=' +
    ( ( path ) ? ';path=' + path : '') +
    ( ( domain ) ? ';domain=' + domain : '' ) +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
  }
}
