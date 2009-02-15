/**
 * Unicode unijoy Parser for writing in webpages
 * This script helps to write unicode bangla using unijoy (or bijoy) keyboard mapping
 * 
 * @name Unijoy Unicode Parser
 * @version 1.0 [Date 26th August, 2006]
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
var unijoy=new Array();

// unijoy bangla equivalents
unijoy['j'] = "\u0995"; // ko

unijoy['d']='\u09BF'; // hrossho i kar
unijoy['gd']='\u0987'; // hrossho i
unijoy['D']='\u09C0'; // dirgho i kar
unijoy['gD']='\u0988'; // dirgho i
unijoy['c']='\u09C7'; // e kar
unijoy['gc'] = '\u098F'; // E
unijoy['gs'] = '\u0989'; // hrossho u
unijoy['s'] = '\u09C1'; // hrossho u kar
unijoy['S'] = '\u09C2'; // dirgho u kar
unijoy['gS'] = '\u098A'; // dirgho u
unijoy['v']='\u09B0'; // ro
unijoy['a']='\u098B'; // wri
unijoy['f']='\u09BE'; // a kar
unijoy['gf'] = '\u0986'; //shore a
unijoy['F']='\u0985'; // shore ao
//unijoy['ao']='\u0985'; // shore o
unijoy['n']='\u09B8'; // dontyo so
unijoy['t']='\u099f'; // to
unijoy['J'] = '\u0996'; // Kho

//unijoy['kh'] = '\u0996'; // kho

unijoy['b']='\u09A8'; // dontyo no
unijoy['B']='\u09A3'; // murdhonyo no
unijoy['k']='\u09A4'; // tto
unijoy['K']='\u09A5'; // ttho

unijoy['e']='\u09A1'; // ddo
unijoy['E']='\u09A2'; // ddho

unijoy['h']='\u09AC'; // bo
unijoy['H']='\u09AD'; // bho
//unijoy['v']='\u09AD'; // bho
//unijoy['rh']='o';	 // doye bindu ro
unijoy['p']='\u09DC';	 // doye bindu ro
unijoy['P']='\u09DD';	 // dhoye bindu ro
unijoy['o']='\u0997';	// go
unijoy['O']='\u0998';	// gho

//unijoy['gh']='\u0998'; // gho

unijoy['i']='\u09B9';	// ho
unijoy['I']='\u099E';	// yo
unijoy['u']='\u099C';	// borgio jo
unijoy['U']='\u099D'; // jho
//unijoy['jh']='\u099D'; // jho
unijoy['y']='\u099A'; //  cho
unijoy['Y']='\u099B'; // cho
//unijoy['C']='\u099B'; // ccho
unijoy['T']='\u09A0'; // tho
unijoy['r']='\u09AA'; // po
unijoy['R']='\u09AB'; // fo
//unijoy['ph']='\u09AB'; // fo
unijoy['l']='\u09A6'; // do
unijoy['L']='\u09A7'; // dho

unijoy['w']='\u09AF';// ontoshyo zo
unijoy['W']='\u09DF';	// ontostho yo
unijoy['q']='\u0999';	// Uma
unijoy['Q']='\u0982';	// uniswor
unijoy['V']='\u09B2';	// lo
unijoy['m']='\u09AE';	// mo
unijoy['M']='\u09B6';	// talobyo sho
unijoy['N']='\u09B7'; // mordhonyo sho
unijoy['gx']= '\u0993';//'\u09CB'; // o
unijoy['X']='\u09CC'; // ou kar
unijoy['gX']='\u0994'; // OU
//unijoy['Ou']='\u0994'; // OU
unijoy['gC']='\u0990'; // Oi
unijoy['\\']='\u09CE'; // tto
unijoy['|']='\u0983'; // bisworgo
unijoy["G"] ="\u0964"; // dari
//unijoy[".."] = "."; // fullstop
unijoy['g'] = ' ';//'\u09CD' + '\u200c'; // hosonto
unijoy['&'] = '\u0981'; // chondrobindu
unijoy['Z'] ='\u09CD'+'\u09AF'; // jo fola
unijoy['gh'] ='\u09CD'+ '\u09AC'; // bo fola
unijoy['ga'] ='\u098B';// wri kar
unijoy['a'] ='\u09C3'; // wri 
//unijoy['k'] ="\u0995"  + '\u09CD'+ '\u09B8';
unijoy['rZ'] = unijoy['r']+ '\u200c'+ '\u09CD'+'\u09AF';
unijoy['z'] =  '\u09CD'+ unijoy['v'];
unijoy['x'] = '\u09CB';
unijoy['C'] = '\u09C8'; //Oi Kar

//numeric characters, added by raju
unijoy['0'] = '\u09E6'; 
unijoy['1'] = '\u09E7'; 
unijoy['2'] = '\u09E8'; 
unijoy['3'] = '\u09E9'; 
unijoy['4'] = '\u09EA'; 
unijoy['5'] = '\u09EB'; 
unijoy['6'] = '\u09EC'; 
unijoy['7'] = '\u09ED'; 
unijoy['8'] = '\u09EE'; 
unijoy['9'] = '\u09EF'; 



var carry = '';  //This variable stores each keystrokes
var old_len =0; //This stores length parsed bangla charcter
var ctrlPressed=false;
var first_letter = false;
var lastInserted;

isIE=document.all? 1:0;

function checkKeyDown(ev)
{
	//just track the control key
	var e = (window.event) ? event.keyCode : ev.which;
	if (e=='17')
	{
		ctrlPressed = true;
	}
}

function checkKeyUp(ev)
{
	//just track the control key
	var e = (window.event) ? event.keyCode : ev.which;
	if (e=='17')
	{
		ctrlPressed = false;
		//alert(ctrlPressed);
	}

}


function parseunijoy(evnt)
{
	// main unijoy parser
	var t = BanglaKeyboardUtil.mActiveField;
	var e = (window.event) ? event.keyCode : evnt.which; // get the keycode

	if (e=='113')
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
	
	bangla = parseunijoyCarry(carry); // get the combined equivalent
	tempBangla = parseunijoyCarry(char_e); // get the single equivalent

	if (tempBangla == ".." || bangla == "..") //that means it has sibling
	{
		return false;
	}
	if (char_e=="g")
	{
		if(carry=="gg")
		{
			// check if it is a plus sign
			insertConjunction('\u09CD' + '\u200c',old_len);
			old_len=1;
			return false;
		}	
		//otherwise this is a simple joiner
		insertAtCursor("\u09CD");old_len = 1;
		carry="g";
		return false;
	}

	else if(old_len==0) //first character
	{
		// this is first time someone press a character
		insertConjunction(bangla,1);
		old_len=1;
		return false;
		
	}

	else if(char_e=="A")
	{
		//process old style ref
		newChar = unijoy['v']+ '\u09CD' + lastInserted;
		insertConjunction(newChar, lastInserted.length );
		old_len = lastInserted.length;
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
		
		insertConjunction(bangla, old_len);
		old_len = bangla.length;
		return false;
	}
}

    function parseunijoyCarry(code)
    {
	//this function just returns a bangla equivalent for a given keystroke
	//or a conjunction
	//just read the array - if found then return the bangla eq.
	//otherwise return a null value
        if (!unijoy[code])  //Oh my god :-( no bangla equivalent for this keystroke

        {
			return ''; //return a null value
        }
        else
        {
            return ( unijoy[code]);  //voila - we've found bangla equivalent
        }

    }


function insertAtCursor(myValue) {
	/**
	 * this function inserts a character at the current cursor position in a text area
	 * many thanks to alex king and phpMyAdmin for this cool function
	 * 
	 * This function is originally found in phpMyAdmin package and modified by Hasin Hayder to meet the requirement
	 */
	lastInserted = myValue;
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

function insertConjunction(myValue, len) {
	/**
	 * this function inserts a conjunction and removes previous single character at the current cursor position in a text area
	 * 
	 * This function is derived from the original one found in phpMyAdmin package and modified by Hasin to meet our need
	 */
	//alert(len);
	lastInserted = myValue;
	var myField = BanglaKeyboardUtil.mActiveField;
	if (document.selection) {
		myField.focus();
		sel = document.selection.createRange();
		if (myField.value.length >= len){  // here is that first conjunction bug in IE, if you use the > operator
			sel.moveStart('character', -1*(len));   
			//sel.moveEnd('character',-1*(len-1));
		}
		sel.text = myValue;
		sel.collapse(true);
		sel.select();
	}
	//MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == 0) {
		myField.focus();
		var startPos = myField.selectionStart-len;
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

function makeUnijoyEditor(pInputElement)
{
  pInputElement.onkeypress = parseunijoy;
  pInputElement.onkeydown = checkKeyDown;
  pInputElement.onkeyup = checkKeyUp;
}