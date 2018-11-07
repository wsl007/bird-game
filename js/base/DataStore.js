//变量换成器，方便不同地方使用
export class DataStore {

    static getIntance(){
        if (!DataStore.intance)
            DataStore.intance = new DataStore();
        return DataStore.intance;
    }

    constructor(){
        this.map = new Map();

    }

    put(key,value){
        if (typeof  value === "function"){
            value = new value();
        }
        this.map.set(key,value);
        return this;
    }

    get(key){
        return this.map.get(key);
    }

    destory(){
        for (let value of this.map.values()){
            value = null;
        }
    }
}