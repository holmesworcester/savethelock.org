/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.

 Copyright (C) 2015 Fight for the Future

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/

window.components=window.components||{},window.components.forms=function(a,b){"use strict";function c(){var b=a.getElementById("form-zip_code");"US"!==n.value?b.setAttribute("placeholder","Post code"):b.setAttribute("placeholder","ZIP")}function d(){o.remove(),n.setAttribute("name","answer[country]"),n.classList.add("visible"),m.classList.add("hidden")}function e(a){var b=$c("div"),c=$c("h2"),d=$c("p");p.removeAttribute("disabled"),l.remove(),c.textContent="Something went wrong",a.type?d.textContent="There seems to be a problem somewhere in between your computer and our server. Might not be a bad idea to give it another try.":a.status?d.textContent='(the nerdy info is that the server returned a status of "'+a.status+'" and said "'+a.statusText+'".)':d.textContent="this seems to be a weird error. the nerds have been alerted.",b.appendChild(c),b.appendChild(d),alert(d.textContent),l.remove(),k.removeAttribute("disabled")}function f(){$c("div")}function g(c){function d(){var c={identifier:"86ef7be3-da62-480c-ab42-4643c0f93be8",website:b.location.origin,tags:JSON.parse(a.querySelector('[name="subscription[tag_list]"]').value),noOptIn:!1,name:a.getElementById("form-first_name").value,email:a.getElementById("form-email").value,ZIP:a.getElementById("form-zip_code").value,country:n.value};return JSON.stringify(c)}function g(){h.status>=200&&h.status<400?f():e(h)}c.preventDefault();var h=new XMLHttpRequest;p.setAttribute("disabled",!0),l.classList.add("submitted"),k.setAttribute("disabled",!0),p.appendChild(l),h.open("POST",p.dataset.host+"/submission",!0),h.setRequestHeader("Content-Type","application/json"),h.addEventListener("error",e),h.addEventListener("load",g),h.send(d())}function h(){m.addEventListener("click",d),n.addEventListener("change",c),p.addEventListener("submit",g)}function i(){h()}var j=a.getElementsByTagName("body")[0],k=j.querySelector('[type="submit"]'),l=$c("div"),m=a.querySelector('[for="select-country"]'),n=a.getElementById("select-country"),o=a.getElementById("hidden-country"),p=a.forms[0];l.classList.add("submitted"),l.innerHTML='<h2>Hang on a tick&hellip;</h2><h3>&hellip;reticulating splines.</h3><div class="circle-spinner">&nbsp;</div> ',i()},function(a,b){b.views=b.views||{},b.views.modals={PlainModalView:function(a){var b=$c("div"),c=$c("button");return c.classList.add("close"),c.textContent="×",b.classList.add("modal","_plain_modal"),b.appendChild(c),b.appendChild(a),b},ShareDaisyModalView:function(b){var c=a.getElementById("share-modal"),d=c.dataset.shareUrl+"&utm_source=petitions&utm_medium=web&utm_campaign="+encodeURIComponent(a.getElementById("petition-title").textContent),e=c.dataset.tweet,f=$c("div"),g=$c("a"),h=$c("a"),i=$c("a");return f.classList.add("modal-share-links"),g.setAttribute("href","https://facebook.com/sharer.php?u="+d),g.classList.add("modal-share-link","share-this-fb"),g.textContent="Share on Facebook",h.setAttribute("href","https://plus.google.com/share?url="+d),h.classList.add("modal-share-link","share-this-gp"),h.textContent="Share on Google Plus",i.setAttribute("href","https://twitter.com/share?text="+e+"&url="+d),i.classList.add("modal-share-link","share-this-tw"),i.textContent="Tweet this page",f.appendChild(g),f.appendChild(h),f.appendChild(i),c.innerHTML=b,c.appendChild(f),this.PlainModalView(c)}}}(document,window);var $c=document.createElement.bind(document);!function(a,b){"use strict";function c(){b.components=b.components||{};var c=0,d=a.getElementsByTagName("body")[0].dataset.components;if(void 0!==d)for(d=d.split(" "),c=d.length;c--;)""!==d[c]&&void 0!==b.components[d[c]]&&b.components[d[c]](a,b)}c();var d=function(){var b=(window.pageYOffset||a.scrollTop)-(a.clientTop||0);b>300&&(window.removeEventListener("scroll",d),document.querySelector("ul.share").classList.add("visible"))};window.addEventListener("scroll",d);for(var e=document.querySelectorAll("button.google"),f=0;f<e.length;f++)e[f].addEventListener("click",function(a){a.preventDefault();var b=window.location.protocol+"//"+window.location.host;window.open("https://plus.google.com/share?url="+b,"share_gl","width=500, height=300, toolbar=no, status=no, menubar=no")},!1)}(document,window);
//# sourceMappingURL=core.js.map