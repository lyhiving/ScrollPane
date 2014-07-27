/*
code extracted from http://www.nimbletank.com/offering/creative
2014-07-27

How to use:

var a = ScrollPane(document.getElementById("inner"), false, true);
window.addEventListener('resize', function()
{
	a.resize();
	a.slideTo(0, 0, 1);
})


Parameters:
1. scroll element ( not the wrapper )
2. if allow scroll horizontally ( true/false )
3. if allow scroll vertically ( true/false )
4. config object ( optional )
	{
		handle:  the element which will be listen to
		holder:  the wrapper element
	}

*/

function ScrollPane(el, scrollHorizontal, scrollVertical, options)
{
	var isTouch = "ontouchstart" in window,
		Events = {
			DOWN: isTouch ? "touchstart" : "mousedown",
			UP: isTouch ? "touchend" : "mouseup",
			MOVE: isTouch ? "touchmove" : "mousemove"
		};

	var Sys = function()
	{
		var a = navigator.userAgent,
			b = a.match(/iPhone/i),
			c = a.match(/iPad/i),
			h = a.match(/iPod/i),
			h = b || c || h,
			e = /Android/.test(a),
			d = /WebKit/.test(a),
			k = /Chrome/.test(a),
			g = /webOS|TouchPad/.test(a),
			q = /BlackBerry|RIM/.test(a),
			f = -1;
		e && (f = a.split("Android")[1], f = parseFloat(f.substring(0, f.indexOf(";"))));
		var l = -1;
		h && (l = parseFloat(a.match(/os ([\d_]*)/i)[1].replace("_", ".")));
		var n = window.innerWidth < window.innerHeight ? window.innerWidth / 768 : window.innerWidth / 1024;
		1 < n && (n = 1);
		var r = {
			touch: "ontouchstart" in window,
			multiTouch: "ongesturestart" in window || q && d,
			multipleTransforms: d && !e,
			translate3d: d && !e || 4 <= f,
			hdVideo: (!m || c || h && 4 <= l) && !e
		},
			m = r.touch || /Mobile|Tablet/i.test(a),
			p = (a = /MSIE/.test(a)) && m;
		return {
			isMobile: m,
			isIOS: h,
			isAndroid: e,
			isIPad: c,
			isIPhone: b,
			isWebOS: g,
			isBB: q,
			isPlayBook: q && /PlayBook/i.test(navigator.userAgent),
			isIE: a,
			isIEMobile: p,
			isWebKit: d,
			isChrome: k,
			isOnline: -1 != location.href.indexOf("http"),
			supports: r,
			androidVersion: f,
			iOSVersion: l,
			hasIssuesWith: {
				resetTransition: false
			},
			deviceScaleFactor: n,
			deviceScaleFactor2: 0.7 > n ? 0.7 : n,
			devicePixelRatio: window.devicePixelRatio || 1
		}
	}();

	var Utils = function()
	{
		var a, b, c, h, e, d = function(a, c) {
				a.style[b] = c
			};
		(function(d) {
			for (var g = [
				["transform", "", "transition", "transform-origin"],
				["WebkitTransform", "-webkit-", "WebkitTransition", "WebkitTransformOrigin"],
				["MozTransform", "-moz-", "MozTransition", "MozTransformOrigin"],
				["OTransform", "-o-", "OTransition", "OTransformOrigin"],
				["msTransform", "-ms-", "msTransition", "msTransformOrigin"]
			], e = g.length; e--;)
			if ("undefined" != typeof d.style[g[e][0]]) {
				var f = g[e];
				b = f[0];
				a = f[1];
				c = "undefined" != typeof d.style[g[e][2]] ? f[2] : "";
				h = f[3];
				break
			}
		})(document.documentElement);
		e = Sys.hasIssuesWith.resetTransition ? "all 0.0001ms linear" : "";
		return {
			rotate: function(a, b) {
				Sys.supports.translate3d ? d(a, "rotate(" + b + "rad) translateZ(0)") : d(a, "rotate(" + b + "rad)")
			},
			transform: d,
			transform2: function(a, c, d, e, h) {
				c = Sys.supports.translate3d ? "translate3d(" + c + "px," + d + "px,0px)" : "translate(" + c + "px," + d + "px)";
				void 0 != e && (c += " scale(" + e + ")");
				void 0 != h && (c += " rotate(" + h + "rad)");
				a.style[b] = c
			},
			transition: function(b, d, e, h, l) {
				"transform" == d && (d = a + "transform");
				b.style[c] = d + " " + e;
				void 0 !== l && (b.style[a + "transition-delay"] = l + "ms")
			},
			translate: function(a, b, c, e) {
				Sys.supports.translate3d ? d(a, "translate3d(" + b + "," + c + "," + (void 0 != e ? e : "0px") + ")") : d(a, "translate(" + b + "," + c + ")")
			},
			resetTransition: function(b) {
				b.style[c] = e;
				b.style[a + "transition-delay"] = "0"
			},
			setTransformOrigin: function(a, b) {
				a.style[h] = b
			},
			smoothEdge: function(a) {
				Sys.isIPad && (a.style.WebkitBoxShadow = "0px 0px 1px " + getComputedStyle(a).backgroundColor)
			},
			vendorPrefix: a,
			transformName: b,
			transitionName: c,
			setSelectable: function(a, b, c) {
				a.onselectstart = b ? null : function() {
					return false
				};
				a.style.cursor = b ? "auto" : "default"
			},
			delegate: function(a, b) {
				var c = Array.prototype.slice.call(arguments);
				c.splice(0, 2);
				return function() {
					b.apply(a, c.length ? c : Array.prototype.slice.call(arguments))
				}
			},
			addClass: function(a, b) {
				a.className = a.className ? a.className + (" " + b) : b;
				return a
			},
			fixLinkTemp: function(a) {
				a = a.getElementsByTagName("a");
				for (var b = a.length; b--;) {
					var c = a[b],
						e = c.href;
					c.href = "javascript:void(0)"; - 1 == e.indexOf("#") && (c._href = e, c.addEventListener(Sys.supports.touch ? "touchend" : "click", function(a) {
						Microsite.navigate(a.target._href)
					}, false), c.addEventListener(Sys.supports.touch ? "touchstart" : "mousedown", function(a) {
						a.target.style.opacity = 0.1;
						setTimeout(function() {
							a.target.style.opacity = 1;
							Utils.transition(a.target, "opacity", "250ms ease-in-out")
						}, 0)
					}, false))
				}
			},
			tappify: function(a, b) {
				var c = a.href;
				a.addEventListener("click", Utils.preventDefault, false);
				a.addEventListener(b || Events.UP, function() {
					window.location.href = c
				}, false);
				a.href = "javascript:void(0)"
			},
			preventDefault: function(a) {
				a.preventDefault()
			}
		}
	}();

	var MathUtils = function() {
			function a(a, e) {
				var d = a - e;
				d > b ? e += c : d < -b && (e -= c);
				return e - a
			}
			var b = Math.PI,
				c = 2 * Math.PI;
			return {
				DEG_TO_RAD: b / 180,
				clamp: function(a, b, c) {
					return a > c ? c : a < b ? b : a
				},
				wrap: function(a, b, c) {
					if (b == c) return a;
					if (b > c) {
						var k = b;
						b = c;
						c = k
					}
					for (; a < b;)
					a += c - b;
					for (; a > c;)
					a -= c - b;
					return a
				},
				map: function(a, b, c, k, g) {
					return k + (a - b) / (c - b) * (g - k)
				},
				randRange: function(a, b) {
					return a + Math.random() * (b - a)
				},
				distance: function(a, b, c, k) {
					return Math.sqrt((a - c) * (a - c) + (b - k) * (b - k))
				},
				angleDifference: a,
				wrapAngle: function(a) {
					for (; a > b;)
					a -= c;
					for (; a < -b;)
					a += c;
					return a
				},
				easeAngle: function(b, c, d) {
					return b + a(b, c) * d
				},
				interpolatePointOnLine: function(a, b, c, k, g) {
					return {
						x: c + (a - c) * g,
						y: k + (b - k) * g
					}
				}
			}
		}();

	function $(a) {
		return document.getElementById(a)
	}

	var requestAnimFrame = function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(a, b) {
			window.setTimeout(a, 1E3 / 60)
		}
	}();

	var SPZ = SPZ || {};
	SPZ.RBand = function() {
		this.max = this.min = this.contPos = this.v = this.p = 0;
		this.isBouncy = this.isMoving = false;
		this.vObj = {
			pos: 0,
			v: 0,
			isMoving: false
		}
	};
	SPZ.RBand.prototype.set = function(a) {
		this.p = a;
		this.v = 0
	};
	SPZ.RBand.prototype.setBounds = function(a, b) {
		this.min = a;
		this.max = b
	};
	SPZ.RBand.prototype.update = function(a, b, c) {
		if (a) {
			this.v = b - this.p;
			this.p = b;
			if (this.contPos < this.min || this.contPos > this.max) this.v *= 0.5;
			this.contPos += this.v;
			this.isMoving = true
		} else this.isMoving = 0.1 < Math.abs(this.v), this.v *= 0.97, a = this.contPos + this.v, b = this.isBouncy ? a : this.contPos, a < this.min ? (c = this.velo(b, this.min, this.v), a = c.pos, this.v = c.v, this.isMoving = c.isMoving) : a > this.max ? (c = this.velo(b, this.max, this.v), a = c.pos, this.v = c.v, this.isMoving = c.isMoving) : void 0 !== c && (c = this.velo(b, c, this.v), a = c.pos, this.v = c.v, this.isMoving = c.isMoving), this.contPos = a;
		return this.contPos
	};
	SPZ.RBand.prototype.velo = function(a, b, c) {
		this.vObj.isMoving = 0.5 < Math.abs(b - a) || 0.5 < Math.abs(c);
		this.vObj.isMoving ? (c = 0.74 * (c + 0.04 * (b - a)), a += c, this.vObj.pos = a, this.vObj.v = c) : (this.vObj.v = 0, this.vObj.pos = b);
		return this.vObj
	};




	SPZ.ScrollPane = function() {
		this.isRunning = false;
		this.holder = this.content = null;
		this.minY = this.minX = this.contentY = this.contentX = 0;
		this.maxY = this.maxX = 1;
		this.numPages = 0;
		this.bounds = {};
		this.selectedPageIndex = 0;
		this.onPageChanged = null;
		this.slideCompleteTimeout = -1;
		this.onPageChangedMotionComplete = null;
		this.isPagedY = this.isPagedX = this.doScrollY = this.doScrollX = this.hasPageChanged = false;
		this.rBandY = this.rBandX = null;
		this.startDel = Utils.delegate(this, this.onTouchStart);
		this.endDel = Utils.delegate(this, this.onTouchEnd);
		this.moveDel = Utils.delegate(this, this.onTouchMove);
		this.updateDel = Utils.delegate(this, this.update);
		this.time = this.dragY = this.dragX = 0;
		this.timeThresh = 60;
		this.isDraggingPos = false;
		this.touchStartPoint = {
			x: -1,
			y: -1
		};
		this.vLocked = this.hLocked = this.isMoving = false;
		this.dragScaleV = this.dragPrevScale = this.dragScale = this.gestureStartDist = this.moveThresh = 0;
		this.isGesturing = false;
		this.dragAngleV = this.dragPrevAngle = this.dragAngle = 0;
		this.touches = null;
		this.isActive = this.isTouched = false
	};

	SPZ.ScrollPane.prototype.init = function(el, scrollHorizontal, scrollVertical, options) {
		this.handle = el;
		if (scrollHorizontal) this.rBandX = new SPZ.RBand;
	 	if (scrollVertical) this.rBandY = new SPZ.RBand;
		this.doScrollX = scrollHorizontal;
		this.doScrollY = scrollVertical;
		this.content = el;
		this.holder = el.parentNode;
		if (options) for (var e in options) this[e] = options[e];
		this.isPagedX && (this.numPages = el.children.length);
		this.activate(true);
		this.resize();
		Sys.isAndroid && (this.timeThresh = 100)
	};
	SPZ.ScrollPane.prototype.activate = function(a) {
		this.handle[a ? "addEventListener" : "removeEventListener"](Sys.supports.touch ? "touchstart" : "mousedown", this.startDel, false);
		this.isActive = a;
		this.isDraggingPos && this.dragEnd(this.dragX, this.dragY, {})
	};
	SPZ.ScrollPane.prototype.remove = function() {
		this.pause();
		this.activate(false);
		this.listenForMoveAndEnd(false);
		Utils.resetTransition(this.content);
		this.content = this.holder = this.onPageChanged = null
	};
	SPZ.ScrollPane.prototype.slideTo = function(a, b, c, h) {
		void 0 == c && (c = 350);
		Utils.resetTransition(this.content);
		Utils.transform2(this.content, -a, -b);
		Utils.transition(this.content, "transform", c + "ms " + (h || ""));
		var e = this;
		setTimeout(function() {
			e.pause()
		}, 0);
		clearTimeout(this.slideCompleteTimeout);
		this.slideCompleteTimeout = setTimeout(function() {
			Utils.resetTransition(e.content)
		}, c + 1);
		this.doScrollX && (this.rBandX.contPos = this.contentX = -a);
		this.doScrollY && (this.rBandY.contPos = this.contentY = -b)
	};
	SPZ.ScrollPane.prototype.toPageIndex = function(a, b, c) {
		this.slideTo(this.bounds.width * a, this.contentY, b, c);
		this.pageChanged(a)
	};
	SPZ.ScrollPane.prototype.play = function() {
		!this.isRunning && this.isActive && (this.isRunning = true, this.update())
	};
	SPZ.ScrollPane.prototype.pause = function() {
		this.isRunning = false
	};
	SPZ.ScrollPane.prototype.listenForMoveAndEnd = function(a) {
		a = a ? "addEventListener" : "removeEventListener";
		document[a](Sys.supports.touch ? "touchmove" : "mousemove", this.moveDel, false);
		document[a](Sys.supports.touch ? "touchend" : "mouseup", this.endDel, false)
	};
	SPZ.ScrollPane.prototype.resize = function(a) {
		var b = this.contentX / (this.maxX - this.minX),
			c = this.contentY / (this.maxY - this.minY);
		a || (a = {
			x: 0,
			y: 0,
			width: this.holder.offsetWidth,
			height: this.holder.offsetHeight
		});
		this.bounds = a;
		if (this.isPagedX) {
			this.content.style.width = this.numPages * a.width + "px";
			for (var h = this.numPages; h--;)
			this.content.children[h].style.width = a.width + "px"
		}
		this.minX = a.width - this.content.offsetWidth;
		this.minY = a.height - this.content.offsetHeight;
		this.isPagedX && (this.minX = a.width - this.numPages * this.bounds.width);
		this.maxX = a.x;
		this.maxY = a.y;
		this.doScrollX && (this.maxX <= this.minX && (this.minX = this.maxX = 0), this.rBandX.setBounds(this.minX, this.maxX), this.contentX = this.rBandX.contPos = (this.maxX - this.minX) * b, this.rBandX.v = 0);
		this.doScrollY && (this.maxY <= this.minY && (this.minY = this.maxY = 0), this.rBandY.setBounds(this.minY, this.maxY), this.contentY = this.rBandY.contPos = (this.maxY - this.minY) * c, this.rBandY.v = 0);
		Utils.transform2(this.content, this.contentX, this.contentY)
	};
	SPZ.ScrollPane.prototype.update = function() {
		if (this.isRunning) {
			requestAnimFrame(this.updateDel);
			this.isMoving && this.move();
			var a = this.rBandY && this.rBandY.isMoving;
			if (!(this.rBandX && this.rBandX.isMoving || a) && (this.pause(), this.hasPageChanged && this.onPageChangedMotionComplete)) this.onPageChangedMotionComplete({
				target: this,
				index: this.selectedPageIndex
			})
		}
	};
	SPZ.ScrollPane.prototype.move = function() {
		this.doScrollX && (this.contentX = this.rBandX.update(this.isDraggingPos, this.dragX, this.targetX));
		this.doScrollY && (this.contentY = this.rBandY.update(this.isDraggingPos, this.dragY, this.targetY));
		Utils.transform2(this.content, this.contentX, this.contentY)
	};
	SPZ.ScrollPane.prototype.setSnap = function(a, b, c, h, e) {
		a += 0.5 * c;
		var d = 0.65 * c;
		b = MathUtils.clamp(45 * b, -d, d);
		b = -Math.floor((a + b) / c);
		b = MathUtils.clamp(b, 0, this.numPages - 1);
		this.pageChanged(b);
		return MathUtils.clamp(-b * c, h, e)
	};
	SPZ.ScrollPane.prototype.pageChanged = function(a) {
		if (a != this.selectedPageIndex) {
			if (this.onPageChanged) this.onPageChanged({
				target: this,
				index: a,
				oldIndex: this.selectedPageIndex
			});
			this.selectedPageIndex = a;
			this.hasPageChanged = true
		}
	};
	SPZ.ScrollPane.prototype.findDir = function() {
		if (0 == this.moveThresh) this.pause(), this.isMoving = true, this.move();
		else {
			var a = this.dragX - this.touchStartPoint.x,
				b = this.dragY - this.touchStartPoint.y;
			if (Math.abs(a) > this.moveThresh || Math.abs(b) > this.moveThresh) a = Math.abs(Math.atan2(b, a)), this.hLocked = a < 0.25 * Math.PI || a > 0.75 * Math.PI, this.vLocked = !this.hLocked, this.hLocked && this.doScrollX || this.vLocked && this.doScrollY ? (this.pause(), this.isMoving = true, this.move()) : (this.dragEnd(this.dragX, this.dragY), this.doScrollX && (a = this.setSnap(this.contentX, this.rBandX.v, this.bounds.width, this.minX, this.maxX), this.slideTo(-a, 0, 300, "0,0,0,1")))
		}
	};
	SPZ.ScrollPane.prototype.dragStart = function(a, b, c) {
		this.hasPageChanged = false;
		Utils.resetTransition(this.content);
		this.isDraggingPos = true;
		this.dragX = a;
		this.dragY = b;
		this.doScrollX && this.rBandX.set(this.dragX);
		this.doScrollY && this.rBandY.set(this.dragY);
		this.time = this.getTimeStamp(c);
		this.touchStartPoint.x = this.dragX;
		this.touchStartPoint.y = this.dragY;
		this.isMoving = false;
		this.pause()
	};
	SPZ.ScrollPane.prototype.dragChange = function(a, b, c) {
		this.dragX = a;
		this.dragY = b;
		this.time = this.getTimeStamp(c);
		this.isMoving ? this.move() : this.findDir()
	};
	SPZ.ScrollPane.prototype.dragEnd = function(a, b, c) {
		this.isDraggingPos = false;
		this.listenForMoveAndEnd(false);
		this.getTimeStamp(c) - this.time > this.timeThresh && (this.doScrollX && this.rBandX.set(this.dragX), this.doScrollY && this.rBandY.set(this.dragY));
		this.isPagedX && (this.targetX = this.setSnap(this.contentX, this.rBandX.v, this.bounds.width, this.minX, this.maxX));
		this.isPagedY && (this.targetY = this.setSnap(this.contentY, this.rBandY.v, this.bounds.height, this.minY, this.maxY));
		this.play()
	};
	SPZ.ScrollPane.prototype.getTimeStamp = function(a) {
		return a && void 0 != a.timeStamp && 0 < a.timeStamp ? a.timeStamp : (new Date).getTime()
	};
	SPZ.ScrollPane.prototype.gestureStart = function(a, b) {
		this.isGesturing = true;
		this.dragScale = this.dragPrevScale = a;
		this.dragAngle = this.dragPrevAngle = b;
		this.dragAngleV = 0;
		this.isDraggingAngle = true
	};
	SPZ.ScrollPane.prototype.gestureChange = function(a, b) {
		this.dragScale = a;
		this.dragAngle = b
	};
	SPZ.ScrollPane.prototype.gestureEnd = function() {
		this.isGesturing = false
	};
	SPZ.ScrollPane.prototype.onTouchStart = function(a) {
		this.isTouched = true;
		"mousedown" == a.type && (a = this.mouseToTouchEvent(a));
		if (1 == a.touches.length) this.dragStart(a.touches[0].pageX, a.touches[0].pageY, a);
		else if (2 <= a.touches.length) {
			var b = a.touches[0].pageX,
				c = a.touches[0].pageY,
				h = a.touches[1].pageX,
				e = a.touches[1].pageY,
				d = MathUtils.interpolatePointOnLine(b, c, h, e, 0.5);
			this.dragStart(d.x, d.y, a);
			this.gestureStartDist = MathUtils.distance(b, c, h, e);
			this.gestureStart(1, Math.atan2(c - e, b - h))
		}
		this.touches = a.touches;
		this.listenForMoveAndEnd(true)
	};
	SPZ.ScrollPane.prototype.onTouchMove = function(a) {
		if ("mousemove" == a.type) {
			if (!this.isTouched) return;
			a = this.mouseToTouchEvent(a)
		}
		if (1 == a.touches.length) this.dragChange(a.touches[0].pageX, a.touches[0].pageY, a);
		else if (2 <= a.touches.length) {
			var b = a.touches[0].pageX,
				c = a.touches[0].pageY,
				h = a.touches[1].pageX,
				e = a.touches[1].pageY,
				d = MathUtils.interpolatePointOnLine(b, c, h, e, 0.5);
			this.dragChange(d.x, d.y, a);
			this.gestureChange(MathUtils.distance(b, c, h, e) / this.gestureStartDist, Math.atan2(c - e, b - h))
		}
		this.touches = a.touches;
		a.preventDefault()
	};
	SPZ.ScrollPane.prototype.onTouchEnd = function(a) {
		this.touches = a.touches;
		if ("mouseup" == a.type) this.isTouched = false, this.dragEnd(a.pageX, a.pageY, a);
		else if (0 == a.touches.length) {
			var b, c;
			!Sys.supports.multiTouch && a.changedTouches && 1 == a.changedTouches.length ? (b = a.changedTouches[0].pageX, c = a.changedTouches[0].pageY) : (b = this.dragX, c = this.dragY);
			this.dragEnd(b, c, a);
			this.gestureEnd()
		} else if (1 == a.touches.length) this.dragStart(a.touches[0].pageX, a.touches[0].pageY, a), this.gestureEnd();
		else this.onTouchStart(a)
	};
	SPZ.ScrollPane.prototype.mouseToTouchEvent = function(a) {
		a.touches = [{
			pageX: a.pageX,
			pageY: a.pageY
		}];
		return a
	};
	
	
	if (typeof el == 'object')
	{
		var	a = new SPZ.ScrollPane;
	    a.init(el, scrollHorizontal, scrollVertical, options);
		return a;
	}
	else if (el && typeof el == 'string')
	{
		if (el == 'sys') return Sys;
		if (el == 'utils') return Utils;
	}
}