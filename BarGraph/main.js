import { BarGraphBuilder } from "./BarGraph.js";

const {arrearsStats} = await fetch('./../sampleData.json').then(res=>res.json());
console.log(arrearsStats);

const dataBar = arrearsStats.map(item=>{
    const {fiscalYear,AAmt01,TAmt01, AAmt02,TAmt02} = item;
    const obj = {};
    obj.title = fiscalYear;
    obj.list = [];
    const v1 = {
        title : "돈 낸거",
        valuePer : AAmt01,
        valueR : TAmt01
    };
    const v2 = {
        title : "돈 안낸거",
        valuePer :AAmt02,
        valueR : TAmt02
    };

    obj.list.push(v1);
    obj.list.push(v2);

    return obj;
});

console.log(dataBar);

const gd = [
    ["#1a759f", "#1e6091"],
    ["#ba181b", "#a4161a"],
];

const $barGraph = new BarGraphBuilder()
.set_data(dataBar)
.set_gradient(gd)
.init();

document.body.appendChild($barGraph);