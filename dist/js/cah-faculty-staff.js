(function(t){function e(e){for(var n,a,o=e[0],c=e[1],l=e[2],p=0,f=[];p<o.length;p++)a=o[p],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&f.push(s[a][0]),s[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],n=!0,o=1;o<r.length;o++){var c=r[o];0!==s[c]&&(n=!1)}n&&(i.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},s={app:0},i=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="wordpress/wp-content/plugins/cah-faculty-staff-3/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"0acd":function(t,e,r){"use strict";var n=r("1f1b"),s=r.n(n);s.a},"0ddf":function(t,e,r){},"11fe":function(t,e,r){"use strict";var n=r("0ddf"),s=r.n(n);s.a},"13b0":function(t,e,r){},"1f1b":function(t,e,r){},"469b":function(t,e,r){"use strict";var n=r("13b0"),s=r.n(n);s.a},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row",class:{"flex-column":t.vertical},attrs:{id:"facultyBox"}},[t.filterable?t._e():r("div",{staticClass:"col-12 d-flex flex-row justify-content-center"},[r("div",{staticClass:"btn-group",attrs:{id:"formatButtons"}},[r("button",{staticClass:"btn btn-default",class:{active:"picture"==t.format},attrs:{type:"button",id:"picBtn"},on:{click:function(e){return e.preventDefault(),t.switchFormat("picture")}}},[r("img",{attrs:{src:t.distUrl+"img/address-card-solid.svg","aria-hidden":"true"}})]),r("button",{staticClass:"btn btn-default",class:{active:"a-z"==t.format},attrs:{type:"button",id:"azBtn"},on:{click:function(e){return e.preventDefault(),t.switchFormat("a-z")}}},[r("img",{attrs:{src:t.distUrl+"img/list-alt-solid.svg","aria-hidden":"true"}})])])]),t.filterable?r("dept-menu"):t._e(),t.displayList.length?t.isDetail?r("div",{staticClass:"col-12",class:{"col-md-9":t.filterable}},[r("faculty-detail",{attrs:{user:parseInt(t.detailUser)}})],1):r("div",{staticClass:"col-12",class:{"col-md-9":t.filterable&&!t.vertical}},[r("div",{staticClass:"row",attrs:{id:"entryBox"}},t._l(t.displayList,(function(e){return r("faculty",{key:e,attrs:{person:t.personList[e]}})})),1)]):r("div",{staticClass:"loading-gif"})],1)},i=[],a=(r("a4d3"),r("4de4"),r("caad"),r("d81d"),r("4fad"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("07ac"),r("2532"),r("3ca3"),r("159b"),r("ddb0"),r("2b3d"),r("3835")),o=r("ade3"),c=r("2f62"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-12 mb-4",class:{"col-md-4":t.filterable&&t.vertical,"col-md-3":t.filterable&&!t.vertical},attrs:{id:"deptMenu"}},[t.vertical?r("div",{staticClass:"dropdown btn-group"},[r("button",{staticClass:"btn",class:"btn-"+t.btnColor,attrs:{id:"name-btn"},on:{click:function(e){return t.setMenu(t.selected)}}},[r("span",{staticClass:"dept-label",domProps:{innerHTML:t._s(t.buttonLabel)}})]),r("button",{staticClass:"btn dropdown-toggle dropdown-toggle-split",class:"btn-"+t.btnColor,attrs:{type:"button",id:"subDeptFilterButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}}),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"subDeptFilterButton"}},[r("a",{staticClass:"dropdown-item",class:{active:0==t.selected},attrs:{id:"id-0",href:t.pageUrl},on:{click:function(e){return e.preventDefault(),t.setMenu(0)}}},[t._v(" A–Z List ")]),t._l(t.subDeptList,(function(e,n){return r("a",{key:n,staticClass:"dropdown-item",class:{active:e.id==t.selected},attrs:{id:"id-"+e.id,href:t.pageUrl+"?subDept="+e.id},on:{click:function(r){return r.preventDefault(),t.setMenu(e.id)}}},[t._v(" "+t._s(e.name)+" ")])}))],2)]):r("nav",{staticClass:"navbar navbar-toggleable-sm",attrs:{role:"navigation"}},[r("button",{staticClass:"navbar-toggler collapsed bg-primary btn btn-block text-secondary mb-1",attrs:{type:"button","data-toggle":"collapse","data-target":"#filterBar","aria-controls":"filterBar","aria-expanded":"false","aria-label":"Toggle Filter"}},[t._v(" FILTER ⯆ ")]),r("div",{staticClass:"collapse navbar-collapse border-0",attrs:{id:"filterBar"}},[r("ul",{staticClass:"nav nav-pills nav-justified flex-column"},[r("li",{staticClass:"nav-item"},[r("a",{staticClass:"nav-link",class:{active:0==t.selected},attrs:{id:"id-0",href:t.pageUrl},on:{click:function(e){return e.preventDefault(),t.setMenu(0)}}},[t._v(" A–Z List ")])]),t._l(t.subDeptList,(function(e,n){return[r("li",{key:n,staticClass:"nav-item"},[r("a",{staticClass:"nav-link",class:{active:e.id==t.selected},attrs:{id:"id-"+e.id,href:t.pageUrl+"?subdept="+e.id},on:{click:function(r){return r.preventDefault(),t.setMenu(e.id)}}},[t._v(" "+t._s(e.name)+" ")])])]}))],2)])])])},u=[];r("e01a"),r("d28b"),r("b0c0");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={data:function(){return{}},computed:f({isAZ:function(){return 0==this.selected},classObj:function(){return{"col-md-4":this.vertical,"col-lg-3":this.vertical}},buttonLabel:function(){if(this.isAZ)return this.tiered?"View All":"A&ndash;Z List";var t=!0,e=!1,r=void 0;try{for(var n,s=this.subDeptList[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var i=n.value;if(i.id==this.selected)return i.name}}catch(a){e=!0,r=a}finally{try{t||null==s.return||s.return()}finally{if(e)throw r}}}},Object(c["d"])("subdepartments",["subDeptList","selected"]),{},Object(c["d"])("facultyList",["vertical","filterable","tiered","btnColor"]),{},Object(c["c"])("facultyList",["pageUrl"])),methods:f({displayName:function(t){var e=this.subDeptList[t];return e.name.length>20?e.name:e.shortName},setMenu:function(t){this.vertical?document.querySelector("#deptMenu .dropdown-item.active").classList.remove("active"):document.querySelector("#deptMenu .nav-link.active").classList.remove("active"),document.querySelector("#id-".concat(t)).classList.add("active"),this.selectDepartment(t)}},Object(c["b"])("subdepartments",["getSubDeptList","selectDepartment"]))},b=d,m=(r("11fe"),r("2877")),h=Object(m["a"])(b,l,u,!1,null,"ce966dea",null),v=h.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return!t.isAZ&&t.isTierLabel&&0==t.selected?r("div",{staticClass:"col-12 tier-label"},[r("h2",{staticClass:"row-title"},[t._v(t._s(t.person.tierLabel))])]):t.isTierLabel?t._e():r("div",{staticClass:"faculty-card col-12 col-md-6 mb-0",class:t.classObj},[r("div",{staticClass:"cah-staff-list"},[r("a",{attrs:{href:t.pageUrl+"?id="+t.person.id}},[r("div",{staticClass:"staff-list d-flex align-items-center"},[t.isAZ?t._e():r("faculty-headshot",{attrs:{src:t.person.photoUrl,fullname:t.person.fullName}}),r("div",{staticClass:"d-flex flex-column",class:{"format-picture":"picture"==t.format}},[r("p",{staticClass:"staff-name"},[r("strong",[t._v(t._s(t.person.fullName))])]),r("div",{staticClass:"fs-list"},[r("small",[r("p",{staticClass:"staff-title"},[r("em",{domProps:{innerHTML:t._s(t.displayTitle)}})]),r("p",{staticClass:"staff-email"},[r("a",{attrs:{href:"mailto:"+t.person.email}},[t._v(t._s(t.person.email))])]),t.person.phone?r("p",[t._v(t._s(t.person.phone))]):t._e(),t.showInterests?r("p",{staticClass:"mt-1"},[r("em",{domProps:{innerHTML:t._s(t.shortInterests)}})]):t._e()])])])],1)])])])},g=[],O=(r("99af"),r("c975"),r("466d"),r("5319"),r("1276"),r("498a"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"faculty-img"},[r("img",{staticClass:"mr-3",class:{"img-circle":!t.isDetail,rounded:t.isRounded,"d-flex":t.isEmpty,detail:t.isDetail},attrs:{src:t.imgUrl,alt:t.fullname}})])}),j=[];r("e25e");function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function L(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var D={props:{src:String,fullname:String},data:function(){return{baseUrl:"https://cah.ucf.edu/common/resize.php"}},computed:L({imgUrl:function(){var t=this.src?this.src:"profilephoto.jpg";return"".concat(this.baseUrl,"?filename=").concat(t,"&sz=").concat(this.size)},isDetail:function(){return 0!=parseInt(this.detailUser)},isRounded:function(){return"rounded"==this.imgFormat},isEmpty:function(){return!!this.src},size:function(){return this.isDetail?2:this.imgSize}},Object(c["d"])("facultyList",["imgFormat","detailUser","imgSize"]))},P=D,_=(r("0acd"),Object(m["a"])(P,O,j,!1,null,"2da23c23",null)),x=_.exports;function C(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function S(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?C(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var T={components:{"faculty-headshot":x},props:{person:Object},data:function(){return{}},computed:S({isAZ:function(){return"a-z"===this.format},isFilteredTextList:function(){return 0===this.selected&&this.isAZ&&this.filterable},isVerticalFilter:function(){return this.isFilteredTextList&&this.vertical},classObj:function(){return{"col-lg-4":(!this.isFilteredTextList&&this.vertical||this.isFilteredTextList&&!this.vertical||!this.filterable&&this.isAZ)&&!this.includeInterests,"col-lg-3":this.isFilteredTextList&&this.vertical&&!this.includeInterests}},isDir:function(){return this.person.isDir},isChair:function(){return this.person.isChair},displayTitle:function(){var t=this.selected,e="";if(0==t&&(t=Object.keys(this.person.subDept)[0]),e=22==this.dept&&(/director/i.test(this.person.title[t])||/advisor/i.test(this.person.title[t]))&&(this.person.titleDeptShort[t].length>0||this.person.titleDept[t].length>0)?"".concat(this.person.title[t]," ").concat(this.person.titleDeptShort[t]?this.person.titleDeptShort[t]:this.person.titleDept[t]):this.person.titleDeptShort[t]?this.person.titleDeptShort[t]:this.person.titleDept[t]?this.person.titleDept[t]:this.person.title[t],Array.isArray(e))if(this.isDir){var r=!0,n=!1,s=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var o=i.value;if(/Director/.test(o)){e=o;break}}}catch(b){n=!0,s=b}finally{try{r||null==a.return||a.return()}finally{if(n)throw s}}}else if(this.isChair){var c=!0,l=!1,u=void 0;try{for(var p,f=e[Symbol.iterator]();!(c=(p=f.next()).done);c=!0){var d=p.value;if(/Chair/.test(d)){e=d;break}}}catch(b){l=!0,u=b}finally{try{c||null==f.return||f.return()}finally{if(l)throw u}}}else e=e[0];return Array.isArray(e)&&(e=e[0]),e},showInterests:function(){return"a-z"!=this.format&&(this.includeInterests||!this.filterable&&"picture"==this.format)},isTierLabel:function(){return this.tiered&&["fullTime","partTime","staff"].includes(this.person.id)},shortInterests:function(){var t=this.person.interests;if(t){var e=[];if(/<ul>/.test(t)){var r=(new DOMParser).parseFromString(t,"text/html");r.querySelectorAll("li").forEach((function(t){e.push(t.textContent)}))}else t=t.replace(/<br\s?\/?>/g,""),t=t.replace(/<\/?p>/g,""),/;/.test(t)?e=t.split(";"):/,/.test(t)&&e.length<=2?e=t.split(","):(t.match(/./g).length>1||t.indexOf(".")!==t.length-1)&&(e=t.split(".")),e=e.map((function(t){return t.trim()}));for(var n="",s=0;s<e.length;s++){if(n+=e[s],s+1==e.length){n+=".";break}if(n.length>=30){n+="&hellip;";break}n+=", "}return"Interests: "+n}return""}},Object(c["d"])("facultyList",["personList","format","includeInterests","filterable","vertical","tiered","imgSize","dept"]),{},Object(c["d"])("subdepartments",["selected"]),{},Object(c["c"])("facultyList",["pageUrl"]))},U=T,k=(r("59cf"),Object(m["a"])(U,y,g,!1,null,"8a7a3d7a",null)),E=k.exports,F=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"staff-detail row flex-column"},[r("div",{staticClass:"media d-flex flex-row mb-3"},[r("faculty-headshot",{attrs:{src:t.person.photoUrl,fullname:t.person.fullName}}),r("div",{staticClass:"media-body d-flex flex-column"},[r("h4",[t._v(t._s(t.person.fullName))]),r("p",{staticClass:"staff-title"},[r("em",{domProps:{innerHTML:t._s(t.displayTitle)}})]),r("p",[r("a",{attrs:{href:"mailto:"+t.person.email}},[t._v(t._s(t.person.email))])]),t.person.phone?r("p",[t._v(t._s(t.person.phone))]):t._e(),t.person.office?r("p",[t._v("Office Hours: "+t._s(t.person.office))]):t._e(),t.person.room.num?r("p",[t._v(" Campus Location: "),t.person.room.building?r("a",{attrs:{href:"https://map.ucf.edu/locations/"+t.person.room.building,target:"_blank"}},[t._v(t._s(t.person.room.desc+t.person.room.num))]):r("span",[t._v(t._s(t.person.room.desc+t.person.room.num))])]):t.person.location?r("p",[t._v("Campus Location: "+t._s(t.person.location))]):t._e(),t.person.hasCV?r("p",[r("a",{attrs:{href:"https://cah.ucf.edu/common/files/cv/"+t.person.id}},[t._v("View CV")])]):t._e(),t.person.homepage?r("p",[r("a",{attrs:{href:t.person.homepage}},[t._v("View Personal Website")])]):t._e()])],1),r("div",{staticClass:"staff-info"},[t.person.bio?r("div",{staticClass:"pt-2 mw-100 mb-3",domProps:{innerHTML:t._s(t.person.bio)}}):t._e(),t.person.edu&&t.person.edu.length>0?r("div",{domProps:{innerHTML:t._s(t.formatEdu)}}):t._e(),t.person.interests?r("list",{attrs:{heading:"Research Interests",text:t.person.interests}}):t._e(),t.person.research?r("list",{attrs:{heading:"Recent Research Activities",text:t.person.research}}):t._e(),t.person.pubs&&t.person.pubs.length>0?r("div",{domProps:{innerHTML:t._s(t.formatPubs)}}):t._e(),t.person.courses.length?r("div",{domProps:{innerHTML:t._s(t.person.courses)}}):t._e()],1)])},M=[],I=(r("a15b"),r("a9e3"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h3",{staticClass:"heading-underline"},[t._v(t._s(t.heading))]),t.isList?r("div",{domProps:{innerHTML:t._s(t.text)}}):r("p",{domProps:{innerHTML:t._s(t.text)}})])}),A=[],z={props:{heading:String,text:String},data:function(){return{}},computed:{isList:function(){var t=(new DOMParser).parseFromString(this.text,"text/html");return t.querySelectorAll("ul").length>0}}},R=z,H=(r("6443"),Object(m["a"])(R,I,A,!1,null,"6bdaab33",null)),B=H.exports,$=r("17fb"),N=r.n($);function Z(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function q(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Z(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Z(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var V={components:{list:B,"faculty-headshot":x},props:{user:Number},data:function(){return{hasCourseListeners:!1}},computed:q({person:function(){return this.personList[this.user]},displayTitle:function(){for(var t=[],e=0;e<Object.values(this.person.titleDept).length;e++){var r=Object.values(this.person.titleDept)[e],n="";r?n+=r:n=Object.values(this.person.title)[e],t.includes(n)||t.push(n)}var s=t.join(", ");return s},formatEdu:function(){var t=(new DOMParser).parseFromString('<h3 class="heading-underline">Education</h3><div><ul id="edu-rows"></ul></div>',"text/html"),e=!0,r=!1,n=void 0;try{for(var s,i=this.person.edu[Symbol.iterator]();!(e=(s=i.next()).done);e=!0){var a=s.value,o=t.createElement("li");o.innerHTML=a["degree"]+(a["field"]?" in ".concat(a["field"]):"")+(a["institution"]?" from ".concat(a["institution"]):"")+(a["year"]?" (".concat(a["year"],")"):""),t.querySelector("#edu-rows").append(o)}}catch(c){r=!0,n=c}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}return t.body.innerHTML},formatPubs:function(){var t,e=(new DOMParser).parseFromString('<div id="pubs"></div>',"text/html"),r=e.querySelector("#pubs"),n="",s=!0,i=!1,o=void 0;try{for(var c,l=this.person.pubs[Symbol.iterator]();!(s=(c=l.next()).done);s=!0){var u=Object(a["a"])(c.value,2),p=u[0],f=u[1];if(p>0&&e.pubType!=n&&r.append(t),f.pubType!=n){var d=e.createElement("h4");d.classList.add("pt-4"),d.innerHTML=f.pubType,r.append(d),t=e.createElement("ul")}var b=e.createElement("li");b.innerHTML=(parseInt(f.forthcoming)?"<em>Forthcoming</em> ":"")+"".concat(f.pubDate," ")+N.a.unescape(f.citation),t.append(b),n=f.pubType}}catch(m){i=!0,o=m}finally{try{s||null==l.return||l.return()}finally{if(i)throw o}}return r.innerHTML}},Object(c["d"])("facultyList",["personList"]),{},Object(c["d"])("subdepartments",["selected"])),methods:{scrollToTop:function(){window.scrollTo(0,0)}},mounted:function(){this.scrollToTop()},updated:function(){!this.hasCourseListeners&&this.person.courses&&(document.querySelectorAll(".nav.nav-tabs .nav-item .nav-link").forEach((function(t){t.addEventListener("shown.bs.tab",(function(t){console.log(t.relatedTarget),t.relatedTarget.classList.remove("active")}))})),this.hasCourseListeners=!0)}},J=V,G=(r("469b"),Object(m["a"])(J,F,M,!1,null,"50e7dd0a",null)),W=G.exports;function K(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Q(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?K(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var X={components:{"dept-menu":v,faculty:E,"faculty-detail":W},data:function(){return{}},computed:Q({isDetail:function(){return this.detailUser>0}},Object(c["d"])("subdepartments",["subDeptList","selected"]),{},Object(c["d"])("facultyList",["personList","detailUser","displayList","filterable","format","distUrl","vertical","tiered"])),methods:Q({switchFormat:function(t){var e=this;this.changeFormat(t).then((function(){e.filterPersonList(e.selected)}))}},Object(c["b"])("facultyList",["setDetailUser","changeFormat","filterPersonList"])),created:function(){var t=new URL(window.location.href),e={};t.searchParams.forEach((function(t,r){e[r]=t}));for(var r=!1,n=0,s=Object.entries(e);n<s.length;n++){var i=Object(a["a"])(s[n],2),o=i[0],c=i[1];switch(o){case"id":0!=c&&Object.keys(this.personList).includes(c)&&(r=!0,this.$store.dispatch("facultyList/setDetailUser",c));break;case"subdept":Object.values(this.subDeptList).map((function(t){return t.id})).includes(c)&&(r=!0,this.$store.dispatch("subdepartments/selectDepartment",c));break;default:break}if(r)break}}},Y=X,tt=(r("ec19"),Object(m["a"])(Y,s,i,!1,null,"62677cb4",null)),et=tt.exports,rt=(r("4e82"),r("a434"),r("2909")),nt=(r("96cf"),r("bc3a")),st=r.n(nt),it=r("4328"),at=r.n(it);function ot(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ct(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ot(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ot(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var lt={getFacultyList:function(t){var e,r,n,s,i,a;return regeneratorRuntime.async((function(o){while(1)switch(o.prev=o.next){case 0:return e=t.commit,r=t.state,n=r.ajaxUrl,s={action:"get_faculty_list",security:r.nonce},i={headers:{"content-type":"application/x-www-form-urlencoded"}},o.next=6,regeneratorRuntime.awrap(st.a.post(n,at.a.stringify(s),i).then((function(t){return t})));case 6:a=o.sent,e("updatePersonList",a);case 8:case"end":return o.stop()}}))},filterPersonList:function(t,e){var r,n,s,i,a,o,c,l,u,p,f,d,b,m,h,v,y,g,O,j,w,L,D,P,_,x,C,S,T,U,k,E,F;return regeneratorRuntime.async((function(M){while(1)switch(M.prev=M.next){case 0:if(r=t.commit,n=t.dispatch,s=t.state,i=t.rootState,0!=e||s.tiered&&"a-z"!=s.format){M.next=6;break}return n("azList",s.personList),r("updateFormat","a-z"),r("updateDetailUser",0),M.abrupt("return");case 6:if(a=Object.values(s.personList).filter((function(t){if(["fullTime","partTime","staff"].includes(t.id))return!1;for(var r in t.subDept)if(parseInt(r)==parseInt(e)||0==e&&s.tiered)return!0;return!1})),o=function(t,e){if(void 0!==t.tierLabel||void 0!==e.tierLabel)return 0;var r=t.lname.localeCompare(e.lname);return 0!==r?r:t.fname.localeCompare(e.fname)},c=function(t,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=t.test(r.title[e])||0==e&&t.test(Object.entries(r.title)[0])||!n&&t.test(Object.entries(r.titleDept)[0]);return s},l=[],u=[],p=[],f=function(t){if(c(/Director/,t,!0)&&(22!=s.dept||96!=t.id)&&!c(/Program\sDirector/,t,!0))return t.isDir=!0,c(/Assistant\sDirector/,t,!0)&&l.filter((function(t){return/^Director$/.test(t.title)})).length>0&&1==l.length&&l.splice(1,0,t),l.push(t),!1;if(c(/Chair/,t))return t.isChair=!0,u.push(t),!1;if(c(/Program\sDirector/,t)){var r=i.subdepartments.subDeptList,n=!1,a=!0,o=!1,f=void 0;try{for(var d,b=r[Symbol.iterator]();!(a=(d=b.next()).done);a=!0){var m=d.value;if(m.id==e){var h=/[MB].?[FB]?.?[AS].?|PhD/;h.test(m.name)&&h.test(t.titleDept[e])&&(n=!0)}}}catch(v){o=!0,f=v}finally{try{a||null==b.return||b.return()}finally{if(o)throw f}}if(n)return p.push(t),!1}return!0},a.sort(o),d=a.filter((function(t){return f(t)})),b=[].concat(l,u,p,Object(rt["a"])(d)),m=[],!s.tiered||"a-z"==s.format){M.next=50;break}for(h=[],v=[],y=[],g=!0,O=!1,j=void 0,M.prev=22,w=b[Symbol.iterator]();!(g=(L=w.next()).done);g=!0)D=L.value,P=/Professor|Lecturer|Instructor|Director|Chair/,_=/Adjunct/,c(P,D)?h.push(D):c(_,D,!0)?v.push(D):y.push(D);M.next=30;break;case 26:M.prev=26,M.t0=M["catch"](22),O=!0,j=M.t0;case 30:M.prev=30,M.prev=31,g||null==w.return||w.return();case 33:if(M.prev=33,!O){M.next=36;break}throw j;case 36:return M.finish(33);case 37:return M.finish(30);case 38:for(x={id:"fullTime",tierLabel:"Full-Time Faculty"},C={id:"partTime",tierLabel:"Part-Time Faculty"},S={id:"staff",tierLabel:"Staff"},T=ct({},s.personList),U=0,k=[x,C,S];U<k.length;U++)E=k[U],T[E.id]=E;r("updatePersonList",T),h.unshift(x),v.unshift(C),y.unshift(S),m=[].concat(h,v,y),M.next=51;break;case 50:m=b;case 51:F=m.map((function(t){return t.id})),0!=e&&"a-z"==s.format&&r("updateFormat","picture"),r("updateDisplayList",F),r("updateDetailUser",{userId:0});case 55:case"end":return M.stop()}}),null,null,[[22,26,30,38],[31,,33,37]])},azList:function(t,e){var r,n,s;return regeneratorRuntime.async((function(i){while(1)switch(i.prev=i.next){case 0:r=t.commit,n=Object.values(e),n.sort((function(t,e){if(void 0!==t.tierLabel||void 0!==e.tierLabel)return 0;var r=t.lname.localeCompare(e.lname);return 0==r?t.fname.localeCompare(e.fname):r})),s=n.map((function(t){return t.id})),r("updateDisplayList",s);case 5:case"end":return i.stop()}}))},getUserDetails:function(t,e){var r,n,s,i,a,o;return regeneratorRuntime.async((function(c){while(1)switch(c.prev=c.next){case 0:return r=t.commit,n=t.state,s=n.ajaxUrl,i={action:"user_detail",security:n.nonce,user:e},a={headers:{"content-type":"application/x-www-form-urlencoded"}},c.next=6,regeneratorRuntime.awrap(st.a.post(s,at.a.stringify(i),a).then((function(t){return t.data})));case 6:o=c.sent,r("updateUserDetails",{userId:e,details:o});case 8:case"end":return c.stop()}}))},setDetailUser:function(t,e){var r=t.commit,n=t.dispatch;parseInt(e)>0&&n("getUserDetails",e),r("updateDetailUser",{userId:e})},getInitData:function(t){var e=t.commit,r=t.dispatch,n=JSON.parse(N.a.unescape(document.getElementById("vueData").value)),s=JSON.parse(N.a.unescape(document.getElementById("vueSubDept").value)),i=JSON.parse(N.a.unescape(document.getElementById("vueFaculty").value)),a=Object.values(i);a.sort((function(t,e){var r=t.lname.localeCompare(e.lname);return 0==r?t.fname.localeCompare(e.fname):r}));var o=a.map((function(t){return t.id}));e("updateOptions",n),r("subdepartments/setSubDeptList",s,{root:!0}),e("updatePersonList",i),e("updateDisplayList",o)},changeFormat:function(t,e){var r=t.commit,n=t.dispatch;n("setDetailUser",0),r("updateFormat",e)}},ut=(r("fb6a"),{ajaxUrl:function(t){return t.ajaxUrl},dept:function(t){return t.dept},nonce:function(t){return t.nonce},pageUrl:function(){return location.protocol+"//"+location.host+location.pathname.slice(0,-1)}});function pt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ft(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?pt(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):pt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var dt={updatePersonList:function(t,e){n["a"].set(t,"personList",e)},updateDisplayList:function(t,e){n["a"].set(t,"displayList",e)},updateOptions:function(t,e){n["a"].set(t,"format",e.format),n["a"].set(t,"includeInterests",e.include_interests),n["a"].set(t,"imgFormat",e.img_format),n["a"].set(t,"dept",e.dept),n["a"].set(t,"filterable",e.filterable),n["a"].set(t,"vertical",e.vertical),n["a"].set(t,"tiered",e.tiered),n["a"].set(t,"btnColor",e.btn_color),n["a"].set(t,"imgSize",parseInt(e.size))},updateFormat:function(t,e){n["a"].set(t,"format",e)},updateDetailUser:function(t,e){n["a"].set(t,"detailUser",e.userId)},updateUserDetails:function(t,e){var r=ft({},t.personList),s=r[e.userId];s.edu=e.details.edu,s.pubs=e.details.pubs,s.courses=e.details.courses,n["a"].set(t,"personList",r)}},bt={personList:{},displayList:[],dept:0,format:"",filterable:!0,tiered:!1,vertical:!1,includeInterests:!1,detailUser:0,imgFormat:"",imgSize:2,btnColor:"primary",distUrl:wpVars.distUrl,ajaxUrl:wpVars.ajaxUrl,nonce:wpVars.security},mt=!0,ht={state:bt,namespaced:mt,actions:lt,getters:ut,mutations:dt},vt={getSubDeptList:function(t){var e,r,n,s;return regeneratorRuntime.async((function(i){while(1)switch(i.prev=i.next){case 0:return e=t.rootGetters["facultyList/ajaxUrl"],r={action:"get_subdepartments",dept:t.rootGetters["facultyList/dept"],security:t.rootGetters["facultyList/nonce"]},n={headers:{"content-type":"x-www-form-urlencoded"}},i.next=5,regeneratorRuntime.awrap(st.a.post(e,at.a.stringify(r),n).then((function(t){return t})));case 5:s=i.sent,t.commit("updateSubDeptList",s);case 7:case"end":return i.stop()}}))},setSubDeptList:function(t,e){var r,n,s;return regeneratorRuntime.async((function(i){while(1)switch(i.prev=i.next){case 0:r=t.commit,n=Object.entries(e).map((function(t){var e=Object(a["a"])(t,2),r=e[0],n=e[1];return{id:r,name:n}})),s=n.sort((function(t,e){return t.name.localeCompare(e.name)})),r("updateSubDeptList",s);case 4:case"end":return i.stop()}}))},selectDepartment:function(t,e){var r,n;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:r=t.dispatch,n=t.commit,n("updateSelected",e),r("facultyList/filterPersonList",e,{root:!0});case 3:case"end":return s.stop()}}))}},yt={selected:function(t){return t.selected}},gt={updateSubDeptList:function(t,e){n["a"].set(t,"subDeptList",e)},updateSelected:function(t,e){n["a"].set(t,"selected",e)}},Ot={subDeptList:[],selected:0},jt=!0,wt={state:Ot,namespaced:jt,actions:vt,getters:yt,mutations:gt};n["a"].use(c["a"]);var Lt=new c["a"].Store({modules:{facultyList:ht,subdepartments:wt}});n["a"].config.productionTip=!1,new n["a"]({store:Lt,render:function(t){return t(et)},created:function(){this.$store.dispatch("facultyList/getInitData")},mounted:function(){this.$store.state.facultyList.tiered&&0==this.$store.state.facultyList.detailUser&&this.$store.dispatch("facultyList/filterPersonList",0),document.querySelector(".site-header h1").remove()}}).$mount("#vueApp")},"59cf":function(t,e,r){"use strict";var n=r("70b4"),s=r.n(n);s.a},6443:function(t,e,r){"use strict";var n=r("fe25"),s=r.n(n);s.a},"70b4":function(t,e,r){},8412:function(t,e,r){},ec19:function(t,e,r){"use strict";var n=r("8412"),s=r.n(n);s.a},fe25:function(t,e,r){}});