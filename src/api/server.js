define(['jquery'],function($){

    function getBannerData(){
        return $.ajax('/api/mock/banner.json');
    }

    function getGoodsData(type){
        return $.ajax(`/api/mock/${type}.json`)
    }

    function getDetailData(type,id){
        return new Promise((resolve,reject)=>{
            $.ajax(`/api/mock/${type}.json`).then((res)=>{
                for(var i=0;i<res.goods_list.length;i++){
                    if(res.goods_list[i].goodsId == id){
                        resolve(res.goods_list[i]);
                    }
                }
            });
            
        });
    }
    return {
        getBannerData,
        getGoodsData,
        getDetailData
    }

});