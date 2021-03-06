import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill()
import { getCookie } from '../tool/Util'
import { Toast } from 'antd-mobile'
  
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
            mode: 'cors', 
            headers:{
                token: getCookie('userToken'),
                Accept: 'application/json;charset=UTF-8',
                clientId: 'XXD_FRONT_END',
                clientTime: new Date().getTime()
            },
            // credentials: 'include'  
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
export function postFetch(url, params, type){  
    var typeStyle = type ? type : 'POST'
    return new Promise((resolve, reject)=> {
        fetch(url, {  
            method : typeStyle,  
            mode: 'cors', 
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            // credentials: 'include',
            body : JSON.stringify(params)  
        }).then(function(res){  
            if(res.ok){  
                res.json().then(function(data){  
                    resolve(data);  
                })  
            }else{  
                res.json().then(function(data){
                    if(data.error_msg){
                        Toast.info(data.error_msg, 2);
                    }
                    console.log('请求失败1')
                    reject(); 
                })
            }  
        }, function(e){  
            console.log('请求失败2');  
            reject();  
        }) 
    })
}  