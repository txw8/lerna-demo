/**
 * @created by kongqf 2019-05-13 由于define方法不存在，导致引入文件有问题，调整文件加载方式
 * @updated by
 * @description Mock模拟入口配置
 */
(function (require, exports) {
  var admq = yufp.mock.admq;
  var system = yufp.mock.system;
  var maintable = yufp.mock.maintable;
  var subtable = yufp.mock.subtable;
  var uData = yufp.mock.uData;

  var registerService = [
    // 小U测试信息
    { url: backend.ncmisAppCommonService + '/trade/example/form', method: 'GET', fn: uData.getFormData }, // 表单数据
    { url: backend.ncmisAppCommonService + '/trade/example/table', method: 'GET', fn: uData.getTableData }, // 表格数据
    { url: backend.ncmisAppCommonService + '/api/utrace/selectSModifyTraceWithPage', method: 'GET', fn: uData.getListWithPage },
    { url: backend.ncmisAppCommonService + '/api/utrace/selectSModifyTrace', method: 'GET', fn: uData.getList },
    { url: backend.ncmisAppCommonService + '/api/utrace/addSModifyTrace', method: 'POST', fn: uData.saveUtrace },
    { url: backend.ncmisAppCommonService + '/api/utrace/tableSelectSModifyTraceWithPage', method: 'GET', fn: uData.getListWithPageTable },
    { url: backend.ncmisAppCommonService + '/api/utrace/tableSelectSModifyTrace', method: 'GET', fn: uData.getListTable },
    { url: backend.adminService + '/api/adminsmlookupitem/weblist', method: 'GET', fn: system.lookupFn },
    // 下述服务是纯模拟演示使用
    { url: '/trade/example/list', method: 'GET', fn: admq.getList },
    { url: '/trade/example/export', method: 'POST', fn: admq.exportExcel },
    { url: '/trade/example/getProgress', method: 'POST', fn: admq.getProgress },
    { url: '/trade/example/save', method: 'POST', fn: admq.save },
    { url: '/trade/example/delete', method: 'POST', fn: admq.deleteData },
    { url: '/trade/example/tree', method: 'GET', fn: admq.getTree },
    { url: '/trade/example/radio', method: 'GET', fn: admq.getRadio },
    { url: '/trade/example/checkbox', method: 'GET', fn: admq.getCheckbox },
    { url: '/trade/example/select', method: 'GET', fn: admq.getSlectList },
    { url: '/trade/example/cascader', method: 'GET', fn: admq.getCascader },
    { url: '/trade/cascader/getChild', method: 'GET', fn: admq.getChild },
    { url: '/trade/example/asynctree', method: 'GET', fn: admq.getTreeAsync },
    { url: backend.appOcaService + '/api/util/getorgtree', method: 'GET', fn: admq.getTreeAsync },
    { url: '/example/template/msform', method: 'GET', fn: maintable.getList },
    { url: '/example/template/subtable', method: 'GET', fn: subtable.subList },
    { url: '/example/log/menu', method: 'POST', fn: admq.setLog },
    { url: '/trade/example/user', method: 'GET', fn: admq.getUser },
    { url: '/trade/example/role', method: 'GET', fn: admq.getOrle },
    { url: '/trade/example/duty', method: 'GET', fn: admq.getDuty },
    { url: '/trade/example/orgtree', method: 'GET', fn: admq.getOrgTree },
    { url: '/trade/example/linkageselect', method: 'GET', fn: admq.queryLinkageSelect }
  ];

  var mock = function (url, method, fn) {
    method = (method && method.toLowerCase()) || 'post';
    var reg = new RegExp(url, '');
    Mock.mock(reg, method, fn);
  };

  Mock.setup({
    timeout: '350-600'
  });

  for (var i = 0; i < registerService.length; i++) {
    var rg = registerService[i];
    mock(rg.url, rg.method, rg.fn);
  }
})(window, yufp.mock);