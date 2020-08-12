define(['jquery'],function($){
    function addCartStorage(data,cbFn){

        var key = 'cart';
        var goodsId = data.goodsId;
        var goodsColor = data.goodsColor;
        var cartData = JSON.parse(getStorage(key))||[];
        var flag = true;
        var index = -1;
        for(var i=0;i<cartData.length;i++){
            if(cartData[i].goodsId == goodsId && cartData[i].goodsColor == goodsColor){
                flag = false;
                index = i;
            }
        }
        if(flag){
            cartData.push(data);
            setStorage(key,JSON.stringify(cartData));
        }
        else{
            cartData[index].goodsNumber += data.goodsNumber;
            setStorage(key,JSON.stringify(cartData));
        }
        if(cbFn){
            cbFn();
        }
    }
    function setStorage(key,value){
        window.localStorage.setItem(key,value);
    }
    function getStorage(key){
        return window.localStorage.getItem(key);
    }

    return {
        addCartStorage,
        setStorage,
        getStorage
    }
})