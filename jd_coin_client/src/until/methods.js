
    function toDayArr(arr){
        console.log(arr,'yyyyyyyyyyy')
        let array = [];
        for(let i=0;i<arr.length-1;i++){
            if(arr[i].value[1]!=arr[i+1].value[1]){
                array.push(arr[i])
                // arr.splice(i,1)
            }
        }
        return array;
    }
    export const todayArray = (data) => {
        let newArrTime = [],newArrValue=[];
        let array = toDayArr(data)
        console.log(array,'=============')
        for(let i=0;i<array.length;i++){
            newArrTime.push(array[i].value[0].split(' ')[1])
            newArrValue.push(array[i].value[1])
        }
        return {a:newArrValue,b:newArrTime}
    }