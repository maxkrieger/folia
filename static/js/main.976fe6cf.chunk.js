(this.webpackJsonpfolia=this.webpackJsonpfolia||[]).push([[0],{17:function(e,t,n){e.exports=n.p+"static/media/turtle.c5498b74.svg"},19:function(e,t,n){e.exports=n(26)},24:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var o,i=n(0),r=n.n(i),c=n(16),a=n.n(c),l=(n(24),n(10)),s=n(6),d=n(7),u=n(11),p=n(2),f=n(5),h=n(3),m=n(4),b=n(1),g=n.n(b),v=n(13),w=n.n(v),y=function e(t){Object(p.a)(this,e),this.name=void 0,this.id=void 0,this.child=void 0,this.name=t,this.id=w()(t)},O=function(e){function t(e){var n;return Object(p.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).startMillis=-1,n.Setup=function(){n.startMillis=n.p.millis(),n.setup()},n.p=void 0,n.world=void 0,n.drawableChildren=[],n.child=void 0,n.x=void 0,n.y=void 0,n.cancelled=!1,n.onDragOut=function(){},n.setOnDragOut=function(e){n.onDragOut=e},n.getHeight=function(){return.6*n.p.windowHeight},n.composite=void 0,n.composite=g.a.Composite.create({label:n.id}),n}return Object(m.a)(t,e),t}(y);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}!function(e){e[e.THING=0]="THING",e[e.ATTRIBUTE=1]="ATTRIBUTE"}(o||(o={}));var C=function(e,t,n,o){var i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];return{name:e,instanceid:w()("card-"),color:"#000000",hasParent:!1,coords:{x:t,y:n},isTemplate:i,angle:0,age:0,type:o}},M=function e(t){var n=C(t.name,0,0,t instanceof O?o.THING:o.ATTRIBUTE);return t.child?B(n,e(t.child)):n},x=function e(t,n){return n.instanceid===t?n:n.child?e(t,n.child):void 0},I=function e(t,n){return n.instanceid===t?void 0:n.child?j({},n,{child:e(t,n.child)}):n},S=function e(t,n,o,i){return j({},t,{hasParent:!0,coords:{y:i,x:n},child:t.child?e(t.child,n+o,o,i):void 0})},B=function e(t,n){return void 0===t.child?j({},t,{age:0,child:S(n,t.coords.x+_+ee,_+ee,t.coords.y)}):j({},t,{child:e(t.child,n)})},P=function(e,t,n){var o=e.map((function(e){return x(n,e)})).find((function(e){return void 0!==e}));return void 0===o?(console.error("ASSERT: cannot find child by ID ".concat(n)),e):e.map((function(e){return I(n,e)})).filter((function(e){return void 0!==e})).map((function(e){return void 0!==x(t,e)?B(e,o):e}))},D=function(e,t,n){var o=e.map((function(e){return x(t,e)})).find((function(e){return void 0!==e})),i=e.map((function(e){return x(n,e)})).find((function(e){return void 0!==e}));return void 0===o||void 0===i||void 0===x(t,i)&&void 0===x(n,o)},z=function(e,t){var n=e.map((function(e){return x(t,e)})).find((function(e){return void 0!==e}));if(void 0===n)return console.error("ASSERT: cannot find ID ".concat(t)),e;var o=e.map((function(e){return I(t,e)})).filter((function(e){return void 0!==e}));return[].concat(Object(l.a)(o),[j({},n,{age:0,hasParent:!1,angle:16*Math.random()-8})])},T=function e(t){return t.child?e(t.child)+1:1},H=n(12),k=n.n(H),R=n(8),A=n(17),W=n.n(A);function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var L=function(e){function t(e,n){var o,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=arguments.length>4?arguments[4]:void 0;return Object(p.a)(this,t),(o=Object(f.a)(this,Object(h.a)(t).call(this,"turtle"))).img=void 0,o.rotationInterval=void 0,o.rainbowMode=!1,o.virtualCanvas=void 0,o.maxage=18e4,o.penMode={enable:!1,rainbow:!1,lastX:-1,lastY:-1},o.getEffect=function(e){var n=new t(o.p,o.world,o.x,o.y,o.child);n.Setup(),g.a.World.add(o.world,n.composite),n.child&&n.child.getEffect((function(e,t){if("oscillate"===e&&g.a.Body.applyForce(n.composite.bodies[0],{x:0,y:0},{x:0,y:.01*t}),"rainbow"===e&&(n.rainbowMode=!0),"pen"===e&&(n.penMode=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n.penMode,{enable:!0,rainbow:t.rainbow})),"wavy"===e&&(clearInterval(n.rotationInterval),g.a.Body.rotate(n.composite.bodies[0],.05*t)),t instanceof O&&"emitter"!==t.name){var o=g.a.Composite.allBodies(n.composite)[0],i=g.a.Composite.allBodies(t.composite)[0];g.a.Composite.add(n.composite,t.composite);var r=o.bounds.max.y-o.bounds.min.y,c=o.bounds.max.x-o.bounds.min.x,a=i.bounds.max.y-i.bounds.min.y,l=i.bounds.max.x-i.bounds.min.x;g.a.Composite.add(n.composite,g.a.Constraint.create({bodyA:o,bodyB:i,pointA:{x:1*c,y:0*r},pointB:{x:-.8*l,y:0*a},length:8,damping:.1,stiffness:.1})),n.drawableChildren.push(t)}})),e(o.name,n)},o.setRotationInterval=function(){o.rotationInterval=window.setInterval((function(){g.a.Body.setAngularVelocity(o.composite.bodies[0],o.p.randomGaussian(0,.01))}),o.p.randomGaussian(500,100))},o.setup=function(){},o.debugBounds=function(){o.p.push();var e=o.composite.bodies[0].vertices;o.p.fill(255,255,255,.5),o.p.beginShape(),e.forEach((function(e){o.p.vertex(e.x,e.y)})),o.p.endShape(o.p.CLOSE),o.p.pop()},o.handlePen=function(){var e=o.composite.bodies[0].position,t=e.x,n=e.y;if(-1===o.penMode.lastX&&(o.penMode.lastX=t,o.penMode.lastY=n),o.penMode.enable){var i=o.virtualCanvas;i.push();i.colorMode(o.p.HSB,5e3),i.stroke("white"),o.penMode.rainbow&&i.stroke((o.p.millis()-o.startMillis)%5e3,2500,5e3),i.strokeWeight(5),i.line(o.penMode.lastX,o.penMode.lastY,t,n),o.penMode.lastX=t,o.penMode.lastY=n,i.pop(),o.p.image(i,0,0)}},o.draw=function(){if(o.p.millis()-o.startMillis>=o.maxage)o.cancel();else{g.a.Query.point([o.composite.bodies[0]],{x:o.p.mouseX,y:o.p.mouseY}).length>0&&o.p.mouseIsPressed&&o.composite.bodies[0].position.y>=o.getHeight()-50&&o.onDragOut(Object(R.a)(o));var e=g.a.Vector.rotate(g.a.Vector.create(0,-.5),o.composite.bodies[0].angle);g.a.Body.setVelocity(o.composite.bodies[0],e),o.handlePen(),o.p.push(),o.p.angleMode(o.p.RADIANS),o.p.translate(o.composite.bodies[0].position.x,o.composite.bodies[0].position.y),o.p.rotate(o.composite.bodies[0].angle),o.rainbowMode&&(o.p.colorMode(o.p.HSB,1e3),o.p.tint((o.p.millis()-o.startMillis)%1e3,500,1e3)),o.p.image(o.img,-24,-20),o.p.pop(),o.drawableChildren.forEach((function(e){e.draw()}))}},o.cancel=function(){window.clearInterval(o.rotationInterval),o.cancelled=!0,g.a.World.remove(o.world,o.composite.bodies[0],!0),o.child&&o.child.cancel()},o.child=c,o.x=i,o.y=r,o.world=n,o.p=e,o.img=o.p.loadImage(W.a),o.virtualCanvas=o.p.createGraphics(o.p.windowWidth,o.getHeight()),g.a.Composite.add(o.composite,g.a.Bodies.circle(i,r,25,{angle:o.p.randomGaussian(0,1)})),o.setRotationInterval(),o}return Object(m.a)(t,e),t}(O),U=function(e){var t=e.color;return i.createElement("svg",{width:"48",height:"60"},i.createElement("g",null,i.createElement("g",null,i.createElement("path",{d:"M38,16.9199219c0-0.8457031-0.3291016-1.6411133-0.9277344-2.2392578    c-1.2333984-1.2333984-3.2431641-1.234375-4.4785156,0l-1.1982422,1.1982422    c-0.6259766-0.3295898-1.3134766-0.609375-2.0615234-0.8349609V11c0-2.9404297-2.3925781-5.3330078-5.3339844-5.3330078    c-2.9404297,0-5.3330078,2.3925781-5.3330078,5.3330078v4.043457c-0.7490234,0.2255859-1.4360352,0.5053711-2.0620117,0.8354492    l-1.1982422-1.1982422c-1.234375-1.2353516-3.2441406-1.2353516-4.4785156,0    c-1.2348633,1.2348633-1.2348633,3.2436523,0,4.4785156l1.605957,1.6064453    c-0.2363281,0.8276367-0.3676758,1.722168-0.3676758,2.6923828c0,2.2333984,0.6176758,4.6181641,1.675293,6.8027344    l-1.4995117,1.4990234c-1.2348633,1.234375-1.2348633,3.2441406,0,4.4785156    c0.6171875,0.6171875,1.4282227,0.9257812,2.2392578,0.9257812s1.6220703-0.3085938,2.2392578-0.9257812l0.8525391-0.8525391    C19.2373047,36.75,21.0478516,37.6835938,23,37.9248047v1.2421875c0,1.7460938,1.4208984,3.1669922,3.1669922,3.1669922    c0.5527344,0,1-0.4472656,1-1s-0.4472656-1-1-1C25.5234375,40.3339844,25,39.8105469,25,39.1669922v-1.2421875    c1.9521484-0.2421875,3.7626953-1.1748047,5.3271484-2.5390625l0.8525391,0.8525391    c0.6171875,0.6171875,1.4287109,0.9257812,2.2392578,0.9257812s1.6220703-0.3085938,2.2392578-0.9257812    c1.234375-1.234375,1.234375-3.2441406,0-4.4785156l-1.5-1.5c1.0566406-2.1845703,1.6748047-4.5693359,1.6748047-6.8017578    c0-0.9697266-0.1308594-1.8642578-0.3671875-2.6914062l1.6064453-1.6069336C37.6708984,18.5615234,38,17.7661133,38,16.9199219z     M33.8330078,23.4580078c0,2.1318359-0.6484375,4.4404297-1.7382812,6.4902344    c-0.03125,0.0527344-0.0693359,0.1005859-0.0908203,0.1572266c-0.6464844,1.1816406-1.4394531,2.2675781-2.3417969,3.1796875    c-0.0039062,0.0039062-0.0087891,0.0048828-0.0126953,0.0087891c-0.0048828,0.0048828-0.0058594,0.0117188-0.0107422,0.0166016    C28.0244141,34.9345703,26.0732422,36,24,36c-2.0703125,0-4.0200195-1.0625-5.6328125-2.6835938    c-0.0068359-0.0068359-0.0087891-0.0166016-0.015625-0.0234375c-0.0053711-0.0058594-0.0126953-0.0068359-0.0180664-0.0117188    c-0.9018555-0.9140625-1.6958008-2-2.3417969-3.1826172c-0.0141602-0.0371094-0.0410156-0.0683594-0.0600586-0.1044922    c-1.1054688-2.0605469-1.7651367-4.3876953-1.7651367-6.5361328c0-5.8886719,5.3476562-7.1245117,9.8334961-7.1245117    C28.4853516,16.3334961,33.8330078,17.5693359,33.8330078,23.4580078z M20.6669922,11    c0-1.8378906,1.4951172-3.3330078,3.3330078-3.3330078S27.3339844,9.1621094,27.3339844,11v3.5922852    C26.3037109,14.4272461,25.1972656,14.3334961,24,14.3334961s-2.3027344,0.0932617-3.3330078,0.2587891V11z     M12.3422852,17.7451172c-0.4550781-0.4550781-0.4550781-1.1953125,0-1.6503906s1.1953125-0.4550781,1.6503906,0    l0.925293,0.925293c-0.6040039,0.5214844-1.1225586,1.1074219-1.53125,1.7700195L12.3422852,17.7451172z M13.7563477,34.8242188    c-0.4550781-0.4550781-0.4550781-1.1953125,0-1.6503906l1.0908203-1.0908203    c0.4282227,0.6689453,0.9052734,1.296875,1.4150391,1.8857422l-0.8554688,0.8554688    C14.9516602,35.2792969,14.2114258,35.2792969,13.7563477,34.8242188z M34.2441406,33.1738281    c0.4550781,0.4550781,0.4550781,1.1953125,0,1.6503906s-1.1953125,0.4550781-1.6503906,0l-0.8564453-0.8564453    c0.5097656-0.5888672,0.9873047-1.2167969,1.4150391-1.8857422L34.2441406,33.1738281z M35.6582031,17.7451172    l-1.0449219,1.0454102c-0.4091797-0.6625977-0.9267578-1.2485352-1.53125-1.7700195l0.9257812-0.925293    c0.4550781-0.4550781,1.1953125-0.4545898,1.6503906-0.0004883C35.8789062,16.3154297,36,16.6083984,36,16.9199219    S35.8789062,17.5244141,35.6582031,17.7451172z",fill:t}))))},F=n(9),V=function(e){function t(){return Object(p.a)(this,t),Object(f.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),t}(y),X=function(e){function t(e,n){arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]&&arguments[3];var o,i=arguments.length>4?arguments[4]:void 0;return Object(p.a)(this,t),(o=Object(f.a)(this,Object(h.a)(t).call(this,"rainbow"))).child=i,o}return Object(m.a)(t,e),Object(F.a)(t,[{key:"getEffect",value:function(e){this.child&&this.child.getEffect(e),e("rainbow",null)}},{key:"cancel",value:function(){this.child&&this.child.cancel()}}]),t}(V),Y=function(e){var t=e.color;return i.createElement("svg",{viewBox:"0 0 100 125",width:"50"},i.createElement("g",null,i.createElement("path",{fill:t,d:"M77.385,72.358h-5.818C69.078,62.729,60.409,55.59,50,55.59s-19.078,7.14-21.566,16.769h-5.819   C25.213,59.617,36.506,50,50,50C63.494,50,74.787,59.617,77.385,72.358z M50,38.821c-19.678,0-36.01,14.601-38.728,33.537h5.693   C19.629,56.501,33.384,44.41,50,44.41c16.615,0,30.371,12.091,33.035,27.948h5.693C86.01,53.422,69.678,38.821,50,38.821z    M50,27.642c-25.852,0-47.205,19.597-50,44.717h5.671C8.428,50.306,27.206,33.231,50,33.231c22.795,0,41.572,17.074,44.328,39.127   H100C97.205,47.238,75.852,27.642,50,27.642z"})))},N=function(e){function t(e,n){arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]&&arguments[3];var o,i=arguments.length>4?arguments[4]:void 0;return Object(p.a)(this,t),(o=Object(f.a)(this,Object(h.a)(t).call(this,"pen"))).enableRainbow=!1,o.child=i,o}return Object(m.a)(t,e),Object(F.a)(t,[{key:"getEffect",value:function(e){var t=this;this.child?this.child.getEffect((function(n,o){"rainbow"===n?(t.enableRainbow=!0,e("pen",{rainbow:!0})):(e(n,o),e("pen",{rainbow:t.enableRainbow}))})):e("pen",{rainbow:!1})}},{key:"cancel",value:function(){this.child&&this.child.cancel()}}]),t}(V),Q=function(e){var t=e.color;return i.createElement("svg",{viewBox:"0 0 24 30",width:"36"},i.createElement("g",null,i.createElement("path",{d:"M3.5,17.2c-0.6,0.6-0.8,1.3-1.1,2c-0.3,1-0.6,1.8-1.9,2.2c-0.3,0.1-0.4,0.4-0.4,0.6c0,0.3,0.2,0.5,0.5,0.6   c1,0.3,1.9,0.4,2.8,0.4c2.1,0,3.6-0.7,4.4-1.5c0.6-0.6,0.9-1.3,0.9-2.1s-0.3-1.6-0.9-2.1C6.6,16,4.6,16,3.5,17.2z M6.8,20.5   c-0.7,0.7-2.2,1.3-4.3,1.1c0.6-0.6,0.9-1.4,1.1-2.1C3.8,19,4,18.4,4.4,18.1c0,0,0,0,0,0c0.7-0.7,1.8-0.7,2.5,0   c0.3,0.3,0.5,0.8,0.5,1.2C7.3,19.8,7.2,20.2,6.8,20.5z",fill:t}),i.createElement("path",{d:"M23.7,1.3c-0.5-0.5-1-1-8.4,5c-3.4,2.8-7,6-7.5,6.5c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.8,0.3,1.6,0.9,2.1   C8.4,17.7,9.2,18,9.9,18c0.8,0,1.6-0.3,2.1-0.9c0.5-0.5,3.7-4.1,6.5-7.5C24.7,2.3,24.2,1.7,23.7,1.3z M8.7,16.2   c-0.3-0.3-0.5-0.8-0.5-1.2c0-0.5,0.2-0.9,0.5-1.2c0.1-0.1,0.3-0.3,0.5-0.4c0.9,0.6,1.8,1.5,2.4,2.4c-0.2,0.2-0.3,0.4-0.4,0.5   C10.5,16.9,9.4,16.9,8.7,16.2z M12.5,14.8c-0.6-0.9-1.5-1.7-2.3-2.3c3.1-2.7,9.6-8.3,12.1-9.7C20.8,5.2,15.2,11.7,12.5,14.8z",fill:t})))},J=function(e){function t(e,n){var o,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=arguments.length>4?arguments[4]:void 0;return Object(p.a)(this,t),(o=Object(f.a)(this,Object(h.a)(t).call(this,"emitter"))).emitInterval=void 0,o.radius=10,o.count=20,o.maxage=5e4,o.rainbowMode=!1,o.cancel=function(){o.cancelled=!0,window.clearInterval(o.emitInterval),o.drawableChildren.forEach((function(e){g.a.Composite.remove(e.world,e.composite.bodies[0]),e.cancel()})),o.child&&o.child.cancel(),o.drawableChildren=[],g.a.Composite.remove(o.world,o.composite.bodies[0])},o.getEffect=function(e){var n=new t(o.p,o.world,o.x,o.y,o.child);n.Setup(),g.a.World.add(o.world,n.composite),n.child&&n.child.getEffect((function(e,t){if("wavy"===e){g.a.Body.rotate(n.composite.bodies[0],.05*t);var i=g.a.Vector.rotate(g.a.Vector.create(0,-.5),n.composite.bodies[0].angle);g.a.Body.setVelocity(n.composite.bodies[0],i)}"rainbow"===e&&(n.rainbowMode=!0),t instanceof O&&(n.emitInterval=window.setInterval((function(){if(n.count>0){n.count--;var e=n.composite.bodies[0].position,i=e.x,r=e.y;t.getEffect((function(e,t){if(t.name!==n.name){g.a.Body.setPosition(t.composite.bodies[0],{x:i,y:r});var c=o.p.randomGaussian(0,1);g.a.Body.applyForce(t.composite.bodies[0],{x:t.composite.bodies[0].position.x,y:t.composite.bodies[0].position.y},g.a.Vector.rotate({x:0,y:-.1},c)),g.a.Body.rotate(t.composite.bodies[0],c),g.a.Composite.add(n.composite,t.composite),n.drawableChildren.push(t)}}))}}),o.p.randomGaussian(900,100)))})),e(o.name,n)},o.draw=function(){if(g.a.Query.point([o.composite.bodies[0]],{x:o.p.mouseX,y:o.p.mouseY}).length>0&&o.p.mouseIsPressed&&o.composite.bodies[0].position.y>=o.getHeight()-50&&o.onDragOut(Object(R.a)(o)),o.p.millis()-o.startMillis>=o.maxage)o.cancel();else{o.p.push();o.p.colorMode(o.p.HSB,5e3),o.p.fill("white"),o.rainbowMode&&o.p.fill((o.p.millis()-o.startMillis)%5e3,2500,5e3),o.p.circle(o.composite.bodies[0].position.x,o.composite.bodies[0].position.y,o.radius),o.p.pop(),o.drawableChildren.forEach((function(e){e.draw()}))}},o.setup=function(){},o.x=i,o.y=r,o.p=e,o.world=n,o.child=c,g.a.Composite.add(o.composite,g.a.Bodies.circle(i,r,o.radius/2,{isSensor:!0})),o}return Object(m.a)(t,e),t}(O),q=function(e){e.color;return i.createElement("svg",{viewBox:"0 0 108.777 140.71",width:"50"},i.createElement("g",null,i.createElement("g",null,i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M54.388,86.653c-13.364,0-24.237-10.873-24.237-24.236c0-13.365,10.873-24.238,24.237-24.238     c13.365,0,24.238,10.873,24.238,24.238C78.626,75.78,67.753,86.653,54.388,86.653z M54.388,43.179     c-10.607,0-19.237,8.63-19.237,19.238c0,10.607,8.63,19.236,19.237,19.236s19.238-8.629,19.238-19.236     C73.626,51.809,64.995,43.179,54.388,43.179z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M54.389,43.179c-1.381,0-2.5-1.119-2.5-2.5V2.5c0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5v38.179     C56.889,42.06,55.77,43.179,54.389,43.179z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M43.522,46.091c-0.864,0-1.704-0.447-2.167-1.25l-16.95-29.359c-0.69-1.195-0.281-2.725,0.915-3.414     c1.196-0.693,2.725-0.281,3.415,0.914l16.95,29.359c0.69,1.195,0.28,2.725-0.915,3.415     C44.377,45.983,43.946,46.091,43.522,46.091z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M35.562,54.048c-0.424,0-0.854-0.108-1.247-0.336L15.49,42.844c-1.196-0.69-1.605-2.22-0.915-3.415     c0.689-1.195,2.218-1.607,3.415-0.915l18.824,10.868c1.195,0.69,1.605,2.219,0.915,3.415     C37.267,53.599,36.426,54.048,35.562,54.048z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M19.031,64.915c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h13.621c1.381,0,2.5,1.119,2.5,2.5     s-1.119,2.5-2.5,2.5H19.031z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M2.503,94.874c-0.864,0-1.704-0.447-2.167-1.25c-0.69-1.195-0.281-2.724,0.915-3.416l33.063-19.09     c1.194-0.691,2.725-0.281,3.415,0.915s0.28,2.725-0.915,3.415L3.751,94.538C3.357,94.766,2.927,94.874,2.503,94.874z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M26.874,112.569c-0.424,0-0.854-0.109-1.247-0.336c-1.196-0.691-1.605-2.219-0.915-3.416l16.644-28.828     c0.689-1.195,2.218-1.607,3.415-0.915c1.195,0.69,1.605,2.22,0.915,3.415l-16.644,28.828     C28.579,112.12,27.738,112.569,26.874,112.569z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M54.39,110.141c-1.381,0-2.5-1.119-2.5-2.5l-0.001-23.49c0-1.381,1.119-2.5,2.5-2.5     c1.38,0,2.5,1.119,2.5,2.5l0.001,23.49C56.89,109.022,55.771,110.141,54.39,110.141z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M81.116,111.206c-0.864,0-1.704-0.449-2.167-1.252L63.092,82.489c-0.69-1.195-0.281-2.725,0.915-3.415     c1.195-0.692,2.725-0.281,3.415,0.915l15.857,27.464c0.69,1.197,0.28,2.725-0.915,3.416     C81.971,111.096,81.54,111.206,81.116,111.206z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M84.665,82.397c-0.424,0-0.854-0.108-1.247-0.336l-11.455-6.613c-1.196-0.69-1.605-2.219-0.915-3.415     c0.688-1.195,2.218-1.607,3.415-0.915l11.455,6.613c1.195,0.69,1.605,2.219,0.915,3.415     C86.37,81.948,85.529,82.397,84.665,82.397z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M76.125,64.915c-1.381,0-2.5-1.119-2.5-2.5s1.119-2.5,2.5-2.5h29.055c1.381,0,2.5,1.119,2.5,2.5     s-1.119,2.5-2.5,2.5H76.125z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M73.215,54.048c-0.864,0-1.704-0.449-2.167-1.251c-0.69-1.196-0.281-2.725,0.915-3.415l33.064-19.091     c1.196-0.69,2.725-0.28,3.415,0.915s0.28,2.725-0.915,3.415L74.463,53.712C74.069,53.938,73.639,54.048,73.215,54.048z"})),i.createElement("g",null,i.createElement("path",{fill:"#000000",d:"M65.254,46.091c-0.424,0-0.854-0.107-1.247-0.335c-1.196-0.69-1.605-2.22-0.915-3.415l12.701-22.002     c0.689-1.195,2.217-1.607,3.415-0.914c1.195,0.689,1.605,2.219,0.915,3.414L67.422,44.841     C66.959,45.643,66.118,46.091,65.254,46.091z"})))))},Z=function(e){function t(e,n){arguments.length>2&&void 0!==arguments[2]&&arguments[2],arguments.length>3&&void 0!==arguments[3]&&arguments[3];var o,i=arguments.length>4?arguments[4]:void 0;return Object(p.a)(this,t),(o=Object(f.a)(this,Object(h.a)(t).call(this,"wavy"))).interval=void 0,o.state=0,o.p=void 0,o.child=i,o.p=e,o}return Object(m.a)(t,e),Object(F.a)(t,[{key:"getEffect",value:function(e){var t=this;this.child&&this.child.getEffect(e);var n=.5+this.p.randomGaussian(0,.2);this.interval=window.setInterval((function(){t.state+=.1,e("wavy",Math.sin(n*t.state))}),50)}},{key:"cancel",value:function(){window.clearInterval(this.interval),this.child&&this.child.cancel()}}]),t}(V),$=function(e){e.color;return i.createElement("svg",{viewBox:"0 0 100 125",width:"50"},i.createElement("path",{d:"M74.46,86q-.44,0-.87,0c-7.3-.6-13-8.67-16.57-15.33-2.26-4.26-4.19-10.54-6.25-17.18-4.55-14.72-10.21-33-22-36.79C19.51,13.68,13,24.2,8.4,33.69A139.25,139.25,0,0,0,2,50.21a1,1,0,0,1-2-.66A140.86,140.86,0,0,1,6.55,32.79c3.2-6.58,10.71-22,22.84-18.14C42.22,18.72,47.81,36.82,52.74,52.8c2,6.55,3.93,12.74,6.1,16.83,3.29,6.21,8.54,13.72,14.92,14.24,3.18.26,6.42-1.29,9.65-4.61,7-7.25,10.72-18.21,13.68-27,.28-.84.58-1.77.9-2.77a1,1,0,1,1,2,.62c-.32,1-.62,1.95-.91,2.8-2.87,8.53-6.8,20.22-14.16,27.8C81.49,84.19,78,86,74.46,86Z"}))},K={turtle:[L,U,o.THING],emitter:[J,q,o.THING],rainbow:[X,Y,o.ATTRIBUTE],pen:[N,Q,o.ATTRIBUTE],wavy:[Z,$,o.ATTRIBUTE]},_=82.5,ee=10,te=function(e){var t=e.cardData,n=e.dropping,r=K[t.name][1];return i.createElement("div",{style:{width:_,height:115,backgroundColor:n?"#6BCAFF":"#FFFFFF",display:"flex",justifyContent:"center",border:"1px solid black",alignItems:"center",cursor:"grab",zIndex:10,position:"relative"}},i.createElement("span",{style:{userSelect:"none",position:"absolute",top:2,right:5,fontWeight:"bold"}},t.type===o.ATTRIBUTE?"A":"T"),i.createElement(r,{color:t.color}))},ne=Object(u.a)((function(e){var t=e.getRef,n=e.x,o=e.y,r=e.dropping,c=e.cardData,a=e.onSetCoords,l=e.ond,s=e.onLift,d=e.mousedown,u=e.isUnrelated,p=e.allCards,f=i.createElement(te,{cardData:c,dropping:r}),h=void 0===c.child&&!c.hasParent,m=i.createElement("div",{style:{position:"absolute",left:n,top:o,opacity:d?.5:1,transition:"opacity 0.25s, transform 0.25s",transform:"rotate(".concat(h?c.angle:0,"deg)"),boxSizing:"border-box",touchAction:"none",zIndex:d?1e3:10},"data-card-id":c.instanceid,ref:t},f);if(!c.child)return m;var b=i.createElement(oe,{cardData:d?S(c.child,c.coords.x+_/5,_/5,c.coords.y):c.child,allCards:p,onSetCoords:a,onDrop:l,onLift:s,isUnrelated:u});return i.createElement(i.Fragment,null,m,b)})),oe=function(e){var t=e.cardData,n=e.onSetCoords,o=e.onDrop,r=e.onLift,c=e.isUnrelated,a=e.allCards,l=i.useState(!1),s=Object(d.a)(l,2),u=s[0],p=s[1],f=i.useState(!1),h=Object(d.a)(f,2),m=h[0],b=h[1],g=void 0!==t.child&&!t.hasParent,v=i.useMemo((function(){return{ondragenter:function(){return p(!0)},ondragleave:function(){return p(!1)},ondrop:function(e){var n=e.relatedTarget;o(t.instanceid,n.dataset.cardId),p(!1)},overlap:.1,accept:function(e){e.dropzone;var n=e.draggableElement;return!!n.dataset.cardId&&(c(a,t.instanceid,n.dataset.cardId)&&t.instanceid!==n.dataset.cardId)}}}),[a,t.instanceid,c,o]),w=i.createElement(ne,Object.assign({draggable:{inertia:!0,onend:function(){return r(t.instanceid)},onmove:function(e){var o=e.dy,i=e.dx;return n(o,i,t.instanceid)},modifiers:[k.a.modifiers.restrictRect({restriction:document.body})]},dropzone:v,dropping:u,onDown:function(){b(!0)},onUp:function(){b(!1)},mousedown:m,cardData:t,onSetCoords:n,onLift:r,ond:o,allCards:a,isUnrelated:c},t.coords));return i.createElement(i.Fragment,null,i.createElement("div",{style:{display:g&&!m?"initial":"none",position:"absolute",width:T(t)*(_+ee)+ee,height:135,left:t.coords.x-ee,top:t.coords.y-ee,backgroundColor:"tan",borderRadius:"10px",zIndex:10}}),w)},ie=n(18),re=n.n(ie),ce=function e(t,n){var o=this;Object(p.a)(this,e),this.mouse=void 0,this.mouseConstraint=void 0,this.canvas=void 0,this.p=void 0,this.engine=void 0,this.onDragOut=void 0,this.rainbowMode=!1,this.penMode={enable:!1,rainbow:!1,lastX:-1,lastY:-1},this.startMillis=0,this.things=[],this.windowResized=function(){o.p.resizeCanvas(o.p.windowWidth,o.getHeight())},this.onDrop=function(e){var t=o.construct(e);t instanceof O?o.addThing(t):t.getEffect((function(t,n){"rainbow"===t?o.rainbowMode=!o.rainbowMode:"pen"===t&&(o.penMode={lastX:e.coords.x,lastY:e.coords.y,enable:!0,rainbow:n.rainbow})}))},this.construct=function(e){return new K[e.name][0](o.p,o.engine.world,e.coords.x,e.coords.y,e.child?o.construct(e.child):void 0)},this.walls=void 0,this.addThing=function(e){e.Setup(),e.getEffect((function(e,t){t.setOnDragOut((function(e){o.things=o.things.filter((function(t){return t.id!==e.id})),o.onDragOut(e)})),o.things.push(t)}))},this.Setup=function(){o.canvas=o.p.createCanvas(o.p.windowWidth,o.getHeight()),o.mouse=g.a.Mouse.create(o.canvas.elt);var e={mouse:o.mouse,constraint:{stiffness:.1,angularStiffness:.95}};o.mouseConstraint=g.a.MouseConstraint.create(o.engine,e),o.engine.world.gravity.y=0,o.startMillis=o.p.millis(),o.mouseConstraint.mouse.pixelRatio=o.p.pixelDensity(),g.a.World.add(o.engine.world,o.mouseConstraint),o.walls=[g.a.Bodies.rectangle(0,o.getHeight()+70,o.p.windowWidth,70,{isStatic:!0}),g.a.Bodies.rectangle(0,-70,o.p.windowWidth,70,{isStatic:!0}),g.a.Bodies.rectangle(-70,0,70,o.getHeight(),{isStatic:!0}),g.a.Bodies.rectangle(o.p.windowWidth,0,70,o.getHeight(),{isStatic:!0})],g.a.World.add(o.engine.world,o.walls),g.a.Engine.run(o.engine)},this.watchdog=function(){g.a.Composite.allBodies(o.engine.world).forEach((function(e){var t=e.position,n=t.x,i=t.y;e.isStatic||(n<0?(e.position.x=0,g.a.Body.rotate(e,Math.PI)):n>o.p.windowWidth?(e.position.x=o.p.windowWidth-50,g.a.Body.rotate(e,Math.PI)):i<0?(e.position.y=0,g.a.Body.rotate(e,Math.PI)):i>o.getHeight()&&(e.position.y=o.getHeight()-50,g.a.Body.rotate(e,Math.PI)))}))},this.collideDog=function(){o.walls.map((function(e){return g.a.Query.collides(e,g.a.Composite.allBodies(o.engine.world))})).flat().forEach((function(e){var t=e.bodyB,n=e.bodyA;t.isStatic||g.a.Body.rotate(t,Math.PI),n.isStatic||g.a.Body.rotate(n,Math.PI)}))},this.getHeight=function(){return.6*o.p.windowHeight},this.draw=function(){if(o.things=o.things.filter((function(e){return!e.cancelled})),o.things.forEach(o.watchdog),o.collideDog(),o.rainbowMode?(o.p.colorMode(o.p.HSB,1e3),o.p.background((o.p.millis()-o.startMillis)%1e3,500,400)):o.p.background("#322931"),o.penMode.enable){o.p.push(),o.p.colorMode(o.p.HSB,5e3),o.p.fill("white"),o.penMode.rainbow&&o.p.fill((o.p.millis()-o.startMillis)%5e3,2500,5e3),o.p.circle(o.penMode.lastX,o.penMode.lastY,10),o.p.pop()}o.things.forEach((function(e){e.draw()}))},this.p=t,this.p.setup=this.Setup,this.p.windowResized=this.windowResized,this.p.draw=this.draw,this.engine=g.a.Engine.create(),this.onDragOut=n};function ae(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var le=function(e){var t=e.getRef,n=e.theref,r=e.addCard,c=i.useState(null),a=Object(d.a)(c,2),l=a[0],u=a[1];i.useImperativeHandle(n,(function(){return{onDrop:function(e){l.onDrop(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ae(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ae(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{coords:{x:e.coords.x+_/2,y:e.coords.y+57.5}}))}}}));var p=i.useCallback((function(e){if(null!==e){new re.a((function(e){var t=new ce(e,(function(e){r(function(e){var t=C(e.name,e.composite.bodies[0].position.x,e.composite.bodies[0].position.y,o.THING);return e.child?B(t,M(e.child)):t}(e))}));return u(t),t}),e)}}),[]);return i.createElement("div",{ref:t},i.createElement("div",{ref:p}))},se=i.forwardRef((function(e,t){var n=i.useMemo((function(){return function(e){return i.createElement(le,Object.assign({ref:t},e))}}),[t]),o=i.useMemo((function(){return Object(u.a)(n)}),[n]);return i.createElement(o,e)})),de=function(e){var t=e.dropped,n=e.addCard,o=i.useRef();return i.createElement(se,{dropzone:{accept:function(e){e.dropzone;return!!e.draggableElement.dataset.cardId},ondrop:function(e){var n=e.relatedTarget;t(n.dataset.cardId,(function(e){o&&o.current&&o.current.onDrop(e)}))},overlap:.5},theref:o,addCard:n})};function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function pe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var fe=function(e,t,n,o){return o.map((function(o){return function e(t,n,o,i){return i.instanceid===o?j({},i,{coords:{x:i.coords.x+n,y:i.coords.y+t},age:0,isTemplate:!1,child:i.child?e(t,n,i.child.instanceid,i.child):i.child}):i.child?j({},i,{child:e(t,n,o,i.child)}):i}(e,t,n,o)}))},he=function(){var e,t=(e=window.innerHeight-115-ee-50,Object.keys(K).map((function(t,n){return C(t,window.innerWidth/2-(_+ee)*Object.keys(K).length/2+(_+ee)*n+ee,e,K[t][2],!0)}))),n=Object(i.useState)({cards:t}),o=Object(d.a)(n,2),c=o[0],a=o[1];return function(e,t){var n=Object(i.useRef)();Object(i.useEffect)((function(){n.current=e}),[e]),Object(i.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){var e;a(pe({},c,{cards:(e=c.cards,e.map((function(e){return j({},e,{age:e.age+(e.isTemplate?0:1e3)})})).filter((function(e){return e.isTemplate||e.age<6e4})))}))}),1e3),r.a.createElement("div",{style:{width:"100%",height:"calc(100%-".concat(50,"px)")}},r.a.createElement(de,{dropped:function(e,t){a((function(n){var o=function(e,t){var n=t.map((function(t){return x(e,t)})).find((function(e){return void 0!==e}));return void 0===n?(console.error("Cannot find card ".concat(e)),[t[0],t]):[n,t.map((function(t){return I(e,t)})).filter((function(e){return void 0!==e}))]}(e,n.cards),i=Object(d.a)(o,2),r=i[0],c=i[1];return t(r),pe({},n,{cards:c})}))},addCard:function(e){a((function(t){return pe({},t,{cards:[].concat(Object(l.a)(t.cards),[e])})}))}}),c.cards.map((function(e){return r.a.createElement(oe,{key:e.instanceid,cardData:e,allCards:c.cards,onDrop:function(e,t){return a((function(n){return pe({},n,{cards:P(n.cards,e,t)})}))},onLift:function(e){return a((function(t){return pe({},t,{cards:z(t.cards,e)})}))},onSetCoords:function(e,t,n){a((function(o){var i=function(e,t){var n=t.map((function(t){return x(e,t)})).find((function(e){return void 0!==e}));if(void 0!==n)return n;console.error("Cannot find card ".concat(e))}(n,o.cards);return pe({},o,{cards:i.isTemplate?[].concat(Object(l.a)(fe(e,t,n,o.cards)),[C(i.name,i.coords.x,i.coords.y,i.type,!0)]):fe(e,t,n,o.cards)})}))},isUnrelated:D})})),r.a.createElement("div",{style:{bottom:50,position:"fixed",width:"100%",backgroundColor:"rgba(255,255,255,0.5)",zIndex:0,height:115+2*ee}}),r.a.createElement("button",{style:{position:"absolute",bottom:0,left:0},onClick:function(){return window.location.reload()}},"reset"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[19,1,2]]]);
//# sourceMappingURL=main.976fe6cf.chunk.js.map