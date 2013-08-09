/**
 * dynamo.js
 * http://prezjordan.github.io/dynamo.js
 *
 * Copyright 2013 Jordan Scales (http://jordanscales.com)
 * Released under the MIT license
 * See LICENSE.txt
 *//*jslint browser: true, evil: true, sloppy: true, vars: true,
         indent: 2, maxerr: 20, maxlen: 100 *//*global jQuery */(function(e){e.fn.dynamo=function(t){return this.each(function(n,r){t=t||{};var i=e(r);if(i.data("initialized")==="true")return;var s=t.delay||parseInt(i.data("delay"),10)||3e3,o=t.speed||parseInt(i.data("speed"),10)||350,u=t.pause||i.data("pause")||!1,a=t.lines||i.data("lines").split(i.data("delimiter")||","),f=t.callback||i.data("callback")||function(){},l=t.centered||i.data("center")||!1;i.html(e("<span></span>").html(i.html())).data("initialized","true");a.forEach(function(t){i.append(e("<span></span>").html(t))});i.find("span").each(function(t,n){var r=e(n).remove(),s=e("<div></div>").html(r.html());t||s.data("trigger","true");i.append(s)});var c=i.find(">:first-child").height();i.height(c).css({display:"inline-block",position:"relative",overflow:"hidden","vertical-align":"bottom","text-align":"left"});l&&i.css("text-align","center");var h=function(){i.dynamo_trigger({speed:o,callback:f})};u||setInterval(h,s)})};e.fn.dynamo_trigger=function(t){return this.each(function(n,r){t=t||{};var i=e(r),s=t.speed||i.data("speed")||350,o=t.callback||new Function(i.data("callback"))||function(){};i.find("div:first").slideUp(s,function(){i.append(e(this).show());i.find("div:first").data("trigger")==="true"&&o()})})};e(".dynamo").dynamo()})(jQuery);