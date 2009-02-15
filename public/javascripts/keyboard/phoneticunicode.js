/**
 * Unicode uniphonetic Parser for writing in webpages
 * This script transliterate the user input and display unicode bangla characters
 * 
 * @name Ekushey Unicode Parser
 * @version 1.0 [Date 30th July, 2006]
 * @author Hasin Hayder. Visit My Homepage at http://hasin.wordpress.com
 * @license LGPL
 */
 
/**
 * This script is released under Lesser GNU Public License [LGPL] 
 * which implies that you are free to use this script in your 
 * web applications without any problem. No warranty ensured. If you like 
 * this script, Please acknowledge by keeping a link to my website 
 * http://hasin.wordpress.com in the page where you use this script. 
 */ 

// Set of Characters
var uniphonetic=new Array();

// uniphonetic bangla equivalents
uniphonetic['k'] = "\u0995"; // ko

uniphonetic['i']='\u09BF'; // hrossho i kar
uniphonetic['I']='\u0987'; // hrossho i
uniphonetic['ii']='\u09C0'; // dirgho i kar
uniphonetic['II']='\u0988'; // dirgho i
uniphonetic['e']='\u09C7'; // e kar
uniphonetic['E'] = '\u098F'; // E
uniphonetic['U'] = '\u0989'; // hrossho u
uniphonetic['u'] = '\u09C1'; // hrossho u kar
uniphonetic['uu'] = '\u09C2'; // dirgho u kar
uniphonetic['UU'] = '\u098A'; // dirgho u
uniphonetic['r']='\u09B0'; // ro
uniphonetic['WR']='\u098B'; // wri
uniphonetic['a']='\u09BE'; // a kar
uniphonetic['A']='\u0986'; // shore a
uniphonetic['ao']='\u0985'; // shore o
uniphonetic['s']='\u09B8'; // dontyo so
uniphonetic['t']='\u099f'; // to
uniphonetic['K'] = '\u0996'; // Kho

uniphonetic['kh'] = '\u0996'; // kho

uniphonetic['n']='\u09A8'; // dontyo no
uniphonetic['N']='\u09A3'; // murdhonyo no
uniphonetic['T']='\u09A4'; // tto
uniphonetic['Th']='\u09A5'; // ttho

uniphonetic['d']='\u09A1'; // ddo
uniphonetic['dh']='\u09A2'; // ddho

uniphonetic['b']='\u09AC'; // bo
uniphonetic['bh']='\u09AD'; // bho
uniphonetic['v']='\u09AD'; // bho
//uniphonetic['rh']='o';	 // doye bindu ro
uniphonetic['R']='\u09DC';	 // doye bindu ro
uniphonetic['Rh']='\u09DD';	 // dhoye bindu ro
uniphonetic['g']='\u0997';	// go
uniphonetic['G']='\u0998';	// gho

uniphonetic['gh']='\u0998'; // gho

uniphonetic['h']='\u09B9';	// ho
uniphonetic['NG']='\u099E';	// yo
uniphonetic['j']='\u099C';	// borgio jo
uniphonetic['J']='\u099D'; // jho
uniphonetic['jh']='\u099D'; // jho
uniphonetic['c']='\u099A'; //  cho
uniphonetic['ch']='\u099A'; // cho
uniphonetic['C']='\u099B'; // ccho
uniphonetic['th']='\u09A0'; // tho
uniphonetic['p']='\u09AA'; // po
uniphonetic['f']='\u09AB'; // fo
uniphonetic['ph']='\u09AB'; // fo
uniphonetic['D']='\u09A6'; // do
uniphonetic['Dh']='\u09A7'; // dho

uniphonetic['z']='\u09AF';// ontoshyo zo
uniphonetic['y']='\u09DF';	// ontostho yo
uniphonetic['Ng']='\u0999';	// Uma
uniphonetic['ng']='\u0982';	// uniswor
uniphonetic['l']='\u09B2';	// lo
uniphonetic['m']='\u09AE';	// mo
uniphonetic['sh']='\u09B6';	// talobyo sho
uniphonetic['S']='\u09B7'; // mordhonyo sho
uniphonetic['O']= '\u0993';//'\u09CB'; // o
uniphonetic['ou']='\u099C'; // ou kar
uniphonetic['OU']='\u0994'; // OU
uniphonetic['Ou']='\u0994'; // OU
uniphonetic['Oi']='\u0990'; // OU
uniphonetic['OI']='\u0990'; // OU
uniphonetic['tt']='\u09CE'; // tto
uniphonetic['H']='\u0983'; // bisworgo
uniphonetic["."] ="\u0964"; // dari
uniphonetic[".."] = "."; // fullstop
uniphonetic['HH'] = '\u09CD' + '\u200c'; // hosonto
uniphonetic['NN'] = '\u0981'; // chondrobindu
uniphonetic['Y'] ='\u09CD'+'\u09AF'; // jo fola
uniphonetic['w'] ='\u09CD'+ '\u09AC'; // wri kar
uniphonetic['W'] ='\u09C3';// wri kar
uniphonetic['wr'] ='\u09C3'; // wri kar
uniphonetic['x'] ="\u0995"  + '\u09CD'+ '\u09B8';
uniphonetic['rY'] = uniphonetic['r']+ '\u200c'+ '\u09CD'+'\u09AF';
uniphonetic['L'] = uniphonetic['l'];
uniphonetic['Z'] = uniphonetic['z'];
uniphonetic['P'] = uniphonetic['p'];
uniphonetic['V'] = uniphonetic['v'];
uniphonetic['B'] = uniphonetic['b'];
uniphonetic['M'] = uniphonetic['m'];
uniphonetic['V'] = uniphonetic['v'];
uniphonetic['X'] = uniphonetic['x'];
uniphonetic['V'] = uniphonetic['v'];
uniphonetic['F'] = uniphonetic['f'];

//numeric characters, added by raju
uniphonetic['0'] = '\u09E6'; 
uniphonetic['1'] = '\u09E7'; 
uniphonetic['2'] = '\u09E8'; 
uniphonetic['3'] = '\u09E9'; 
uniphonetic['4'] = '\u09EA'; 
uniphonetic['5'] = '\u09EB'; 
uniphonetic['6'] = '\u09EC'; 
uniphonetic['7'] = '\u09ED'; 
uniphonetic['8'] = '\u09EE'; 
uniphonetic['9'] = '\u09EF'; 
//End Set


var carry = '';  //This variable stores each keystrokes
var old_len =0; //This stores length parsed bangla charcter
var ctrlPressed=false;
var len_to_process_oi_kar=0;
var first_letter = false;

isIE = document.all? 1:0;

function checkKeyDown(ev)
{
  //just track the control key
  var e = (window.event) ? event.keyCode : ev.which;
  if (e == '17')
  {
    ctrlPressed = true;
  }
}

function checkKeyUp(ev)
{
  //just track the control key
  var e = (window.event) ? event.keyCode : ev.which;
  if (e == '17') {
    ctrlPressed = false;
  }
}


function parseuniphonetic(evnt)
{
  // main uniphonetic parser
	var t = BanglaKeyboardUtil.mActiveField;
	var e = (window.event) ? event.keyCode : evnt.which; // get the keycode

	if (e == '113')
	{
		//switch the keyboard mode
		if(ctrlPressed){
			return true;
		}
	}

	if(ctrlPressed)
	{
		// user is pressing control, so leave the parsing
		e=0; 
	}

	var char_e = String.fromCharCode(e); // get the character equivalent to this keycode
	
	if(e==8 || e==32)
	{
		// if space is pressed we have to clear the carry. otherwise there will be some malformed conjunctions
		carry = " ";	
		old_len = 1;
		return;
	}

	lastcarry = carry;
	carry += "" + char_e;	 //append the current character pressed to the carry
	
	bangla = parseuniphoneticCarry(carry); // get the combined equivalent
	tempBangla = parseuniphoneticCarry(char_e); // get the single equivalent

	if (tempBangla == ".." || bangla == "..") //that means it has next sibling
	{
		return false;
	}
	if (char_e=="+")
	{
		if(carry=="++")
		{
			// check if it is a plus sign
			insertJointAtCursor("+",old_len);
			old_len=1;
			return false;
		}	
		//otherwise this is a simple joiner
		insertAtCursor("\u09CD");old_len = 1;
		carry="+";
		return false;
	}
	else if(old_len==0) //first character
	{
		// this is first time someone press a character
		insertJointAtCursor(bangla,1);
		old_len=1;
		return false;
		
	}

	else if(carry=="ao")
	{
		// its a shore o
		insertJointAtCursor(parseuniphoneticCarry("ao"),old_len);
		old_len=1;
		return false;
	}
	else if (carry == "ii")
	{
		// process dirgho i kar

		insertJointAtCursor(uniphonetic['ii'],1);
		old_len = 1;
		return false;
	}
	else if (carry == "oi" )
	{
		insertJointAtCursor('\u09C8',1);
		return false;
	}		

	else if (char_e == "o")
	{
		old_len = 1;
		insertAtCursor('\u09CB');
		carry = "o";
		return false;
	}
	else if (carry == "ou")
	{
		// ou kar
		insertJointAtCursor("\u09CC",old_len);
		old_len = 1;
		return false;
	}	
	
	else if((bangla == "" && tempBangla !="")) //that means it has no joint equivalent
	{
		
		// there is no joint equivalent - so show the single equivalent. 
		bangla = tempBangla;
		if (bangla=="")
		{
			// there is no available equivalent - leave as is
			carry ="";
			return;
		}
		
		else
		{
			// found one equivalent
			carry = char_e;
			insertAtCursor(bangla);
			old_len = bangla.length;
			return false;
		}
	}
	else if(bangla!="")//joint equivalent found 
	{
		// we have found some joint equivalent process it
		
		insertJointAtCursor(bangla, old_len);
		old_len = bangla.length;
		return false;
	}
}

    function parseuniphoneticCarry(code)
    {
	//this function just returns a bangla equivalent for a given keystroke
	//or a conjunction
	//just read the array - if found then return the bangla eq.
	//otherwise return a null value
        if (!uniphonetic[code])  //Oh my god :-( no bangla equivalent for this keystroke

        {
			return ''; //return a null value
        }
        else
        {
            return ( uniphonetic[code]);  //voila - we've found bangla equivalent
        }

    }


function insertAtCursor(myValue) {
	/**
	 * this function inserts a character at the current cursor position in a text area
	 * many thanks to alex king and phpMyAdmin for this cool function
	 * 
	 * This function is originally found in phpMyAdmin package and modified by Hasin Hayder to meet the requirement
	 */
	var myField = BanglaKeyboardUtil.mActiveField;
	if (document.selection) {
		//alert("hello2");
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		sel.collapse(true);
		sel.select();
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == 0) {
		
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var scrollTop = myField.scrollTop;
		startPos = (startPos == -1 ? myField.value.length : startPos );
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
		myField.scrollTop = scrollTop;
	} else {
		var scrollTop = myField.scrollTop;
		myField.value += myValue;
		myField.focus();
		myField.scrollTop = scrollTop;
	}
}

function insertJointAtCursor(myValue, len) {
  /**
   * this function inserts a conjunction and removes previous single character
   * at the current cursor position in a text area
   * This function is derived from the original one found in phpMyAdmin
   * package and modified by Hasin to meet our need
   */
  var myField = BanglaKeyboardUtil.mActiveField;
  if (document.selection) {
    myField.focus();
    var sel = document.selection.createRange();
    if (myField.value.length >= len) {  // here is that first conjunction bug in IE, if you use the > operator
      sel.moveStart('character', -1 * (len));   
    }
    sel.text = myValue;
    sel.collapse(true);
    sel.select();
  }
  //MOZILLA/NETSCAPE support
  else if (myField.selectionStart || myField.selectionStart == 0) {
    myField.focus();
    var startPos = myField.selectionStart - len;
    var endPos = myField.selectionEnd;
    var scrollTop = myField.scrollTop;
    startPos = (startPos == -1 ? myField.value.length : startPos );
    myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
    myField.scrollTop = scrollTop;
  } else {
    var scrollTop = myField.scrollTop;
    myField.value += myValue;
    myField.focus();
    myField.scrollTop = scrollTop;
  }
	//document.getElementById("len").innerHTML = len;
}

function makeUniPhoneticEditor(pInputElement)
{
  pInputElement.onkeypress = parseuniphonetic;
  pInputElement.onkeydown = checkKeyDown;
  pInputElement.onkeyup = checkKeyUp;
}