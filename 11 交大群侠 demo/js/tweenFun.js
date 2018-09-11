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
  yMod(fun,n){
    return function(x){
      return n*fun(x);
    }
  },
  //xy轴同时缩放
  xyMod(fun,m,n){
    return this.yMod(this.xMod(fun,m),n);
  },
  //x轴截取
  xMaxLimit(fun,max){
    var m = Math.abs(max)
    return function(x){
      if(m){
        if(x>m) x=m;
      }
      return fun(x)
    }
  },
  //综合修改
  mod(fun,m,n,max){
    return this.xMaxLimit(this.xyMod(fun,m,n),max)
  }
}






// function xMod(fun,n){
//   return function(x){
//     var restArgs = Array.prototype.slice.call(arguments,1);
//     return fun.call(null,[x/n].concat(restArgs))
//   }
// }



