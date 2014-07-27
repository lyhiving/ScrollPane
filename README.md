code extracted from http://www.nimbletank.com/offering/creative

at 2014-07-27


Demo http://jszen.com/public/demo/scroll/index.html

Demo2 http://jszen.com/public/demo/scroll/demo2.html

Demo3 http://jszen.com/public/demo/scroll/demo3.html



##How to use:##

```javascript
var a = ScrollPane(document.getElementById("inner"), false, true);
window.addEventListener('resize', function()
{
	a.resize();
	a.slideTo(0, 0, 1);
});
```

```
Parameters:
1. scroll element ( not the wrapper )
2. if allow scroll horizontally ( true/false )
3. if allow scroll vertically ( true/false )
4. config object ( optional )
	{
		handle:  the element which will be listen to
		holder:  the wrapper element
	}
```