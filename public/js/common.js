angular.module("elementBoxApp.common",["ngResource","angularFileUpload"]).constant("ERROR_CONSTANTS",{forbiden:"You are not allowed to do this operation.",unauthorized:"You are not authorized to do this operation.",byDefault:"Huhoo! An error has occurred"}).factory("ErrorHandler",["ERROR_CONSTANTS",function(e){return{translate:function(t){switch(t.status){case 400:return t.data&&t.data.message?t.data.message:e.byDefault;case 401:return e.unauthorized;case 403:return e.forbiden;default:return e.byDefault}}}}]).constant("EVENT_NAMES",{errorResponse:"ERROR_RESPONSE",addWishList:"NEW_WISH_LIST_ITEM",removeWishList:"REMOVE_WISH_LIST_ITEM",addComment:"NEW_COMMENT"}),angular.module("elementBoxApp.common").value("mode","dev").value("prodBaseUrl","").service("Urls",["mode","prodBaseUrl",function(e){var t={dev:{elements:"api/elements",users:{users:"/users",me:"/me",remove:"/users/accounts",changePass:"/users/password",forgotPass:"/auth/forgot",resetPass:"/auth/reset/:token"},userAuth:{signup:"/auth/signup",signin:"/auth/signin",signout:"/auth/signout"},facebook:{url:"/auth/facebook",cbk:"/auth/facebook/callback"},twitter:{url:"/auth/twitter",cbk:"/auth/twitter/callback"},google:{url:"/auth/google",cbk:"/auth/google/callback"},linkedin:{url:"/auth/linkedin",cbk:"/auth/linkedin/callback"},github:{url:"/auth/github",cbk:"/auth/github/callback"},products:{products:"api/products"},categories:{url:"api/categories"}}};return t[e]}]),angular.module("elementBoxApp.common").factory("Statistics",function(){var e=[{key:"Removed",y:0},{key:"Created",y:0},{key:"Updated",y:0},{key:"Total Elements",y:0}];return{elementRemoved:function(){e[0].y++,e[3].y--},elementCreated:function(){e[1].y++,e[3].y++},elementUpdated:function(){e[2].y++},setElementsCount:function(t){e[3].y=t},getData:function(){return e},xFunction:function(){return function(e){return e.key}},yFunction:function(){return function(e){return e.y}},description:function(){return function(e){return e.key+": "+e.y}},tooltipContent:function(){return function(e){return'<span class="label label-default">'+e+"</span>"}}}}),angular.module("elementBoxApp.common").directive("alertMsg",function(){return{restrict:"EA",transclude:!0,scope:{type:"@",close:"@",timeAlive:"@"},templateUrl:"directives/alert-msg/alert-msg.html",controller:["$scope","$attrs","$timeout",function(e,t,n){if(e.closeable="close"in t,e.closeAlert=function(){e.$destroy()},e.timeAlive){var r=Number.parseInt(e.timeAlive);n(e.closeAlert,r)}}],link:function(e,t){e.$on("$destroy",function(){t.remove()})}}}),angular.module("elementBoxApp.common").directive("comment",function(){return{restrict:"E",templateUrl:"directives/comment/comment.html",transclude:!0,scope:{comment:"=",separator:"=",extraData:"="}}}),angular.module("elementBoxApp.common").directive("donutStats",function(e){return{restrict:"E",templateUrl:"directives/donut-stats/donut-stats.html",scope:{width:"=",height:"="},link:function(t){t.statistics=e.getData(),t.xFunction=e.xFunction,t.yFunction=e.yFunction,t.donut=!0,t.description=e.description,t.tooltipContent=e.tooltipContent}}}),angular.module("elementBoxApp.common").directive("draggable",function(){return{restrict:"A",link:function(e,t,n){var r=t[0];r.draggable=!0,r.addEventListener("dragstart",function(t){return t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("drag-ref",e.$eval(n.dragRef)),this.classList.add("drag"),!1},!1),r.addEventListener("dragend",function(){return this.classList.remove("drag"),!1},!1)}}}),angular.module("elementBoxApp.common").directive("droppable",function(){return{restrict:"A",scope:{drop:"&",dropRef:"="},link:function(e,t){var n=t[0];n.addEventListener("dragover",function(e){return e.dataTransfer.dropEffect="move",e.preventDefault&&e.preventDefault(),this.classList.add("over"),!1},!1),n.addEventListener("dragenter",function(){return this.classList.add("over"),!1},!1),n.addEventListener("dragleave",function(){return this.classList.remove("over"),!1},!1),n.addEventListener("drop",function(t){return t.stopPropagation&&t.stopPropagation(),this.classList.remove("over"),e.$apply(function(e){var n=e.drop();"undefined"!=typeof n&&n(t.dataTransfer.getData("drag-ref"),e.dropRef)}),!1},!1)}}}),angular.module("elementBoxApp.common").directive("elementInfo",["Element","$rootScope",function(e){return{restrict:"E",templateUrl:"directives/element-info/element-info.html",scope:{element:"="},link:function(t){t.editting=!1,t.copy={},t.edit=function(){t.editting=!0,angular.extend(t.copy,t.element)},t.save=function(){var n={title:t.copy.title,content:t.copy.content,created:t.copy.created,date:t.copy.date,like:t.copy.like,dontLike:t.copy.dontLike};e.update({id:t.element._id},n,function(){angular.extend(t.element,n),t.editting=!1})},t.cancelEdition=function(){t.editting=!1,t.copy={}}}}}]),angular.module("elementBoxApp.common").factory("Element",["$resource","Urls","$http","mode",function(e,t,n,r){"prod"===r&&(n.defaults.useXDomain=!0);var o=e(t.elements+"/:id",{id:"@_id"},{query:{method:"GET",params:{},transformResponse:function(e){var t=angular.fromJson(e);return t.results.forEach(function(e,n){e.date=new Date(e.date),e.created=new Date(e.created),t.results[n]=new o(e)}),t}},save:{method:"POST",params:{}},update:{method:"PUT",params:{}},get:{method:"GET",transformResponse:function(e){var t=angular.fromJson(e);return t.created=new Date(t.created),t.date=new Date(t.date),t}},doLike:{method:"PUT",params:{title:"",content:"",created:"",date:"",dontLike:""}},dontLike:{method:"PUT",params:{title:"",content:"",created:"",date:"",like:""}}});return o}]),angular.module("elementBoxApp.common").directive("emailFormat",function(){var e=/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;return{require:"ngModel",restrict:"",link:function(t,n,r,o){o&&o.$validators.email&&(o.$validators.email=function(t){return o.$isEmpty(t)||e.test(t)})}}}),angular.module("elementBoxApp.common").controller("fileUploadController",["$scope","$timeout","FileUploader",function(e,t,n){var r=e.uploader=new n({url:"/upload",queueLimit:e.limit||10,alias:"file"});r.filters.push({name:"imageFilter",fn:function(e){var t="|"+e.type.slice(e.type.lastIndexOf("/")+1)+"|";return-1!=="|jpg|png|jpeg|bmp|gif|".indexOf(t)}}),r.onWhenAddingFileFailed=function(){},r.onAfterAddingFile=function(t){var n=r.queue.indexOf(t);t.url="/upload",e.files[n]={url:"",isUploaded:!1}},r.onAfterAddingAll=function(){},r.onBeforeUploadItem=function(){},r.onProgressItem=function(){},r.onProgressAll=function(){},r.onSuccessItem=function(){},r.onErrorItem=function(){},r.onCancelItem=function(){},r.onCompleteItem=function(t,n){var o=r.queue.indexOf(t);e.files[o].url=n.path,e.files[o].isUploaded=!0},r.onCompleteAll=function(){};var o=function(e,t,n){var r=e[t];e.splice(t,1),e.splice(n,0,r)};e.swapQueue=function(t,n){console.log(t),console.log(n),o(r.queue,t,n),o(e.files,t,n)},e.removeItem=function(t,n){t.remove(),e.files.splice(n,1)}}]),angular.module("elementBoxApp.common").directive("fileUpload",[function(){return{restrict:"EA",scope:{files:"=",limit:"=",uploaded:"="},templateUrl:"directives/file-upload/file-upload.html",controller:"fileUploadController"}}]),angular.module("elementBoxApp.common").directive("go",["$state",function(e){return{restrict:"A",link:function(t,n,r){var o={};o[r.urlattr]=r.urlval,n.on("click",function(){e.go(r.stateurl,o)})}}}]),angular.module("elementBoxApp.common").directive("goBackBtn",["$window",function(e){return{template:"{{btntxt}}",restrict:"A",scope:{btntxt:"@"},link:function(t,n){n.on("click",function(){e.history.back()})}}}]),angular.module("elementBoxApp.common").directive("loading",function(){return{restrict:"E",templateUrl:"directives/loading/loading.html",scope:{ballsCount:"@"}}}),angular.module("elementBoxApp.common").directive("productItem",function(){return{restrict:"E",templateUrl:"directives/productitem/productitem.html",transclude:!0,scope:{product:"=",remove:"@",edit:"@",info:"@",fetchMethod:"&",removeMethod:"&"},controller:["$scope","ModalAlert",function(e,t){e.getProdThumbnail=function(e){var t=e.images.length?e.images[0].url:"imgs/no-picture-medium.png";return t.replace("image/upload","image/upload/c_fill,h_140,w_210")},e.removeProduct=function(n){e.removeMethod?e.removeMethod():t.alert({title:"Delete!",msg:"Sure to delete this product?",hasCancel:!0}).then(function(){n.$remove().then(function(){e.fetchMethod()})})}}]}}),angular.module("elementBoxApp.common").directive("searchBox",function(){return{restrict:"E",templateUrl:"directives/search-box/searchbox.html",scope:{onSearch:"="},controller:["$scope",function(e){e.searchInput="",e.search=function(){var t=e.searchInput.trim();angular.isFunction(e.onSearch)&&e.onSearch(t)},e.clearSearch=function(){e.searchInput="",e.search()}}]}}),angular.module("elementBoxApp.common").directive("ngThumb",["$window",function(e){var t={support:!(!e.FileReader||!e.CanvasRenderingContext2D),isFile:function(t){return angular.isObject(t)&&t instanceof e.File},isImage:function(e){var t="|"+e.type.slice(e.type.lastIndexOf("/")+1)+"|";return-1!=="|jpg|png|jpeg|bmp|gif|".indexOf(t)}};return{restrict:"AE",template:'<canvas class="thumb"/>',link:function(e,n,r){if(t.support){var o=e.$eval(r.ngThumb);if(t.isFile(o.file)&&t.isImage(o.file)){var a=n.find("canvas"),i=new FileReader,u=function(){var e=o.width||this.width/this.height*o.height,t=o.height||this.height/this.width*o.width;a.attr({width:e,height:t}),a[0].getContext("2d").drawImage(this,0,0,e,t)},s=function(e){var t=new Image;t.onload=u,t.src=e.target.result};i.onload=s,i.readAsDataURL(o.file)}}}}}]),angular.module("elementBoxApp.common").factory("ModalAlert",["$rootScope","$modal",function(e,t){var n,r={type:"default",title:"Woops!",msg:"A custom msg to display.",eventName:"",parseMsgCbk:function(e){return e},hasCancel:!1},o=function(e){return n&&e.type===n.type&&n.close(),n=t.open({templateUrl:"services/alert/alert.html",controller:function(t){t.msg="function"==typeof e.parseMsgCbk?e.parseMsgCbk(e.msg):e.msg,t.hasCancel=e.hasCancel,t.title=e.title},size:"sm",backdrop:"static"}),n.type=e.type,n.result};return{alertOn:function(t){var n=angular.extend({},r,t);e.$on(n.eventName,function(e,t){n.msg=t,o(n)})},alert:function(e){return o(angular.extend({},r,e))}}}]),angular.module("elementBoxApp.common").constant("AUTH_EVENTS",{singinSuccess:"auth-login-success",singinFailed:"auth-login-failed",signoutSuccess:"auth-logout-success",sessionTimeout:"auth-session-timeout",notAuthenticated:"auth-not-authenticated",notAuthorized:"auth-not-authorized"}).constant("USER_ROLES",{editor:"EDITOR",admin:"ADMIN",user:"USER"}),angular.module("elementBoxApp.common").factory("AuthService",["$http","Session","Urls","AUTH_EVENTS","$rootScope",function(e,t,n,r,o){"use strict";var a={};return a.signin=function(r){var o=e({url:n.userAuth.signin,method:"POST",data:r,params:{SILENT_ON_ERROR:!0}});return o.then(function(e){return t.create(e.data.sessionId,e.data.user),e.data.user},function(e){console.log("signin error: "+e)}),o},a.signout=function(){var r=e.get(n.userAuth.signout);return r.then(function(){t.destroy()}),r},a.signup=function(r){angular.merge(r,{SILENT_ON_ERROR:!0});var o=e.post(n.userAuth.signup,r);return o.then(function(e){return t.create(e.data.sessionId,e.data.user),e.data.user}),o},a.isAuthenticated=function(){return!!t.getSession()},a.isAuthorized=function(e){return angular.isArray(e)||(e=[e]),a.isAuthenticated()&&-1!==e.indexOf(t.userRole)},a.me=function(){var a=e.get(n.users.me,{SILENT_ON_ERROR:!0});return a.then(function(e){e.data&&(t.create(e.data._id,e.data),o.$broadcast(r.singinSuccess,{user:e.data,navigate:!1}))}),a},a}]),angular.module("elementBoxApp.common").factory("Session",function(){var e={},t=!1,n={id:null,user:{}},r=["_id","firstName","lastName","username","displayName","description","email","roles"];return e.create=function(e,o){n.id=e,r.forEach(function(e){n.user[e]=o[e]}),n.user.id=n.user._id,t=!0},e.destroy=function(){n.id=null,r.forEach(function(e){delete n.user[e]}),t=!1},e.getSession=function(){return t?n:null},e.setUser=function(e){var t=n.user._id,o=n.user.oldUsername;r.forEach(function(t){n.user[t]=e[t]}),n.user.id=t,n.user._id=t,n.user.username=o},e}),angular.module("elementBoxApp.common").factory("Categories",["Urls","$resource",function(e,t){return{getCategories:function(){return[{name:"All",filter:""},{name:"Cars",filter:"cars"},{name:"Rent",filter:"rent"},{name:"Sale",filter:"sale"},{name:"Appartments",filter:"appartments"},{name:"Houses",filter:"houses"},{name:"Bikes",filter:"bikes"},{name:"Motorbikes",filter:"motorbikes"},{name:"Clothes",filter:"Clothes"},{name:"Shirts",filter:"Shirts"}]},getCategoriesTree:function(){var n=t(e.categories.url,{},{query:{method:"GET",isArray:!0,cache:!0},save:{method:"POST",isArray:!0}});return n}}}]),angular.module("elementBoxApp.common").factory("httpInterceptor",["$q","$rootScope","EVENT_NAMES",function(e,t,n){return{responseError:function(r){return r.config.params&&r.config.params.SILENT_ON_ERROR||t.$broadcast(n.errorResponse,r),e.reject(r)}}}]),angular.module("elementBoxApp.common").factory("ngProgressService",["ngProgressFactory",function(e){var t=e.createInstance();t.setHeight("8px"),t.setColor("");var n=t.start,r=t.complete;return t.start=function(){angular.element("#progress-back").css("display","block"),n.call(t)},t.complete=function(){angular.element("#progress-back").css("display","none"),r.call(t)},t}]),angular.module("elementBoxApp.common").factory("ProductsService",["Urls","$resource",function(e,t){var n=t(e.products.products+"/:id",{id:"@_id"},{query:{method:"GET",isArray:!1,transformResponse:function(e,t,r){var o=JSON.parse(e);return r>=200&&300>r?o.results.forEach(function(e,t){o.results[t]=new n(e)}):o.results=[],o}},update:{method:"PUT"},rate:{method:"PUT",url:e.products.products+"/:id/rate"},contact:{method:"PUT",url:e.products.products+"/:id/contact"}});return n}]),angular.module("elementBoxApp.common").factory("UserService",["$http","$resource","Urls",function(e,t,n){"use strict";var r=t(n.users.users+"/:id",{id:"@_id",prodId:"@prodId",itemId:"@itemId"},{query:{method:"GET",isArray:!1,transformResponse:function(e,t,n){var o=JSON.parse(e);return n>=200&&300>n?o.results.forEach(function(e,t){o.results[t]=new r(e)}):o.results=[],o}},update:{method:"PUT"},deactivate:{method:"DELETE",transformResponse:function(){}},me:{url:n.users.me,method:"GET",params:{SILENT_ON_ERROR:!0}},updateMe:{url:n.users.me,method:"PUT",params:{SILENT_ON_ERROR:!0}},addToWishList:{url:n.users.me+"/wishlist/:prodId",method:"POST"},removeFromWishList:{url:n.users.me+"/wishlist/:itemId",method:"DELETE"},queryWishList:{url:n.users.me+"/wishlist",method:"GET"}});return r}]);