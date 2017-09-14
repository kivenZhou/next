import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill();
  
//发送GET请求  
export function getFetch(url, params){  
    var str = '';  
    var gettype=Object.prototype.toString
    if(typeof params === 'object' && params){  
        str += '?';  
        Object.keys(params).forEach(function(val){  
            str += val + '=' + encodeURIComponent(params[val]) + '&'; 
        })  
    }
    return new Promise((resolve, reject)=> {
        fetch(url + str, {  
            method : 'GET',
            headers:{
                token: '',
                Accept: 'application/json;charset=UTF-8',
                clientId: 'XXD_FRONT_END',
                clientTime: new Date().getTime()
            },
            credentials: 'include'  
        }).then(function(res){  
            if(res.ok){  
                res.json().then(function(data){  
                    resolve(data);  
                })  
            }else{  
                console.log('请求失败');  
                reject();  
            }  
        }, function(e){  
            console.log('请求失败');  
            reject();  
        }) 
    })
}  
      
//发送POST请求  
export function postFetch(url, params){  
    var str = ''; 
    if(typeof params === 'object' && params){  
        Object.keys(params).forEach(function(val){  
            str += val + '=' + encodeURIComponent(params[val]) + '&';  
        })  
    } 
    return new Promise((resolve, reject)=> {
        fetch(url, {  
            method : 'POST',  
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            credentials: 'include',
            body : str  
        }).then(function(res){  
            if(res.ok){  
                res.json().then(function(data){  
                    resolve(data);  
                })  
            }else{  
                console.log('请求失败');  
                reject();  
            }  
        }, function(e){  
            console.log('请求失败');  
            reject();  
        }) 
    })
}  
