import * as echarts from 'echarts';

export default () => {
  // echarts bar
  const bar = echarts.init(document.getElementById('statas') as HTMLElement);
  const barOption = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [
        ['product', 'PV', 'UV'],
        ['1月', 543, 333],
        ['2月', 643, 433],
        ['3月', 743, 533],
        ['4月', 243, 133],
        ['5月', 343, 233],
        ['6月', 243, 33],
        ['7月', 763, 433],
        ['8月', 293, 133],
        ['9月', 143, 63],
        ['10月', 543, 333],
        ['11月', 263, 133],
        ['12月', 43, 3],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      {
        type: 'bar',
      },
      {
        type: 'bar',
      },
    ],
  };
  bar.setOption(barOption);
  // echarts pie
  const pie = echarts.init(document.getElementById('pie') as HTMLElement);
  const pieoption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {},
    color: ['#ffd666', '#ffa39e', '#409EFF', '#69cbc2', '#d3adf7'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 1048, name: 'baidu' },
          { value: 735, name: 'google' },
          { value: 580, name: 'yahoo' },
          { value: 484, name: 'gougou' },
          { value: 300, name: 'others' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  pie.setOption(pieoption);
};
