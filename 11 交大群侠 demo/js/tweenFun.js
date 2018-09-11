var T = {
  pi:Math.PI,
  sin:Math.sin,
  abs:Math.abs,
  //x轴缩放
  xMod(fun,n){
    return function(t){
      return fun(t/n);
    }
  },
    //y轴缩放
  yMod(fun,n,s){
    return function(x){
      return n*fun(x)+s;
    }
  },
  //xy轴同时缩放
  xyMod(fun,m,n,s){
    n = n || 1
    m = m || 1
    s = s || 0
    return this.yMod(this.xMod(fun,m),n,s);
  },

  //创建一个闭包
  createSteps(fun,max,loop){
    var loop = loop || false; //false表示只运行一次，true表示无限循环
    var count = 0;
    
    return {
      perAdd:function(t){
        count += t;
        if(count<=max){
          return fun(count);
        }else{
          if(loop){
            yushu = count%max;
            if(yushu==0){
              return fun(max);
            }else{
              return fun(count%max);
            }
          }else{
            return fun(max);
          }
        }
      }
    }

  }
}




