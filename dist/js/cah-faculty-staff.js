(function(t){function e(e){for(var n,i,o=e[0],c=e[1],l=e[2],p=0,f=[];p<o.length;p++)i=o[p],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],n=!0,o=1;o<r.length;o++){var c=r[o];0!==s[c]&&(n=!1)}n&&(a.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},s={app:0},a=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="wordpress/wp-content/plugins/cah-faculty-staff/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"0acd":function(t,e,r){"use strict";var n=r("1f1b"),s=r.n(n);s.a},"0ddf":function(t,e,r){},"11fe":function(t,e,r){"use strict";var n=r("0ddf"),s=r.n(n);s.a},"13b0":function(t,e,r){},"1eae":function(t,e,r){"use strict";var n=r("df8e"),s=r.n(n);s.a},"1f1b":function(t,e,r){},"469b":function(t,e,r){"use strict";var n=r("13b0"),s=r.n(n);s.a},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row",class:{"flex-column":t.vertical},attrs:{id:"facultyBox"}},[t.filterable?t._e():r("div",{staticClass:"col-12 d-flex flex-row justify-content-center"},[r("div",{staticClass:"btn-group",attrs:{id:"formatButtons"}},[r("button",{staticClass:"btn btn-default",class:{active:"picture"==t.format},attrs:{type:"button",id:"picBtn"},on:{click:function(e){return e.preventDefault(),t.switchFormat("picture")}}},[r("img",{attrs:{src:t.distUrl+"img/address-card-solid.svg","aria-hidden":"true"}})]),r("button",{staticClass:"btn btn-default",class:{active:"a-z"==t.format},attrs:{type:"button",id:"azBtn"},on:{click:function(e){return e.preventDefault(),t.switchFormat("a-z")}}},[r("img",{attrs:{src:t.distUrl+"img/list-alt-solid.svg","aria-hidden":"true"}})])])]),t.filterable?r("dept-menu"):t._e(),t.displayList.length?t.isDetail?r("div",{staticClass:"col-12",class:{"col-md-9":t.filterable}},[r("faculty-detail",{attrs:{user:parseInt(t.detailUser)}})],1):r("div",{staticClass:"col-12",class:{"col-md-9":t.filterable&&!t.vertical}},[r("div",{staticClass:"row",attrs:{id:"entryBox"}},t._l(t.displayList,(function(e){return r("faculty",{key:e,attrs:{person:t.personList[e]}})})),1)]):r("div",{staticClass:"loading-gif"})],1)},a=[],i=(r("a4d3"),r("e01a"),r("d28b"),r("4de4"),r("caad"),r("4fad"),r("e439"),r("dbb4"),r("b64b"),r("d3b7"),r("2532"),r("3ca3"),r("159b"),r("ddb0"),r("2b3d"),r("3835")),o=r("ade3"),c=r("2f62"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"col-12 mb-4",class:{"col-md-4":t.filterable&&t.vertical,"col-md-3":t.filterable&&!t.vertical},attrs:{id:"deptMenu"}},[t.vertical?r("div",{staticClass:"dropdown btn-group"},[r("button",{staticClass:"btn",class:"btn-"+t.btnColor,attrs:{id:"name-btn"},on:{click:function(e){return t.setMenu(t.selected)}}},[r("span",{staticClass:"dept-label",domProps:{innerHTML:t._s(t.buttonLabel)}})]),r("button",{staticClass:"btn dropdown-toggle dropdown-toggle-split",class:"btn-"+t.btnColor,attrs:{type:"button",id:"subDeptFilterButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}}),r("div",{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"subDeptFilterButton"}},[r("a",{staticClass:"dropdown-item",class:{active:0==t.selected},attrs:{id:"id-0",href:t.pageUrl},on:{click:function(e){return e.preventDefault(),t.setMenu(0)}}},[t._v(" A–Z List ")]),t._l(t.subDeptList,(function(e,n){return r("a",{key:n,staticClass:"dropdown-item",class:{active:e.id==t.selected},attrs:{id:"id-"+e.id,href:t.pageUrl+"?subDept="+e.id},on:{click:function(r){return r.preventDefault(),t.setMenu(e.id)}}},[t._v(" "+t._s(e.name)+" ")])}))],2)]):r("nav",{staticClass:"navbar navbar-toggleable-sm",attrs:{role:"navigation"}},[r("button",{staticClass:"navbar-toggler collapsed bg-primary btn btn-block text-secondary mb-1",attrs:{type:"button","data-toggle":"collapse","data-target":"#filterBar","aria-controls":"filterBar","aria-expanded":"false","aria-label":"Toggle Filter"}},[t._v(" FILTER ⯆ ")]),r("div",{staticClass:"collapse navbar-collapse border-0",attrs:{id:"filterBar"}},[r("ul",{staticClass:"nav nav-pills nav-justified flex-column"},[r("li",{staticClass:"nav-item"},[r("a",{staticClass:"nav-link",class:{active:0==t.selected},attrs:{id:"id-0",href:t.pageUrl},on:{click:function(e){return e.preventDefault(),t.setMenu(0)}}},[t._v(" A–Z List ")])]),t._l(t.subDeptList,(function(e,n){return[r("li",{key:n,staticClass:"nav-item"},[r("a",{staticClass:"nav-link",class:{active:e.id==t.selected},attrs:{id:"id-"+e.id,href:t.pageUrl+"?subdept="+e.id},on:{click:function(r){return r.preventDefault(),t.setMenu(e.id)}}},[t._v(" "+t._s(e.name)+" ")])])]}))],2)])])])},u=[];r("b0c0");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d={data:function(){return{menuDisplayed:!1}},computed:f({isAZ:function(){return 0==this.selected},classObj:function(){return{"col-md-4":this.vertical,"col-lg-3":this.vertical}},buttonLabel:function(){if(this.isAZ)return this.tiered?"View All":"A&ndash;Z List";var t=!0,e=!1,r=void 0;try{for(var n,s=this.subDeptList[Symbol.iterator]();!(t=(n=s.next()).done);t=!0){var a=n.value;if(a.id==this.selected)return a.name}}catch(i){e=!0,r=i}finally{try{t||null==s.return||s.return()}finally{if(e)throw r}}}},Object(c["d"])("subdepartments",["subDeptList","selected"]),{},Object(c["d"])("facultyList",["vertical","filterable","tiered","btnColor"]),{},Object(c["c"])("facultyList",["pageUrl"])),methods:f({displayName:function(t){var e=this.subDeptList[t];return e.name.length>20?e.name:e.shortName},setMenu:function(t){this.vertical?document.querySelector("#deptMenu .dropdown-item.active").classList.remove("active"):document.querySelector("#deptMenu .nav-link.active").classList.remove("active"),document.querySelector("#id-".concat(t)).classList.add("active"),this.selectDepartment(t)},showDropdown:function(){}},Object(c["b"])("subdepartments",["getSubDeptList","selectDepartment"]))},b=d,m=(r("11fe"),r("2877")),h=Object(m["a"])(b,l,u,!1,null,"ce966dea",null),v=h.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return!t.isAZ&&t.isTierLabel&&0==t.selected?r("div",{staticClass:"col-12 tier-label"},[r("h2",{staticClass:"row-title"},[t._v(t._s(t.person.tierLabel))])]):t.isTierLabel?t._e():r("div",{staticClass:"faculty-card col-12 col-md-6 mb-0",class:t.classObj},[r("div",{staticClass:"cah-staff-list"},[r("a",{attrs:{href:t.pageUrl+"?id="+t.person.id}},[r("div",{staticClass:"staff-list d-flex"},[t.isAZ?t._e():r("faculty-headshot",{attrs:{src:t.person.photoUrl,fullname:t.person.fullName}}),r("div",{staticClass:"d-flex flex-column",class:{"format-picture":"picture"==t.format}},[r("p",{staticClass:"staff-name"},[r("strong",[t._v(t._s(t.person.fullName))])]),r("div",{staticClass:"fs-list"},[r("small",[r("p",{staticClass:"staff-title"},[r("em",{domProps:{innerHTML:t._s(t.displayTitle)}})]),r("p",{staticClass:"staff-email"},[r("a",{attrs:{href:"mailto:"+t.person.email}},[t._v(t._s(t.person.email))])]),t.person.phone?r("p",[t._v(t._s(t.person.phone))]):t._e(),t.showInterests?r("p",{staticClass:"mt-1"},[r("em",{domProps:{innerHTML:t._s(t.shortInterests)}})]):t._e()])])])],1)])])])},g=[],O=(r("c975"),r("d81d"),r("466d"),r("5319"),r("1276"),r("498a"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"faculty-img"},[r("img",{staticClass:"mr-3",class:{"img-circle":!t.isDetail,rounded:t.isRounded,"d-flex":t.isEmpty,detail:t.isDetail},attrs:{src:t.imgUrl,alt:t.fullname}})])}),j=[];r("99af"),r("e25e");function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function L(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var D={props:{src:String,fullname:String},data:function(){return{baseUrl:"https://cah.ucf.edu/common/resize.php"}},computed:L({imgUrl:function(){var t=this.src?this.src:"profilephoto.jpg";return"".concat(this.baseUrl,"?filename=").concat(t,"&sz=").concat(this.size)},isDetail:function(){return 0!=parseInt(this.detailUser)},isRounded:function(){return"rounded"==this.imgFormat},isEmpty:function(){return!!this.src},size:function(){return this.isDetail,2}},Object(c["d"])("facultyList",["imgFormat","detailUser"]))},P=D,_=(r("0acd"),Object(m["a"])(P,O,j,!1,null,"2da23c23",null)),x=_.exports;function C(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function S(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?C(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var T={components:{"faculty-headshot":x},props:{person:Object},data:function(){return{}},computed:S({isAZ:function(){return"a-z"===this.format},isFilteredTextList:function(){return 0===this.selected&&this.isAZ&&this.filterable},isVerticalFilter:function(){return this.isFilteredTextList&&this.vertical},classObj:function(){return{"col-lg-4":(!this.isFilteredTextList&&this.vertical||this.isFilteredTextList&&!this.vertical||!this.filterable&&this.isAZ)&&!this.includeInterests,"col-lg-3":this.isFilteredTextList&&this.vertical&&!this.includeInterests}},displayTitle:function(){var t=this.selected;return 0==t&&(t=Object.keys(this.person.subDept)[0]),this.person.titleDeptShort[t]?this.person.titleDeptShort[t]:this.person.titleDept[t]?this.person.titleDept[t]:this.person.title[t]},showInterests:function(){return"a-z"!=this.format&&(this.includeInterests||!this.filterable&&"picture"==this.format)},isTierLabel:function(){return this.tiered&&["fullTime","partTime","staff"].includes(this.person.id)},shortInterests:function(){var t=this.person.interests;if(t){var e=[];if(/<ul>/.test(t)){var r=(new DOMParser).parseFromString(t,"text/html");r.querySelectorAll("li").forEach((function(t){e.push(t.textContent)}))}else t=t.replace(/<br\s?\/?>/g,""),t=t.replace(/<\/?p>/g,""),/;/.test(t)?e=t.split(";"):/,/.test(t)&&e.length<=2?e=t.split(","):(t.match(/./g).length>1||t.indexOf(".")!==t.length-1)&&(e=t.split(".")),e=e.map((function(t){return t.trim()}));for(var n="",s=0;s<e.length;s++){if(n+=e[s],s+1==e.length){n+=".";break}if(n.length>=30){n+="&hellip;";break}n+=", "}return"Interests: "+n}return""}},Object(c["d"])("facultyList",["personList","format","includeInterests","filterable","vertical","tiered"]),{},Object(c["d"])("subdepartments",["selected"]),{},Object(c["c"])("facultyList",["pageUrl"]))},k=T,U=(r("1eae"),Object(m["a"])(k,y,g,!1,null,"31901fea",null)),E=U.exports,F=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"staff-detail row flex-column"},[r("div",{staticClass:"media d-flex flex-row mb-3"},[r("faculty-headshot",{attrs:{src:t.person.photoUrl,fullname:t.person.fullName}}),r("div",{staticClass:"media-body d-flex flex-column"},[r("h4",[t._v(t._s(t.person.fullName))]),r("p",{staticClass:"staff-title"},[r("em",{domProps:{innerHTML:t._s(t.displayTitle)}})]),r("p",[r("a",{attrs:{href:"mailto:"+t.person.email}},[t._v(t._s(t.person.email))])]),t.person.phone?r("p",[t._v(t._s(t.person.phone))]):t._e(),t.person.office?r("p",[t._v("Office Hours: "+t._s(t.person.office))]):t._e(),t.person.room.num?r("p",[t._v(" Campus Location: "),t.person.room.building?r("a",{attrs:{href:"https://map.ucf.edu/locations/"+t.person.room.building,target:"_blank"}},[t._v(t._s(t.person.room.desc+t.person.room.num))]):r("span",[t._v(t._s(t.person.room.desc+t.person.room.num))])]):t.person.location?r("p",[t._v("Campus Location: "+t._s(t.person.location))]):t._e(),t.person.hasCV?r("p",[r("a",{attrs:{href:"https://cah.ucf.edu/common/files/cv/"+t.person.id}},[t._v("View CV")])]):t._e(),t.person.homepage?r("p",[r("a",{attrs:{href:t.person.homepage}},[t._v("View Personal Website")])]):t._e()])],1),r("div",{staticClass:"staff-info"},[t.person.bio?r("div",{staticClass:"pt-2 mw-100 mb-3",domProps:{innerHTML:t._s(t.person.bio)}}):t._e(),t.person.edu&&t.person.edu.length>0?r("div",{domProps:{innerHTML:t._s(t.formatEdu)}}):t._e(),t.person.interests?r("list",{attrs:{heading:"Research Interests",text:t.person.interests}}):t._e(),t.person.research?r("list",{attrs:{heading:"Recent Research Activities",text:t.person.research}}):t._e(),t.person.pubs&&t.person.pubs.length>0?r("div",{domProps:{innerHTML:t._s(t.formatPubs)}}):t._e(),t.person.courses.length?r("div",{domProps:{innerHTML:t._s(t.person.courses)}}):t._e()],1)])},M=[],I=(r("a15b"),r("a9e3"),r("07ac"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h3",{staticClass:"heading-underline"},[t._v(t._s(t.heading))]),t.isList?r("div",{domProps:{innerHTML:t._s(t.text)}}):r("p",{domProps:{innerHTML:t._s(t.text)}})])}),A=[],R={props:{heading:String,text:String},data:function(){return{}},computed:{isList:function(){var t=(new DOMParser).parseFromString(this.text,"text/html");return t.querySelectorAll("ul").length>0}}},H=R,z=(r("6443"),Object(m["a"])(H,I,A,!1,null,"6bdaab33",null)),B=z.exports,$=r("17fb"),N=r.n($);function Z(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function q(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?Z(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Z(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var V={components:{list:B,"faculty-headshot":x},props:{user:Number},data:function(){return{hasCourseListeners:!1}},computed:q({person:function(){return this.personList[this.user]},displayTitle:function(){for(var t=[],e=0;e<Object.values(this.person.titleDept).length;e++){var r=Object.values(this.person.titleDept)[e],n="";r?n+=r:n=Object.values(this.person.title)[e],t.includes(n)||t.push(n)}var s=t.join(", ");return s},formatEdu:function(){var t=(new DOMParser).parseFromString('<h3 class="heading-underline">Education</h3><div><ul id="edu-rows"></ul></div>',"text/html"),e=!0,r=!1,n=void 0;try{for(var s,a=this.person.edu[Symbol.iterator]();!(e=(s=a.next()).done);e=!0){var i=s.value,o=t.createElement("li");o.innerHTML=i["degree"]+(i["field"]?" in ".concat(i["field"]):"")+(i["institution"]?" from ".concat(i["institution"]):"")+(i["year"]?" (".concat(i["year"],")"):""),t.querySelector("#edu-rows").append(o)}}catch(c){r=!0,n=c}finally{try{e||null==a.return||a.return()}finally{if(r)throw n}}return t.body.innerHTML},formatPubs:function(){var t,e=(new DOMParser).parseFromString('<div id="pubs"></div>',"text/html"),r=e.querySelector("#pubs"),n="",s=0,a=!0,i=!1,o=void 0;try{for(var c,l=this.person.pubs[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var u=c.value;if(s>0&&e.pubType!=n&&r.append(t),u.pubType!=n){var p=e.createElement("h4");p.classList.add("pt-4"),p.innerHTML=u.pubType,r.append(p),t=e.createElement("ul")}var f=e.createElement("li");f.innerHTML=(parseInt(u.forthcoming)?"<em>Forthcoming</em> ":"")+"".concat(u.pubDate," ")+N.a.unescape(u.citation),t.append(f),s++,n=u.pubType}}catch(d){i=!0,o=d}finally{try{a||null==l.return||l.return()}finally{if(i)throw o}}return r.innerHTML}},Object(c["d"])("facultyList",["personList"]),{},Object(c["d"])("subdepartments",["selected"])),methods:{scrollToTop:function(){window.scrollTo(0,0)}},mounted:function(){this.scrollToTop()},updated:function(){!this.hasCourseListeners&&this.person.courses&&(document.querySelectorAll(".nav.nav-tabs .nav-item .nav-link").forEach((function(t){t.addEventListener("shown.bs.tab",(function(t){console.log(t.relatedTarget),t.relatedTarget.classList.remove("active")}))})),this.hasCourseListeners=!0)}},J=V,G=(r("469b"),Object(m["a"])(J,F,M,!1,null,"50e7dd0a",null)),W=G.exports;function K(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Q(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?K(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):K(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var X={components:{"dept-menu":v,faculty:E,"faculty-detail":W},data:function(){return{}},computed:Q({isDetail:function(){return this.detailUser>0}},Object(c["d"])("subdepartments",["subDeptList","selected"]),{},Object(c["d"])("facultyList",["personList","detailUser","displayList","filterable","format","distUrl","vertical","tiered"])),methods:Q({switchFormat:function(t){var e=this;this.changeFormat(t).then((function(){e.filterPersonList(e.selected)}))}},Object(c["b"])("facultyList",["setDetailUser","changeFormat","filterPersonList"])),created:function(){var t=new URL(window.location.href),e={};t.searchParams.forEach((function(t,r){e[r]=t}));for(var r=!1,n=0,s=Object.entries(e);n<s.length;n++){var a=Object(i["a"])(s[n],2),o=a[0],c=a[1];switch(o){case"id":0!=c&&Object.keys(this.personList).includes(c)&&(r=!0,this.$store.dispatch("facultyList/setDetailUser",c));break;case"subdept":var l=!0,u=!1,p=void 0;try{for(var f,d=this.subDeptList[Symbol.iterator]();!(l=(f=d.next()).done);l=!0){var b=f.value;if(c==b.id){r=!0,this.$store.dispatch("subdepartments/selectDepartment",c);break}}}catch(m){u=!0,p=m}finally{try{l||null==d.return||d.return()}finally{if(u)throw p}}break;default:break}if(r)break}}},Y=X,tt=(r("ec19"),Object(m["a"])(Y,s,a,!1,null,"62677cb4",null)),et=tt.exports,rt=(r("4e82"),r("2909")),nt=(r("96cf"),r("bc3a")),st=r.n(nt),at=r("4328"),it=r.n(at);function ot(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ct(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ot(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ot(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var lt={getFacultyList:function(t){var e,r,n,s,a,i;return regeneratorRuntime.async((function(o){while(1)switch(o.prev=o.next){case 0:return e=t.commit,r=t.state,n=r.ajaxUrl,s={action:"get_faculty_list",security:r.nonce},a={headers:{"content-type":"application/x-www-form-urlencoded"}},o.next=6,regeneratorRuntime.awrap(st.a.post(n,it.a.stringify(s),a).then((function(t){return t})));case 6:i=o.sent,e("updatePersonList",i);case 8:case"end":return o.stop()}}))},filterPersonList:function(t,e){var r,n,s,a,i,o,c,l,u,p,f,d,b,m,h,v,y,g,O,j,w,L,D,P,_,x,C,S,T,k,U,E,F,M,I,A,R,H,z;return regeneratorRuntime.async((function(B){while(1)switch(B.prev=B.next){case 0:if(r=t.commit,n=t.dispatch,s=t.state,a=t.rootState,0!=e||s.tiered&&"a-z"!=s.format){B.next=6;break}return n("azList",s.personList),r("updateFormat","a-z"),r("updateDetailUser",0),B.abrupt("return");case 6:i=[],o=0,c=Object.keys(s.personList);case 8:if(!(o<c.length)){B.next=24;break}if(l=c[o],!["fullTime","partTime","staff"].includes(l)){B.next=12;break}return B.abrupt("continue",21);case 12:u=0,p=Object.keys(s.personList[l].subDept);case 13:if(!(u<p.length)){B.next=21;break}if(f=p[u],!(parseInt(f)==parseInt(e)||0==e&&s.tiered)){B.next=18;break}return i.push(s.personList[l]),B.abrupt("break",21);case 18:u++,B.next=13;break;case 21:o++,B.next=8;break;case 24:if(d=function(t,e){if(void 0!==t.tierLabel||void 0!==e.tierLabel)return 0;var r=t.lname.localeCompare(e.lname);return 0!==r?r:t.fname.localeCompare(e.fname)},b=function(t,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=t.test(r.title[e])||0==e&&t.test(Object.entries(r.title)[0])||!n&&t.test(Object.entries(r.titleDept)[0]);return s},m=[],h=[],v=[],y=function(t){if(b(/Director/,t,!0))return m.push(t),!1;if(b(/Chair/,t))return h.push(t),!1;if(b(/Program\sDirector/,t)){var r=a.subdepartments.subDeptList,n=!1,s=!0,i=!1,o=void 0;try{for(var c,l=r[Symbol.iterator]();!(s=(c=l.next()).done);s=!0){var u=c.value;if(u.id==e){var p=/[MB].?[FB]?.?[AS].?|PhD/;p.test(u.name)&&p.test(t.titleDept[e])&&(n=!0)}}}catch(f){i=!0,o=f}finally{try{s||null==l.return||l.return()}finally{if(i)throw o}}if(n)return v.push(t),!1}return!0},i.sort(d),g=i.filter((function(t){return y(t)})),O=[].concat(m,h,v,Object(rt["a"])(g)),j=[],w=[],L=[],D=[],!s.tiered||"a-z"==s.format){B.next=67;break}for(P=!0,_=!1,x=void 0,B.prev=39,C=O[Symbol.iterator]();!(P=(S=C.next()).done);P=!0)T=S.value,k=/Professor|Lecturer|Instructor|Director|Chair/,U=/Adjunct/,b(k,T)?w.push(T):b(U,T,!0)?L.push(T):D.push(T);B.next=47;break;case 43:B.prev=43,B.t0=B["catch"](39),_=!0,x=B.t0;case 47:B.prev=47,B.prev=48,P||null==C.return||C.return();case 50:if(B.prev=50,!_){B.next=53;break}throw x;case 53:return B.finish(50);case 54:return B.finish(47);case 55:for(E={id:"fullTime",tierLabel:"Full-Time Faculty"},F={id:"partTime",tierLabel:"Part-Time Faculty"},M={id:"staff",tierLabel:"Staff"},I=ct({},s.personList),A=0,R=[E,F,M];A<R.length;A++)H=R[A],I[H.id]=H;r("updatePersonList",I),w.unshift(E),L.unshift(F),D.unshift(M),j=[].concat(w,L,D),B.next=68;break;case 67:j=O;case 68:z=[],j.forEach((function(t){z.push(t.id)})),0!=e&&"a-z"==s.format&&r("updateFormat","picture"),r("updateDisplayList",z),r("updateDetailUser",{userId:0});case 73:case"end":return B.stop()}}),null,null,[[39,43,47,55],[48,,50,54]])},azList:function(t,e){var r,n,s,a,i,o;return regeneratorRuntime.async((function(c){while(1)switch(c.prev=c.next){case 0:for(r=t.commit,n=[],s=0,a=Object.values(e);s<a.length;s++)i=a[s],n.push(i);n.sort((function(t,e){if(void 0!==t.tierLabel||void 0!==e.tierLabel)return 0;var r=t.lname.localeCompare(e.lname);return 0==r?t.fname.localeCompare(e.fname):r})),o=[],n.forEach((function(t){o.push(t.id)})),r("updateDisplayList",o);case 7:case"end":return c.stop()}}))},getUserDetails:function(t,e){var r,n,s,a,i,o;return regeneratorRuntime.async((function(c){while(1)switch(c.prev=c.next){case 0:return r=t.commit,n=t.state,s=n.ajaxUrl,a={action:"user_detail",security:n.nonce,user:e},i={headers:{"content-type":"application/x-www-form-urlencoded"}},c.next=6,regeneratorRuntime.awrap(st.a.post(s,it.a.stringify(a),i).then((function(t){return t.data})));case 6:o=c.sent,r("updateUserDetails",{userId:e,details:o});case 8:case"end":return c.stop()}}))},setDetailUser:function(t,e){var r=t.commit,n=t.dispatch;parseInt(e)>0&&n("getUserDetails",e),r("updateDetailUser",{userId:e})},getInitData:function(t){for(var e=t.commit,r=t.dispatch,n=JSON.parse(N.a.unescape(document.getElementById("vueData").value)),s=JSON.parse(N.a.unescape(document.getElementById("vueSubDept").value)),a=JSON.parse(N.a.unescape(document.getElementById("vueFaculty").value)),i=[],o=0,c=Object.values(a);o<c.length;o++){var l=c[o];i.push(l)}i.sort((function(t,e){var r=t.lname.localeCompare(e.lname);return 0==r?t.fname.localeCompare(e.fname):r}));var u=[];i.forEach((function(t){u.push(t.id)})),e("updateOptions",n),r("subdepartments/setSubDeptList",s,{root:!0}),e("updatePersonList",a),e("updateDisplayList",u)},changeFormat:function(t,e){var r=t.commit,n=t.dispatch;n("setDetailUser",0),r("updateFormat",e)}},ut=(r("fb6a"),{ajaxUrl:function(t){return t.ajaxUrl},dept:function(t){return t.dept},nonce:function(t){return t.nonce},pageUrl:function(){return location.protocol+"//"+location.host+location.pathname.slice(0,-1)}});function pt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function ft(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?pt(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):pt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var dt={updatePersonList:function(t,e){n["a"].set(t,"personList",e)},updateDisplayList:function(t,e){n["a"].set(t,"displayList",e)},updateOptions:function(t,e){n["a"].set(t,"format",e.format),n["a"].set(t,"includeInterests",e.include_interests),n["a"].set(t,"imgFormat",e.img_format),n["a"].set(t,"dept",e.dept),n["a"].set(t,"filterable",e.filterable),n["a"].set(t,"vertical",e.vertical),n["a"].set(t,"tiered",e.tiered),n["a"].set(t,"btnColor",e.btn_color)},updateFormat:function(t,e){n["a"].set(t,"format",e)},updateDetailUser:function(t,e){n["a"].set(t,"detailUser",e.userId)},updateUserDetails:function(t,e){var r=ft({},t.personList),s=r[e.userId];s.edu=e.details.edu,s.pubs=e.details.pubs,s.courses=e.details.courses,n["a"].set(t,"personList",r)}},bt={personList:{},displayList:[],dept:0,format:"",filterable:!0,tiered:!1,vertical:!1,includeInterests:!1,detailUser:0,imgFormat:"",btnColor:"primary",distUrl:wpVars.distUrl,ajaxUrl:wpVars.ajaxUrl,nonce:wpVars.security},mt=!0,ht={state:bt,namespaced:mt,actions:lt,getters:ut,mutations:dt},vt={getSubDeptList:function(t){var e,r,n,s;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return e=t.rootGetters["facultyList/ajaxUrl"],r={action:"get_subdepartments",dept:t.rootGetters["facultyList/dept"],security:t.rootGetters["facultyList/nonce"]},n={headers:{"content-type":"x-www-form-urlencoded"}},a.next=5,regeneratorRuntime.awrap(st.a.post(e,it.a.stringify(r),n).then((function(t){return t})));case 5:s=a.sent,t.commit("updateSubDeptList",s);case 7:case"end":return a.stop()}}))},setSubDeptList:function(t,e){var r,n,s,a,o,c,l,u;return regeneratorRuntime.async((function(p){while(1)switch(p.prev=p.next){case 0:for(r=t.commit,n=[],s=0,a=Object.entries(e);s<a.length;s++)o=Object(i["a"])(a[s],2),c=o[0],l=o[1],n.push({id:c,name:l});u=n.sort((function(t,e){return t.name.localeCompare(e.name)})),r("updateSubDeptList",u);case 5:case"end":return p.stop()}}))},selectDepartment:function(t,e){var r,n;return regeneratorRuntime.async((function(s){while(1)switch(s.prev=s.next){case 0:r=t.dispatch,n=t.commit,n("updateSelected",e),r("facultyList/filterPersonList",e,{root:!0});case 3:case"end":return s.stop()}}))}},yt={selected:function(t){return t.selected}},gt={updateSubDeptList:function(t,e){n["a"].set(t,"subDeptList",e)},updateSelected:function(t,e){n["a"].set(t,"selected",e)}},Ot={subDeptList:[],selected:0},jt=!0,wt={state:Ot,namespaced:jt,actions:vt,getters:yt,mutations:gt};n["a"].use(c["a"]);var Lt=new c["a"].Store({modules:{facultyList:ht,subdepartments:wt}});n["a"].config.productionTip=!1,new n["a"]({store:Lt,render:function(t){return t(et)},created:function(){this.$store.dispatch("facultyList/getInitData")},mounted:function(){this.$store.state.facultyList.tiered&&0==this.$store.state.facultyList.detailUser&&this.$store.dispatch("facultyList/filterPersonList",0),document.querySelector(".site-header h1").remove()}}).$mount("#vueApp")},6443:function(t,e,r){"use strict";var n=r("fe25"),s=r.n(n);s.a},8412:function(t,e,r){},df8e:function(t,e,r){},ec19:function(t,e,r){"use strict";var n=r("8412"),s=r.n(n);s.a},fe25:function(t,e,r){}});