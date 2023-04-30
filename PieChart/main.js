import { PieChartBuilder } from "./PieChart.js";

const dataList = {};
dataList.arrearsStats = [
    { "positive": 75, "negative": 25 },
    { "positive": 50, "negative": 50 },
    { "positive": 68.58, "negative": 31.42 },
    { "positive": 90, "negative": 10 },
    { "positive": 100, "negative": 0 },
    { "positive": 30, "negative": 70 },
];

/* 01. 데이터 가공 */
const dataPieList = dataList.arrearsStats.map(item => {
    const result = [];
    result.push({
        title: "positive",
        value: item["positive"]
    });
    result.push({
        title: "negative",
        value: item["negative"]
    });
    return result;
});

/* 그라디언트 */
const gd = [
    ["#1a759f", "#1e6091"],
    ["#ba181b", "#a4161a"],
];

/* 그리기 */
dataPieList.forEach(dataPie => {
    const $cv = new PieChartBuilder()
        .set_data_pie(dataPie)
        .set_gradient(gd)
        .init();
    document.body.appendChild($cv);
});