// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: (Math.floor(Math.random() * 10) % 4).toString(),
      updatedAt: new Date(),
      createdAt: new Date(),
      progress: Math.ceil(Math.random() * 100),
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

// function getRule(req, res, u) {
//   let realUrl = u;

//   if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
//     realUrl = req.url;
//   }

//   const { current = 1, pageSize = 10 } = req.query;
//   const params = parse(realUrl, true).query;
//   let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);

//   if (params.sorter) {
//     const sorter = JSON.parse(params.sorter);
//     dataSource = dataSource.sort((prev, next) => {
//       let sortNumber = 0;
//       Object.keys(sorter).forEach((key) => {
//         if (sorter[key] === 'descend') {
//           if (prev[key] - next[key] > 0) {
//             sortNumber += -1;
//           } else {
//             sortNumber += 1;
//           }

//           return;
//         }

//         if (prev[key] - next[key] > 0) {
//           sortNumber += 1;
//         } else {
//           sortNumber += -1;
//         }
//       });
//       return sortNumber;
//     });
//   }

//   if (params.filter) {
//     const filter = JSON.parse(params.filter);

//     if (Object.keys(filter).length > 0) {
//       dataSource = dataSource.filter((item) => {
//         return Object.keys(filter).some((key) => {
//           if (!filter[key]) {
//             return true;
//           }

//           if (filter[key].includes(`${item[key]}`)) {
//             return true;
//           }

//           return false;
//         });
//       });
//     }
//   }

//   if (params.name) {
//     dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
//   }

//   let finalPageSize = 10;

//   if (params.pageSize) {
//     finalPageSize = parseInt(`${params.pageSize}`, 10);
//   }

//   const result = {
//     data: dataSource,
//     total: tableListDataSource.length,
//     success: true,
//     pageSize: finalPageSize,
//     current: parseInt(`${params.currentPage}`, 10) || 1,
//   };
//   return res.json(result);
// }

function getAffair(_, res) {
  return res.json({
    data: [
      {
        key: 1,//
        name: '这是一个任务名',//
        start_tiem: '2022-05-03T09:21:32.313Z',
        end_tiem: '2022-05-03T09:21:32.313Z',
        status: 0,
        remarks://
          '这是详细描述，它很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
        file: '这是一个链接',
        user_id: ['2111310333'],
      },
    ],
    total: 100,
    success: true,
    pageSize: 10,
    current: 1,
  });
}

function postAffair(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { name, desc, key } = body;

  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'DELETE':
      // tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      // break;
      return res.json({
        status: 'ok',
        success: true,
      });

    case 'POST':
      // (() => {
      //   const i = Math.ceil(Math.random() * 10000);
      //   const newRule = {
      //     key: tableListDataSource.length,
      //     href: 'https://ant.design',
      //     avatar: [
      //       'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      //       'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      //     ][i % 2],
      //     name,
      //     owner: '曲丽丽',
      //     desc,
      //     callNo: Math.floor(Math.random() * 1000),
      //     status: (Math.floor(Math.random() * 10) % 2).toString(),
      //     updatedAt: new Date(),
      //     createdAt: new Date(),
      //     progress: Math.ceil(Math.random() * 100),
      //   };
      //   tableListDataSource.unshift(newRule);
      //   return res.json(newRule);
      // })();

      // return;

      return res.json({
        status: 'ok',
        success: true,
      });

    case 'PUT':
      // (() => {
      //   let newRule = {};
      //   tableListDataSource = tableListDataSource.map((item) => {
      //     if (item.key === key) {
      //       newRule = { ...item, desc, name };
      //       return { ...item, desc, name };
      //     }

      //     return item;
      //   });
      //   return res.json(newRule);
      // })();

      // return;
      return res.json({
        status: 'ok',
        success: true,
      });

    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  res.json(result);
}

function getSelectItem(req, res) {
  return res.json([
    { label: '朱涵宇', value: '2111310333' },
    { label: '吴宇', value: '2111310320' },
    { label: '叶俊麟', value: '2111310321' },
    { label: '王子洋', value: '2111310322' },
  ]);
}

export default {
  'GET /api/affair': getAffair,
  'GET /api/selectItem': getSelectItem,
  'POST /api/affair': postAffair,
  'DELETE /api/affair': postAffair,
  'PUT /api/affair': postAffair,
};
