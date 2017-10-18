import ObjScroll from './smoothScroll';

import Anchor from './urlAnchor';

import DetailBottle from './DetailBottle';


// Anchor test
var anchor = new Anchor()

// Scroll activation
var scroll = new ObjScroll()
scroll.listenScroll()

var detail = new DetailBottle()
detail.buttonListener()
