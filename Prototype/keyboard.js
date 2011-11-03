$('#keyboard').keyboard({

  // *** choose layout ***
  layout       : 'qwerty',
  customLayout : { default: ['{cancel}'] },

  position     : {
    of : null, // optional - null (attach to input/textarea) or a jQuery object (attach elsewhere)
    my : 'center top',
    at : 'center top',
    at2: 'center bottom' // used when "usePreview" is false (centers keyboard at bottom of the input/textarea)
  },
  
  // preview added above keyboard if true, original input/textarea used if false
  usePreview   : false,

  // if true, the keyboard will always be visible
  alwaysOpen   : true,

  // if true, keyboard will remain open even if the input loses focus.
  stayOpen     : true,

  // *** change keyboard language & look ***
  display : {
    'a'      : '\u2714:Accept',      // check mark - same action as accept
    'accept' : 'Accept:Accept',
    'alt'    : 'AltGr:Alternate Graphemes',
    'b'      : '\u2190:Backspace',   // Left arrow (same as &larr;)
    'bksp'   : 'Bksp:Backspace',
    'c'      : '\u2716:Cancel',      // big X, close - same action as cancel
    'cancel' : 'Cancel:Cancel',
    'clear'  : 'C:Clear',            // clear num pad
    'combo'  : '\u00f6:Toggle Combo Keys',
    'dec'    : '.:Decimal',          // decimal point for num pad - if used, only one decimal point is allowed
    'e'      : '\u21b5:Enter',       // down, then left arrow - enter symbol
    'enter'  : 'Enter:Enter',
    'lock'   : '\u21ea Lock:Caps Lock', // caps lock
    's'      : '\u21e7:Shift',       // thick hollow up arrow
    'shift'  : 'Shift:Shift',
    'sign'   : '\u00b1:Change Sign', // +/- sign for num pad
    'space'  : 'Space:Space',
    't'      : '\u21e5:Tab',         // right arrow to bar (one directional tabs)
    'tab'    : '\u21e5 Tab:Tab'      // \u21b9 is the true tab symbol (left & right arrows)
  },

  // Message added to the key title while hovering, if the mousewheel plugin exists
  wheelMessage : 'Use mousewheel to see other keys',

  css : {
    input          : 'ui-widget-content ui-corner-all', // input & preview
    container      : 'ui-widget-content ui-widget ui-corner-all ui-helper-clearfix', // keyboard container
    buttonDefault  : 'ui-state-default ui-corner-all', // default state
    buttonHover    : 'ui-state-hover',  // hovered button
    buttonAction   : 'ui-state-active', // Action keys (e.g. Accept, Cancel, Tab, etc); replaces "actionClass"
    buttonDisabled : 'ui-state-disabled' // used when disabling the decimal button {dec}
  },

  // *** Useability ***
  // Auto-accept content when clicking outside the keyboard (popup will close)
  autoAccept   : false,

  // Prevents direct input in the preview window when true
  lockInput    : false,

  // Prevent keys not in the displayed keyboard from being typed in
  restrictInput: false,

  // Use tab to navigate between input fields
  tabNavigation: false,

  // press enter (shift-enter in textarea) to go to the next input field
  enterNavigation : true,

  // Set this to append the keyboard immediately after the input/textarea it is attached to. This option
  // works best when the input container doesn't have a set width and when the "tabNavigation" option is true
  appendLocally: false,

  // If false, the shift key will remain active until the next key is (mouse) clicked on;
  // if true it will stay active until pressed again
  stickyShift  : true,

  // Prevent pasting content into the area
  preventPaste : false,

  // Set the max number of characters allowed in the input, setting it to false disables this option
  maxLength    : false,

  // Mouse repeat delay - when clicking/touching a virtual keyboard key, after this delay the key
  // will start repeating
  repeatDelay  : 500,

  // Mouse repeat rate - after the repeatDelay, this is the rate (characters per second) at which the
  // key is repeated. Added to simulate holding down a real keyboard key and having it repeat. I haven't
  // calculated the upper limit of this rate, but it is limited to how fast the javascript can process
  // the keys. And for me, in Firefox, it's around 20.
  repeatRate   : 20,

  // Event (namespaced) on the input to reveal the keyboard. To disable it, just set it to ''.
  openOn       : 'focus',

  // When the character is added to the input
  keyBinding   : 'mousedown',

  // combos (emulate dead keys : http://en.wikipedia.org/wiki/Keyboard_layout#US-International)
  // if user inputs `a the script converts it to Ã , ^o becomes Ã´, etc.
  useCombos    : true,

  // *** Methods ***
  // Callbacks - add code inside any of these callback functions as desired
  initialized : function(e, keyboard, el) {},
  accepted    : function(e, keyboard, el) {},
  canceled    : function(e, keyboard, el) {},
  hidden      : function(e, keyboard, el) {},
  visible     : function(e, keyboard, el) {},
  beforeClose : function(e, keyboard, el, accepted) {}

});