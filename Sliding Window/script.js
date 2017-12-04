//Name : Puneet Saluja
//Id : 2015KUCP1019
var c=0;
var d=0;
var size=1;
var initial;
var run=0;
var time1=200;
var extra=0;

var sent = new Array(15);
var receive = new Array(15);
var create = new Array(15);
var clicked = new Array(15);
var timer = new Array(15);
var finish = new Array(15);

function changeSize()
{
  size = document.getElementById('getSize').value;
  initial=document.getElementById('size_s').offsetLeft;
  document.getElementById('size_s').style.width = size*60+'px';
  document.getElementById('size_r').style.width = size*60+'px';
}


function tick1(f,d)
{
  if(d>11)
  {
    d=0;
    return;
  }
  if(create[f]!=1)
  {
    var pos=15+(30+15+15)*(f-1);
    var width = document.getElementsByClassName('box').width;
    var div = document.createElement('div');
    div.className="box1";
    div.id="box1"+f;
    div.style="right:"+pos+"px;top:15px;bottom:15px;position:absolute;"
    document.getElementById('size_s').appendChild(div);
    create[f]=1;
  }
  moveDown(f);
  check(f);
  setTimeout(function(){tick1(f,d+1)},time1/11);
}

function startTimer(duration,k)
{
  timer[k] = parseInt(duration);
  finish[k] = setInterval(function(){
  var para = document.getElementById('h'+k);
    --timer[k];
      para.innerText=''+timer[k];
    if(timer[k]<=0)
    {
      clicked[k]=0;
      document.getElementById('box'+k+'_r').style.top=0+'px';
      tick1(k,0);

      clearInterval(finish[k]);
      startTimer(duration,k);
    }
  },1000);
}



function removeit(k)
{
  document.getElementById('box'+k+'_r').style.top=0+'px';
  clicked[k] = 1;
}

function tick()
{
  c++;
  if(c>11)
  {
    runSim('0');
  }
  var start=1+run;
  var end=start+(size-1);
  while(start<=end)
  {
    if(sent[start]!=1)
    {
    move(start);
    check(start);
    }
    start++;
  }
}


function runSim(state)
{
  initial=document.getElementById('size_s').offsetLeft;
  time1=document.getElementById('getTime').value;


  var s=1;
  var seq=0;
  while(s<=14)
  {
    var pos=75+(30+15+15)*(s-1);
    var para = document.createElement("P");
    var t = document.createTextNode(''+seq%(2*size));
    para.style="left:"+pos+"px;bottom:15px;position:absolute;";
    para.appendChild(t);
    document.getElementById('seq').appendChild(para);
    s++;
    seq++;
  }

  if(state == 1)
  {
      tickInterval = setInterval("tick();",time1/11);
  }
  else {
    clearInterval(tickInterval);
    c=0;
    document.getElementById('box1_r').style.position = 'relative';
  }
}




function sendAck(f,w)
{
  if(f>11)
  {
    f=0;
    return;
  }
  var getWallX = document.getElementById('box'+w+'_r').offsetLeft;
  var getWallY = document.getElementById('box'+w+'_r').offsetTop;
  document.getElementById('box'+w+'_r').style.backgroundColor="gray";
  getWallY = getWallY-20-30;
  document.getElementById('box'+w+'_r').style.top = getWallY+'px';
  check1(w);
  setTimeout(function(){sendAck(f+1,w)},time1/11);
}

function check1(start)
{
    var xpos1=-45;
    var getY = document.getElementById('box'+start+'_r').offsetTop;
    var getY1=  document.getElementById('box1'+start).offsetTop;


    if(getY-getY1<=2 && receive[start]!=1 && sent[start]==1)
    {
      receive[start] = 1;
      var para = document.getElementById('h'+start);
      para.innerText='';
      var d=start;
      var allow=1;
      while(d>=1)
      {
          if(sent[d]!=1)
          {
            allow=0;
            break;
          }
          d--;
      }

      if(allow==1)
      {
            var pos1 = document.getElementById('size_s').offsetLeft;
            document.getElementById('size_s').style.left = pos1+30+15+15+'px';
            var count=0;
            var st=start+1;
            var end=1+run+(size-1);


            while(st<end)
            {
              if(receive[st]==1)
              {
                count++;
              }
              st++;
            }



            while(count!=0 && receive[start+1]==1)
            {
             var pos1 = document.getElementById('size_s').offsetLeft;
             document.getElementById('size_s').style.left = pos1+30+15+15+'px';
             count--;
            }

      }
      document.getElementById('box'+start+'_r').style.backgroundColor='blue';
      run++;
      xpos1=xpos1+30+15+15;
      clearInterval(finish[start]);
      if(run<=14 && run%size==0)
      {
          tickInterval = setInterval("tick();",time1/11);
      }
    }
}

function check(start)
{

    var xpos1=-45;
    var getY = document.getElementById('box'+start+'_r').offsetTop;
    var getY1=  document.getElementById('box'+start+'_s').offsetTop + 420;
    if(getY1-getY<=2 && sent[start]!=1)
    {
        sent[start] = 1;
        var d=start;
        var allow=1;
        while(d>=1)
        {
            if(sent[d]!=1)
            {
              allow=0;
              break;
            }
            d--;
        }
        sendAck(0,start);
        var div = document.getElementById('box'+start+'_s');
        div.setAttribute('style','');
        div.style.backgroundColor="#ff0000";
        if(allow==1)
        {
          var pos1 = document.getElementById('size_r').offsetLeft;
          document.getElementById('size_r').style.left = pos1+30+15+15+'px';
          xpos1=xpos1+30+15+15;
          w=start;

          var count=0;
          var st=start+1;
          var end=1+run+(size-1);

          while(st<end)
          {
            if(sent[st]==1)
            {
              count++;
            }
            st++;
          }

          while(count!=0 && sent[start+1]==1)
          {
          //  alert(count);
           var pos1 = document.getElementById('size_r').offsetLeft;
           document.getElementById('size_r').style.left = pos1+30+15+15+'px';
           count--;
          }
        }



    }
}

function moveDown(start)
{
  if(clicked[start]!=1)
  {
  var getWallX = document.getElementById('box'+start+'_r').offsetLeft;
  var getWallY = document.getElementById('box'+start+'_r').offsetTop;
  getWallY = getWallY+20;
  document.getElementById('box'+start+'_r').style.top = getWallY+'px';
  }
}

function move(start)
{
  if(create[start]!=1)
  {
    startTimer(14,start);
    var pos=15+(30+15+15)*(start-1);
    var width = document.getElementsByClassName('box').width;
    var div = document.createElement('div');
    div.className="box1";
    div.id="box1"+start;
    div.style="right:"+pos+"px;top:15px;bottom:15px;position:absolute;"
    document.getElementById('size_s').appendChild(div);

    var pos=75+(30+15+15)*(start-1);
    var para = document.createElement("h6");
    para.id='h'+start;
    para.innerText = ""+timer[start];
    para.style="left:"+pos+"px;bottom:15px;position:absolute;";
    document.getElementById('timer').appendChild(para);

    create[start]=1;
  }
  if(clicked[start]!=1)
  {
    moveDown(start);
  }

}
