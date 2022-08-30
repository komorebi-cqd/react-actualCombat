import mockjs from 'mockjs';

mockjs.Random.extend({
  education: function () {
    const educationList = ['无学历', '中专', '大专', '本科', '研究生', '博士'];
    return this.pick(educationList);
  },
  department: function () {
    const departmentList = [
      '研发部',
      '测试部',
      '运营部',
      '',
      '商务部',
      '技术部',
    ];
    return this.pick(departmentList);
  },
  constellation: function () {
    const constellationList = ['天蝎座', '金牛座', '处女座'];
    return this.pick(constellationList);
  },
});

export default {
  'GET /api/analyzeStaff': {
    code: 0,
    data: mockjs.mock({
      'total|20-100': 0,
      educationList: [
        {
          name: '无学历',
          'value|0-10': 0,
        },
        {
          name: '中专',
          'value|0-10': 0,
        },
        {
          name: '大专',
          'value|0-10': 0,
        },
        {
          name: '本科',
          'value|0-10': 0,
        },
        {
          name: '研究生',
          'value|0-10': 0,
        },
        {
          name: '博士',
          'value|0-10': 0,
        },
      ],
      onboardingTimeData: {
        'one|0-30': 0,
        'two|0-30': 0,
        'three|0-30': 0,
      },
      genderList: [
        {
          name: '男', // 性别
          value: 7, // 男性的总人数
          age: '30.29', // 所占的百分比
        },
        {
          name: '女',
          value: 10,
          age: '31.70',
        },
      ],
      marriageList: [
        {
          name: '未婚',
          value: 0,
        },
        {
          name: '已婚',
          value: 17,
        },
      ],
      ageMap: {
        'xData|12': [() => mockjs.Random.integer(20, 50)],
        'yData|12': [() => mockjs.Random.integer(1, 5)],
      },
      'wordingYearsMaps|10-15': [
        {
          userName: '@cname',
          department: '@department',
        },
      ],
      'constellationList|3': [
        // 星座列表  name 表示星座， value 表示人数
        {
          'value|1-6': 1,
          name: '@constellation',
        },
      ],
      departmentList: {
        'xData|6': [() => mockjs.Random.integer(0, 3)],
        yData: ['研发部', '测试部', '客服部', '技术部', '运营部', '大客户部'],
      },
    }),
    msg: '',
  },
};
