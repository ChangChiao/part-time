export const PRD_URL = 'https://task-board-backend.vercel.app';
export const DEV_URL = 'http://localhost:3008';
export const BACKEND_URL =
  process.env.NODE_ENV === 'development' ? `${DEV_URL}` : `${PRD_URL}`;
export const BASE_URL =
  process.env.NODE_ENV === 'development' ? `${DEV_URL}/v1` : `${PRD_URL}/v1`;
export const PAY_URL = 'https://ccore.spgateway.com/MPG/mpg_gateway';
// export const BASE_URL = "http://localhost:3008/v1";
export const MENU = [
  { id: 'create', text: '我發的任務', link: '/createTask' },
  { id: 'accept', text: '我接的任務', link: '/acceptedTask' },
  { id: 'favorite', text: '收藏清單', link: '/favorite' },
  { id: 'chat', text: '聊天紀錄', link: '/chatRecord' },
  { id: 'vip', text: '成為vip', link: '/' },
  // { id: 'signIn', text: '登入', link: '/' },
];

export const TASK_STATUS = {
  '0': '進行中',
  '1': '已結束',
  '2': '已過期',
};

export const CITY_LIST = [
  { label: '臺北市', value: 'Taipei' },
  { label: '新北市', value: 'NewTaipei' },
  { label: '桃園市', value: 'Taoyuan' },
  { label: '臺中市', value: 'Taichung' },
  { label: '臺南市', value: 'Tainan' },
  { label: '高雄市', value: 'Kaohsiung' },
  { label: '基隆市', value: 'Keelung' },
  { label: '新竹市', value: 'Hsinchu' },
  { label: '新竹縣', value: 'HsinchuCounty' },
  { label: '苗栗縣', value: 'MiaoliCounty' },
  { label: '彰化縣', value: 'ChanghuaCounty' },
  { label: '南投縣', value: 'NantouCounty' },
  { label: '雲林縣', value: 'YunlinCounty' },
  { label: '嘉義縣', value: 'ChiayiCounty' },
  { label: '嘉義市', value: 'Chiayi' },
  { label: '屏東縣', value: 'PingtungCounty' },
  { label: '宜蘭縣', value: 'YilanCounty' },
  { label: '花蓮縣', value: 'HualienCounty' },
  { label: '臺東縣', value: 'TaitungCounty' },
  { label: '金門縣', value: 'KinmenCounty' },
  { label: '澎湖縣', value: 'PenghuCounty' },
  { label: '連江縣', value: 'LienchiangCounty' },
];
