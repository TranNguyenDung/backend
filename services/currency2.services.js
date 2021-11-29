const axios = require("axios");
const api = "https://api.stdio.vn/mini-apps/rates"
const Currency2Model = require("../models/currency2.model")
const {find, findIndex} = require("lodash");

const updateCurrency2 = async() =>{
    try{
        const resp = await axios.get(api);

        const currencies = await Currency2Model.find().exec();

        for(const currency of resp.data){
            const index = findIndex(currencies,{code: currency.code});
            if(index > -1){
                currency.rate = resp.data[index].rate;
                await currencies[index].save();
            }
            else{
                Currency2Model.create(currency);
            }
        }
    }
    catch(err){
        console.log(err);
    }


    // axios.get(api).then((resp)=>{
    //     console.log(resp.data);

    // }).catch((err)=>{
    //     console.log(err);
    // });
}
module.exports = {
    updateCurrency2
}