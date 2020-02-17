/* eslint camelcase: 1  */
(function (require, model) {
  model = model || {};
  var exports = {};
  var List = [], tableList = [], tableUList = [], count = 15;
  Mock.Random.increment(1000);
  var str = '', f = '', fid = '',
  fdID = Mock.mock('@id'),
  fields = ['title', 'type', 'status', 'author', 'tel', 'time', 'label', 'top', 'content'],
  fieldsName = {
    'title': '信息标题', 
    'type': '类型', 
    'status': '状态', 
    'author': '作者', 
    'tel': '联系人电话', 
    'time': '发布时间', 
    'label': '所属标签', 
    'top': '是否置顶', 
    'content': '内容'
  },
  formData = Mock.mock({
    'id': fdID,
    'title': '@ctitle',
    'type': ['CN', 'US'],
    'status|1': ['01', '02', '03'],
    'author': '@cname',
    'tel': '@natural',
    'time': '@time',
    'label': ['CN', 'US'],
    'top|1': ['01', '02'],
    'content': '@ctitle(10,200)'
  });
  for (var i = 0; i < count; i++) {
    str = Mock.mock('@ctitle(8, 15)');
    f = Mock.mock({'mFieldNm|1': fields})['mFieldNm'];
    fid = Mock.mock('@guid');
    tableList.push(Mock.mock({
      'id': fid,
      'title': '@ctitle',
      'type|1': ['CN', 'US'],
      'status|1': ['01', '02', '03'],
      'author': '@cname',
      'tel': '@natural',
      'time': '@time',
      'label|1': ['CN', 'US'],
      'top|1': ['01', '02'],
      'content': '@ctitle(10,200)'
    }));
    tableUList.push(Mock.mock({
      'pkvalue': fid,
      'usrId': '@increment(2)',
      'mNewDispV': '@ctitle(8, 15)',
      'orgName': '@ctitle(8, 15)',
      'wfsign': '@ctitle(8, 15)',
      'wfname': '@ctitle(8, 15)',
      'applType': '@ctitle(8, 15)',
      'orgCode': '@ctitle(8, 15)',
      'remark': '@ctitle(8, 15)',
      'mFieldId': f,
      'mOldDispV': '@ctitle(8, 15)',
      'mPkV': 'WfiWorkflowOrgGroupWfiWorkflowOrgForm' + fid,
      seqid: '@increment(2)',
      mFieldNm: fieldsName[f],
      mDatetime: '@date'
    }));
  }

  function paramUrl2Obj(url) {
    var search = url.split('?')[1];
    if (!search) {
      return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\n/g, '\\n') + '"}');
  }
  function paramBody2Obj (body) {
    if (!body) {
      return {};
    }
    return JSON.parse(body);
  }
  exports.getFormData = function () {
    return formData;
  }
  exports.getList = function () {
    return {
      total: List.length,
      data: List
    };
  };
  exports.getListWithPage = function (config) {
    var reqData = paramUrl2Obj(config.url);
    var page = reqData.page;
    var size = reqData.size;
    var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
    var isMPkV = false;
    var mockList = List.filter(function (item) {
      for(var k in condition){
        if(item[k]){
          if (k === 'mPkV'){
            isMPkV = false;
            for(var i=0,l=condition[k].length;i<l;i++){
              if(item[k] === condition[k][i]){
                isMPkV = true;
                break;
              }
            }
           if(!isMPkV) return false;
          } else if(condition[k] !== item[k]) {
            return false;
          }
        }
      }
      return true;
    });
    var pageList = [];
    if (page && size) {
      pageList = mockList.filter(function (item, index) {
        return index < size * page && index >= size * (page - 1);
      });
    } else {
      pageList = mockList;
    }
    return {
      total: mockList.length,
      data: pageList
    };
  };
  exports.saveUtrace = function(config){
    var data = paramBody2Obj(config.body);
    // 添加时间
    var mDatetime = JSON.parse( JSON.stringify({'mDatetime': new Date()}))['mDatetime'];
    data.forEach(function(item){
      item['mDatetime'] = mDatetime;
    });
    List = List.concat(data);
    return {
      msg:'操作成功'
    };
  };
  exports.getTableData = function(config) {
    var reqData = paramUrl2Obj(config.url);
    var page = reqData.page;
    var size = reqData.size;
    var pageList = [];
    if (page && size) {
      pageList = tableList.filter(function (item, index) {
        return index < size * page && index >= size * (page - 1);
      });
    } else {
      pageList = tableList;
    }
    return {
      total: tableList.length,
      data: pageList
    };
  }
  exports.getListTable = function (config) {
    var reqData = paramUrl2Obj(config.url);
    var page = reqData.page;
    var size = reqData.size;
    return {
      total: tableUList.length,
      data: tableUList
    };
  };
  exports.getListWithPageTable = function (config) {
    var reqData = paramUrl2Obj(config.url);
    var page = reqData.page;
    var size = reqData.size;
    var condition = reqData.condition ? JSON.parse(reqData.condition) : {};
    var isMPkV = false;
    var mockList = tableUList.filter(function (item) {
      for(var k in condition){
        if(item[k]){
          if (k === 'mPkV'){
            isMPkV = false;
            for(var i=0,l=condition[k].length;i<l;i++){
              if(item[k] === condition[k][i]){
                isMPkV = true;
                break;
              }
            }
           if(!isMPkV) return false;
          } else if(condition[k] !== item[k]) {
            return false;
          }
        }
      }
      return true;
    });
    var pageList = [];
    if (page && size) {
      pageList = mockList.filter(function (item, index) {
        return index < size * page && index >= size * (page - 1);
      });
    } else {
      pageList = mockList;
    }
    return {
      total: mockList.length,
      data: pageList
    };
  };
  model['uData'] = exports;
})(window, yufp.mock);

