/*
*      Copyright (c) 2015 Chi Hoang 
*      All rights reserved
*/

function List() {
  this.observerList = [];
  return this;
}
 
List.prototype = {
  add : function( obj ){
    return this.observerList.push( obj );
  },
  count : function() {
    return this.observerList.length;
  },
  get : function( index ){
    if( index > -1 && index < this.observerList.length ){
      return this.observerList[ index ];
    }
  },
  indexOf : function( obj, startIndex ){
    var i = startIndex;
      while( i < this.observerList.length ){
       if( this.observerList[i] === obj ){
         return i;
       }
       i++;
     }
     return -1;
  },
  removeAt : function( index ){
    this.observerList.splice( index, 1 );
  }
};
 
var Side = function (x1,y1,x2,y2) {
  this.x1=x1;
  this.y1=y1;
  this.x2=x2;
  this.y2=y2;
}

Side.prototype = {
  taxicabd : function () {
    return Math.abs(this.x1-this.x2)+Math.abs(this.y1-this.y2);
  },
  inside : function (maxx,maxy) {
    return this.x1>0 && this.y1>0 && this.x2>0 && this.y2>0 && this.x1<maxx && this.x2<maxx && this.y1<maxy && this.y2<maxy;
  },
  xeq : function () {
    if (this.x1==this.x2) return true;
    return false;
  },
  yeq : function () {
    if (this.y1==this.y2) return true;
    return false;
  },
  yccw : function () {
    if (this.y1<this.y2) return true;
    return false;
  },
  ycw : function () {
    if (this.y1>this.y2) return true;
    return false;
  },
  xccw : function () {
    if (this.x1<this.x2) return true;
    return false;
  },
  xcw : function () {
    if (this.x1>this.x2) return true;
    return false;
  }
}

var Block = function() {
  this.left=0;
  this.top=0;
  this.right=0;
  this.bottom=0;
  return this;
}

Block.prototype = {
  isClosed : function () {
    return this.left && this.top && this.right && this.bottom;
  }
}

var Element = function (x,y,name,width,height,paddingleft) {
  this.paddingleft = (paddingleft===0) ? "0px" : paddingleft;
  this.width = width || "18px";
  this.height = height || "20px";
  this.x = (x===0) ? 0 : x;
  this.y = (y===0) ? 0 : y;
  this.name = name || "nl";
  this.ele = document.createElement("div");
  this.ele.id = this.name+this.x+this.y;
  this.checked=false;
  return this;
}

Element.prototype = {
  update : function () {
    this.checked=true;
  },
  uncheck : function () {
    this.checked=false;
  },
  check : function (id,player,table,board) {
    var a = id.split("");
    var b = this.ele.id.split("");
    a = new Side(a[1],a[2],b[1],b[2]);
    var color = (player===0) ? "red.gif" : color="blue.gif";
    var maxx=board.x-1;
    var maxy=board.y-1;
    var d = a.taxicabd();
    if (d==1) {
      if (a.xeq() && a.yccw()) {
        var i=window.document.getElementById("_ve"+a.y1+a.x2);
        i.src=color;
        if (a.inside(maxx,maxy)) {
          table[a.y1][a.x1-1].right=true;
          table[a.y1][a.x1].left=true;
          var left=table[a.y1][a.x1-1].isClosed();
          var right=table[a.y1][a.x1].isClosed();   
        } else if (a.x1==0 || a.x2==0) {
          table[a.y1][a.x1].left=true;
          var left=table[a.y1][a.x1].isClosed();
        } else if ((a.x1==maxx && a.y1==0) || (a.x2==maxx && a.y2==0)) {
          table[0][a.x1-1].right=true;
          var right=table[0][a.x1-1].isClosed();
        } else if (a.x1==maxx || a.x2==maxx) {
          table[a.y1][a.x1-1].right=true;
          var right=table[a.y1][a.x1-1].isClosed();
        } else if (a.y1==0 || a.y2==0) {
          table[0][a.x1-1].right=true;
          table[0][a.x1].left=true;
          var right=table[0][a.x1-1].isClosed();
          var left=table[0][a.x1].isClosed();
        } else if (a.y1==maxy || a.y2==maxy) {
          table[a.y1][a.x2-1].right=true;
          table[a.y1][a.x2].left=true;
          var right=table[a.y1][a.x2-1].isClosed();
          var left=table[a.y1][a.x2].isClosed();
        }
      } else if (a.xeq() && a.ycw()) {
        var i=window.document.getElementById("_ve"+a.y2+a.x1);
        i.src=color;
        if (a.inside(maxx,maxy)) {
          table[a.y2][a.x1-1].right=true;
          table[a.y2][a.x1].left=true;
          var right=table[a.y2][a.x1-1].isClosed();
          var left=table[a.y2][a.x1].isClosed();
        } else if (a.x1==0 || a.x2==0) {
          table[a.y2][a.x1].left=true;
          var left=table[a.y2][a.x1].isClosed();
        } else if (a.x1==maxy && a.y1==maxx|| a.x2==maxy && a.y2==maxx) {
          table[a.y2][a.x1-1].right=true;
          var left=table[a.y2][a.x1-1].isClosed();
        } else if ((a.x1==maxx && a.y1==0) || (a.x2==maxx && a.y2==0)) {
          table[0][a.x1-1].right=true;
          var right=table[0][a.x1-1].isClosed();
        } else if (a.y1==0 || a.y2==0) {
          table[0][a.x1].left=true;
          table[0][a.x1-1].right=true;
          var left=table[0][a.x1].isClosed();
          var right=table[0][a.x1-1].isClosed();
        } else if (a.x1==maxy || a.x2==maxy) {
          table[a.y2][a.x1-1].right=true;
          var left=table[a.y2][a.x1-1].isClosed();
        } else if (a.x1==maxx || a.x2==maxx) {
          table[a.y2][a.x1-1].right=true;
          var right=table[a.y2][a.x1-1].isClosed();
        } else if (a.y1==maxy || a.y2==maxy) {
          table[a.y2][a.x1-1].right=true;
          table[a.y2][a.x1].left=true;
          var left=table[a.y2][a.x1-1].isClosed();
          var right=table[a.y2][a.x1].isClosed();
        }
      } else if (a.yeq() && a.xccw()) {
        var i=window.document.getElementById("_he"+a.y1+a.x1);
        i.src=color;
        if (a.inside) {
          table[a.y1-1][a.x1].bottom=true;
          table[a.y1][a.x1].top=true;
          var left=table[a.y1-1][a.x1].isClosed();
          var right=table[a.y1][a.x1].isClosed();
        } else if ((a.x1==0 && a.y1==0) || (a.x2==0 && a.y2==0)) {
          table[a.y1][a.x1].top=true;
          var left=table[a.y1][a.x1].isClosed();
        } else if (a.y1==maxy && a.y2==maxy) {
          table[a.y1-1][a.x1].bottom=true;
          var right=table[a.y1-1][a.x1].isClosed();
        } else if (a.x1==0 && a.y2==maxy) {
          table[a.y2-1][a.x1].bottom=true;
          var right=table[a.y2-1][a.x1].isClosed();
        } else if (a.x1==0 || a.x2==0) {
          table[a.x2][a.x1].top=true;
          table[a.x2-1][a.x1].bottom=true;
          var left=table[a.x2][a.x1].isClosed();
          var right=table[a.x2-1][a.x1].isClosed();
        } else if ((a.x1==maxx && a.y1==0) || (a.x2==maxx && a.y2==0)) {
          table[a.y1][a.x2-1].top=true;
          var left=table[a.y1][a.x2-1].isClosed();
        } else if (a.x1==maxx && a.y1==maxy || a.x2==maxx && a.y2==maxy) {
          table[a.y1-1][a.x1].bottom=true;
          var right=table[a.y1-1][a.x1].isClosed();  
        } else if (a.x1==maxx || a.x2==maxx) {
          table[a.y1-1][a.x1].bottom=true;
          table[a.y1][a.x1].top=true;
          var left=table[a.y1][a.x1].isClosed();
          var right=table[a.y1-1][a.x1].isClosed();
        } else if (a.y1==0 || a.y2==0) {
          table[a.y1][a.x1].top=true;
          var left=table[a.y1][a.x1].isClosed();
        }
      } else if (a.yeq() && a.xcw()) {
        var i=window.document.getElementById("_he"+a.y1+a.x2);
        i.src=color;
        if (a.inside(maxx,maxy)) {
          table[a.y1-1][a.x2].bottom=true;
          table[a.y1][a.x2].top=true;
          var left=table[a.y1-1][a.x2].isClosed();
          var right=table[a.y1][a.x2].isClosed();
        } else if ((a.x1==0 && a.y1==0) || (a.x2==0 && a.y2==0)) {
          table[a.y1][a.x2].top=true;
          var left=table[a.y1][a.x2].isClosed();
        } else if (a.x1==maxx && a.y1==maxy || a.x2==maxx && a.y2==maxy) {
          table[a.y1-1][a.x2].bottom=true;
          var right=table[a.y1-1][a.x2].isClosed();  
        } else if (a.y1==maxy && a.y2==maxy) {
          table[a.y2-1][a.x2].bottom=true;
          var right=table[a.y2-1][a.x2].isClosed();  
        } else if (a.x1==0 || a.x2==0) {
          table[a.y1][a.x2].top=true;
          table[a.y1-1][a.x2].bottom=true;
          var left=table[a.y1][a.x2].isClosed();
          var right=table[a.y1-1][a.y2].isClosed();
        } else if ((a.x1==maxx && a.y1==maxy) || (a.x2==maxx && a.y2==maxy)) {
          table[a.y1][a.x2].top=true;
          var left=table[a.y1][a.x2].isClosed();
        } else if ((a.x1==maxx && a.y1==0) || (a.x2==maxx && a.y2==0)) {
          table[a.y1][a.x1-1].top=true;
          var left=table[a.y1][a.x1-1].isClosed();
        } else if (a.x1==maxx || a.x2==maxx) {
          table[a.y1][a.x2].top=true;
          table[a.y1-1][a.x2].bottom=true;
          var left=table[a.y1][a.x2].isClosed();
          var right=table[a.y1-1][a.x2].isClosed();
        } else if (a.y1==0 || a.y2==0) {
          table[a.y1][a.x2].top=true;
          var left=table[a.y1][a.x2].isClosed();
        }
      }
      if (left || right) {
        alert ("closed");
      }
      window.document.getElementById("_"+id).checked=false;
      this.checked=false;
      window.document.getElementById("_"+this.ele.id).checked=false;
      return true;
    } else if (d>1) {
      //window.document.getElementById("_"+id).checked=false;
      this.checked=false;
      window.document.getElementById("_"+this.ele.id).checked=false;
      return false;
    }
  }
}

var Board = function (x,y,observers)
{
  this.x=x;
  this.y=y;
  this.table = [];
  this.observers = observers;
  this.Create(this.x,this.y);
  this.player=2;
  return this;
}

Board.prototype = {
  AddDot : function(dot) {
    window.document.body.appendChild(dot.ele);
    window.document.getElementById(dot.ele.id).style.width=dot.width;
    window.document.getElementById(dot.ele.id).style.height=dot.height;
    window.document.getElementById(dot.ele.id).style.cssFloat="left";
    //dot.ele.appendChild(window.document.createTextNode("I have "+box.timer+" seconds left"));
    var b=window.document.createElement("input");
    b.type = "radio";
    b.name = "_"+dot.ele.id;
    b.value = dot.ele.id;
    b.id = "_"+dot.ele.id;
    b.onclick = function() { _this.Notify(dot.ele.id); };
    dot.ele.appendChild(b);
    var _this=this;
    this.observers.add(dot);
  },
  AddBlock : function(block) {
    window.document.body.appendChild(block.ele);
    window.document.getElementById(block.ele.id).style.width=block.width;
    window.document.getElementById(block.ele.id).style.height=block.height;
    window.document.getElementById(block.ele.id).style.cssFloat="left";
    var b=window.document.createElement("img");
    b.src="clear.gif";
    b.width=block.width;
    b.height=block.height;
    b.name = "_"+block.ele.id;
    b.value = block.ele.id;
    b.id = "_"+block.ele.id;
    block.ele.appendChild(b);
    this.table[block.x][block.y]=new Block();
   },
  AddNewline : function (space) {
    window.document.body.appendChild(space.ele);
    window.document.getElementById(space.ele.id).style.clear="both";
  },
  AddHEdge : function (edge) {
    window.document.body.appendChild(edge.ele);
    window.document.getElementById(edge.ele.id).style.width=edge.width;
    window.document.getElementById(edge.ele.id).style.height=edge.height;
    window.document.getElementById(edge.ele.id).style.cssFloat="left";
    var b=window.document.createElement("img");
    b.src="clear.gif";
    b.width=edge.width;
    b.height=edge.height;
    b.name = "_"+edge.ele.id;
    b.value = edge.ele.id;
    b.id = "_"+edge.ele.id;
    edge.ele.appendChild(b);
  },
  AddVEdge : function (edge) {
    window.document.body.appendChild(edge.ele);
    window.document.getElementById(edge.ele.id).style.width=edge.width+edge.paddingleft;
    window.document.getElementById(edge.ele.id).style.height=edge.height;
    window.document.getElementById(edge.ele.id).style.cssFloat="left";
    window.document.getElementById(edge.ele.id).style.textAlign="right";
    window.document.getElementById(edge.ele.id).style.display="inline";
    var b=window.document.createElement("img");
    b.src="clear.gif";
    b.width=edge.width;
    b.height=edge.height;
    b.name = "_"+edge.ele.id;
    b.value = edge.ele.id;
    b.id = "_"+edge.ele.id;
    b.style.textAlign = "right";
    b.style.display = "inline";
    edge.ele.appendChild(b);
  },
  RemoveDot : function(observer) {
    this.observers.removeAt(this.observers.indexOf(observer,0));
    return this.observers.count();
  },
  Notify : function(id){
    var observerCount = this.observers.count();
    for(var i=0; i < observerCount; i++){
      if (this.observers.get(i).checked==true)
      {
        var player = this.player % 2;
        var a=this.observers.get(i).check(id,player,this.table,this);
        if (a==true) {
          this.player++;
          for(var i=0; i < observerCount; i++){
            if (this.observers.get(i).ele.id==id) {
              this.observers.get(i).uncheck();
            }
          }
        }
      } else if (this.observers.get(i).ele.id==id) {
        this.observers.get(i).update();  
      }
    }
  },
  Create : function(x,y) {
    for (i=0,j=0,endy=(y-1),endx=(x-1);i<endy;i++) {
      this.table[i] = new Array(endx);
    }
    for (i=0,j=0;i<y;i++) {
      for (j=0;j<x;j++) {
        this.AddDot(new Element(j,i,"d"));
        if (j<endx) {    
          this.AddHEdge(new Element(i,j,"he",25,5));
        }
      }
      this.AddNewline(new Element(i,j));
      if (i<endy) {
        for (j=0;j<x;j++) {
          if (j==0) {
            this.AddVEdge(new Element(i,j,"ve",5,25,7));
          } else {
            this.AddVEdge(new Element(i,j,"ve",5,25));
          }
          if (j<endx) {    
            this.AddBlock(new Element(i,j,"b",40,25));
          }
        }
        this.AddNewline(new Element(i+1,j+1));
      }
    }
  }
}

var test3 = function () {
 var cd = new Board(5,5,new List());
}
var a = new test3();