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
  },
  lineVe : function (x,y) {
    
  },
  lineHe : function (x,y) {
    
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
    //alert(this.ele.id);
    this.checked=true;
  },
  uncheck : function () {
    this.checked=false;
  },
  check : function (id,player,table,board) {
    var a = id.split("");
    var b = this.ele.id.split("");
    var color = (player===0) ? "red.gif" : color="blue.gif";
    var maxx=board.x-1;
    var maxy=board.y-1;
    var taxicabd = Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2]);
    if (taxicabd==1) {
      if (a[1]==b[1] && a[2]<b[2]) {
        var i=window.document.getElementById("_ve"+a[2]+a[1]);
        i.src=color;
        if (a[1]>0 && a[2]>0 && b[1]>0 && b[2]>0 && a[1]<maxx && b[1]<maxx && a[2]<maxy && b[2]<maxy) {
          table[a[2]][a[1]-1].right=true;
          table[a[2]][a[1]].left=true;
          var left=table[a[2]][a[1]-1].isClosed();
          var right=table[a[2]][a[1]].isClosed();   
        } else if (a[1]==0 || b[1]==0) {
          table[a[2]][a[1]].left=true;
          var left=table[a[2]][a[1]].isClosed();
        } else if ((a[1]==maxx && a[2]==0) || (b[1]==maxx && b[2]==0)) {
          table[0][a[1]-1].right=true;
          var right=table[0][a[1]-1].isClosed();
        } else if (a[1]==maxx || b[1]==maxx) {
          table[a[2]][a[1]-1].right=true;
          var right=table[a[2]][a[1]-1].isClosed();
        } else if (a[2]==0 || b[2]==0) {
          table[0][a[1]-1].right=true;
          table[0][a[1]].left=true;
          var right=table[0][a[1]-1].isClosed();
          var left=table[0][a[1]].isClosed();
        } else if (a[2]==maxy || b[2]==maxy) {
          table[a[2]][b[1]-1].right=true;
          table[a[2]][b[1]].left=true;
          var right=table[a[2]][b[1]-1].isClosed();
          var left=table[a[2]][b[1]].isClosed();
        }
      } else if (a[1]==b[1] && a[2]>b[2]) {
        var i=window.document.getElementById("_ve"+b[2]+a[1]);
        i.src=color;
        if (a[1]>0 && a[2]>0 && b[1]>0 && b[2]>0 && a[1]<maxx && b[1]<maxx && a[2]<maxy && b[2]<maxy) {
          table[b[2]][a[1]-1].right=true;
          table[b[2]][a[1]].left=true;
          var right=table[b[2]][a[1]-1].isClosed();
          var left=table[b[2]][a[1]].isClosed();
        } else if (a[1]==0 || b[1]==0) {
          table[b[2]][a[1]].left=true;
          var left=table[b[2]][a[1]].isClosed();
        } else if (a[1]==maxy && a[2]==maxx|| b[1]==maxy && b[2]==maxx) {
          table[b[2]][a[1]-1].right=true;
          var left=table[b[2]][a[1]-1].isClosed();
        } else if ((a[1]==maxx && a[2]==0) || (b[1]==maxx && b[2]==0)) {
          table[0][a[1]-1].right=true;
          var right=table[0][a[1]-1].isClosed();
        } else if (a[2]==0 || b[2]==0) {
          table[0][a[1]].left=true;
          table[0][a[1]-1].right=true;
          var left=table[0][a[1]].isClosed();
          var right=table[0][a[1]-1].isClosed();
        } else if (a[1]==maxy || b[1]==maxy) {
          table[b[2]][a[1]-1].right=true;
          //table[b[2]][a[1]-1].right=true;
          var left=table[b[2]][a[1]-1].isClosed();
          //var left=table[b[2]][a[1]-1].isClosed();
        } else if (a[1]==maxx || b[1]==maxx) {
          table[b[2]][a[1]-1].right=true;
          var right=table[b[2]][a[1]-1].isClosed();
        } else if (a[2]==maxy || b[2]==maxy) {
          table[b[2]][a[1]-1].right=true;
          table[b[2]][a[1]].left=true;
          var left=table[b[2]][a[1]-1].isClosed();
          var right=table[b[2]][a[1]].isClosed();
        }
      } else if (a[2]==b[2] && a[1]<b[1]) {
        var i=window.document.getElementById("_he"+a[2]+a[1]);
        i.src=color;
        if (a[1]>0 && a[2]>0 && b[1]>0 && b[2]>0 && a[1]<maxx && b[1]<maxx && a[2]<maxy && b[2]<maxy) {
          table[a[2]-1][a[1]].bottom=true;
          table[a[2]][a[1]].top=true;
          var left=table[a[2]-1][a[1]].isClosed();
          var right=table[a[2]][a[1]].isClosed();
        } else if ((a[1]==0 && a[2]==0) || (b[1]==0 && b[2]==0)) {
          table[a[2]][a[1]].top=true;
          var left=table[a[2]][a[1]].isClosed();
        } else if (a[2]==maxy && b[2]==maxy) {
          table[a[2]-1][a[1]].bottom=true;
          var right=table[a[2]-1][a[1]].isClosed();
        } else if (a[1]==0 && b[2]==maxy) {
          table[b[2]-1][a[1]].bottom=true;
          var right=table[b[2]-1][a[1]].isClosed();
        } else if (a[1]==0 || b[1]==0) {
          table[b[1]][a[1]].top=true;
          table[b[1]-1][a[1]].bottom=true;
          var left=table[b[1]][a[1]].isClosed();
          var right=table[b[1]-1][a[1]].isClosed();
        } else if ((a[1]==maxx && a[2]==0) || (b[1]==maxx && b[2]==0)) {
          table[a[2]][b[1]-1].top=true;
          var left=table[a[2]][b[1]-1].isClosed();
        } else if (a[1]==maxx && a[2]==maxy || b[1]==maxx && b[2]==maxy) {
          table[a[2]-1][a[1]].bottom=true;
          var right=table[a[2]-1][a[1]].isClosed();  
        } else if (a[1]==maxx || b[1]==maxx) {
          table[a[2]-1][a[1]].bottom=true;
          table[a[2]][a[1]].top=true;
          var left=table[a[2]][a[1]].isClosed();
          var right=table[a[2]-1][a[1]].isClosed();
        } else if (a[2]==0 || b[2]==0) {
          table[a[2]][a[1]].top=true;
          var left=table[a[2]][a[1]].isClosed();
        }
      } else if (a[2]==b[2] && a[1]>b[1]) {
        var i=window.document.getElementById("_he"+a[2]+b[1]);
        i.src=color;
        if (a[1]>0 && a[2]>0 && b[1]>0 && b[2]>0 && a[1]<maxx && b[1]<maxx && a[2]<maxy && b[2]<maxy) {
          table[a[2]-1][b[1]].bottom=true;
          table[a[2]][b[1]].top=true;
          var left=table[a[2]-1][b[1]].isClosed();
          var right=table[a[2]][b[1]].isClosed();
        } else if ((a[1]==0 && a[2]==0) || (b[1]==0 && b[2]==0)) {
          table[a[2]][b[1]].top=true;
          var left=table[a[2]][b[1]].isClosed();
        } else if (a[1]==maxx && a[2]==maxy || b[1]==maxx && b[2]==maxy) {
          table[a[2]-1][b[1]].bottom=true;
          var right=table[a[2]-1][b[1]].isClosed();  
        } else if (a[2]==maxy && b[2]==maxy) {
          table[b[2]-1][b[1]].bottom=true;
          var right=table[b[2]-1][b[1]].isClosed();  
        } else if (a[1]==0 || b[1]==0) {
          table[a[2]][b[1]].top=true;
          table[a[2]-1][b[1]].bottom=true;
          var left=table[a[2]][b[1]].isClosed();
          var right=table[a[2]-1][b[2]].isClosed();
        } else if ((a[1]==maxx && a[2]==maxy) || (b[1]==maxx && b[2]==maxy)) {
          table[a[2]][b[1]].top=true;
          //table[a[2]-1][b[1]].bottom=true;
          var left=table[a[2]][b[1]].isClosed();
          //var right=table[a[2]-1][b[2]].isClosed();
        } else if ((a[1]==maxx && a[2]==0) || (b[1]==maxx && b[2]==0)) {
          table[a[2]][a[1]-1].top=true;
          var left=table[a[2]][a[1]-1].isClosed();
        } else if (a[1]==maxx || b[1]==maxx) {
          table[a[2]][b[1]].top=true;
          table[a[2]-1][b[1]].bottom=true;
          var left=table[a[2]][b[1]].isClosed();
          var right=table[a[2]-1][b[1]].isClosed();
        } else if (a[2]==0 || b[2]==0) {
          table[a[2]][b[1]].top=true;
          var left=table[a[2]][b[1]].isClosed();
        }
      }
      if (left || right) {
        alert ("closed");
      }
      window.document.getElementById("_"+id).checked=false;
      this.checked=false;
      window.document.getElementById("_"+this.ele.id).checked=false;
      return true;
    } else if (taxicabd>1) {
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
    //dot.b=setInterval( function () { _this.Notify(dot.ele.id); },dot.speed);
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
          //this.observers.get(i).uncheck();
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