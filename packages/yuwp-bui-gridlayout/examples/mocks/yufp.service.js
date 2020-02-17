/**
 * @created by helin3 on 2017-11-25
 * @updated by
 * @description 服务访问组件
 */
(function (yufp, window, factory) {
  var exports = factory(yufp, window, window.document);
  if (typeof define === 'function') {
    define(exports);
  }
  window.yufp.service = exports;
}(yufp, window, function (yufp, window, document) {
  /**
   * 定义Service
   * @constructor
   */
  function Service() {
    this.options = {
      method: 'POST', // 默认POST，支持4种访问类型 GET/POST/PUT/DELETE
      async: true, // 异步请求
      data: {}, // 请求数据
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }, // http请求头
      dataType: 'json', // 默认返回数据类型
      timeout: 90000, // 默认超时时间
      cache: false, // 是否缓存
      needToken: true, // 是否传认证Token值去后台
      callback: false // 回调方法
    };
    this._filters = []; // 过滤器集合
    this.basePath = ''; // 应用名
    this.tokenId = 'Authorization'; // TOKEN 名
    this.tokenVal = ''; // TOKEN 值
    this.storage = yufp.sessionStorage; // 根据debug模式，存储会话值
    this.addServiceFilter();
  }
  Service.prototype.addServiceFilter = function () {
    // 加入请求过滤器
    this.addFilter({
      // 过滤器名称
      name: 'messageParser',
      // 请求前触发
      before: function (event) {
        // 定义请求头
        var headers = {};
        // 定义请求数据
        var reqData = {
          // 请求头
          headers: headers,
          // 请求数据
          data: event.data
        };
        // 保存导出数据
        event.code = 0;
        event.data = reqData;
        // 返回处理标志，true则继续处理，false则中断处理
        return true;
      },

      // 数据返回后触发
      after: function (event) {
        // 只处理JSON对象
        if (yufp.type(event.data) == 'object' && yufp.type(event.data.header) != 'undefined') {
          // 获取响应头
          var rspHeader = event.data.header;
          // 获取响应数据
          var rspData = event.data.data;

          if (yufp.type(rspHeader.code) == 'undefined' || rspHeader.code == 0) {
            // 保存导出数据
            event.code = 0;
            event.message = '';
            event.data = rspData;
            // 返回处理标志，true则继续处理，false则中断处理
            return true;
          } else {
            // 保存导出数据
            event.code = rspHeader.code;
            event.message = rspHeader.msg;
            event.data = rspData;
            // 返回处理标志，true则继续处理，false则中断处理
            return true;
          }
        }

        // 返回处理标志，true则继续处理，false则中断处理
        return true;
      },
      // HTTP请求异常
      exception: function (event) {
        var status = event.xhr.status;
        var flag = true;
        var globalVm = console.log;
        switch (status) {
          case 401:
            var responseUrl = event.requestUrl;
            // 服务平台坑（/api/logout注销会在请求头带token，若token已过期，也会走到此处)
            if (responseUrl.indexOf(yufp.session.settings.logoutUrl) < 0) {
              // 判断非注销服务造成的401，才走此逻辑
              yufp.session.logout(true);
            }
            flag = false;
            break;
          case 403:
            globalVm({
              message: '您无权限访问，请联系系统管理员!',
              type: 'warning'
            });
            flag = false;
            break;
          case 404:
            globalVm({
              message: '系统错误，请联系系统管理员!',
              type: 'error'
            });
            flag = false;
            break;
          default:
            globalVm({
              message: '系统错误，请联系系统管理员!',
              type: 'error'
            });
            flag = false;
            break;
        }
        return flag;
      }
    });
  }

  /**
   * 发送请求
   * @param options
   */
  Service.prototype.request = function (options) {
    var _this = this;
    var _options = yufp.extend({}, _this.options, options);
    _options.url = _this.getUrl(_options);

    var deferred = new yufp.core.Deferred();
    var event = {
      data: _options.data
    };
    // before过滤
    if (_this._doFilter(0, event) === false) {
      event.code = event.code ? event.code : 2;
      deferred.reject(event.code, event.message, event.data);
      if (_options.callback) {
        _options.callback(event.code, event.message, event.data);
      }
      return deferred;
    }
    _options.data = event.data.data;
    _options.headers = yufp.extend({}, event.data.headers || {}, _options.headers);
    _options.type = options.method;
    _options.async = options.async;
    _options.success = function (data, status, xhr) {
      // 定义过滤事件
      var event = { code: 0, message: 'success', data: data };
      // after过滤器
      // 过滤器中断调用处理
      if (_this._doFilter(1, event) === false) {
        var code = event.code ? event.code : 1;
        // 通知调用失败
        deferred.reject(code, event.message, event.data);
        if (_options.callback) {
          _options.callback(code, event.message, event.data);
        }
        return;
      }
      // 通知调用成功
      deferred.resolve(event.code, event.message, event.data);
      if (_options.callback) {
        _options.callback(event.code, event.message, event.data);
      }
    };
    _options.error = function (xhr, status) {
      var msg = xhr.responseText;
      msg = !msg ? status : msg;
      // 定义过滤事件
      var event = { code: 1, message: msg, xhr: xhr, requestUrl: _options.url };
      // exception过滤
      if (_this._doFilter(2, event) === false) {
        // 通知调用失败
        deferred.reject(event.code, event.message, event.data);
        return;
      }

      event.code = event.code ? event.code : 1;
      // 通知调用失败
      deferred.reject(event.code, event.message, event.data);
      // 判断是否存在回调函数
      if (_options.callback) {
        _options.callback(event.code, event.message, event.data);
      }
    };
    yufp.core.ajax(_options);
  };

  /**
   * 获取最终访问的完整URL
   * @param param {url }
   * @returns {string}
   */
  Service.prototype.getUrl = function (param) {
    var paramUrl = param.url || param.name;
    if (!paramUrl) {
      throw new Error('Yufp.service.request: 未设置请求URL');
    }
    var reg = /^(http|https):\/\//;
    // url请求未附带http(s)://前缀，则按yufp.settings.url及ssl添加前缀
    if (!reg.test(paramUrl)) {
      var protocol, prefixUrl = '';
      // yufp.settings.url 非空，即非默认同源模式，计算服务端URL源路径
      if (prefixUrl) {
        protocol = reg.test(prefixUrl) ? '' : yufp.settings.ssl ? 'https://' : 'http://';
        prefixUrl = protocol + prefixUrl;
      }
      paramUrl = ('/' + paramUrl).replace(/^\/\//, '/'); // 添加前缀
      paramUrl = (this.basePath || '') + paramUrl; // 添加basePath
      paramUrl = prefixUrl + paramUrl; // 组合origin
    }
    return paramUrl;
  };

  /**
   * 存储token信息
   * @param {object|string} token 对象
   * { access_token: '', refresh_token: '', expires_in: '' }
   */
  Service.prototype.putToken = function (tokenObj) {
    if (typeof tokenObj == 'object') {
      var currentTime = new Date().getTime(); // 当前时间
      // 记录 access_token 时间（相对于浏览器客户端来说），默认减去1min中
      tokenObj.buildTime = currentTime - 60000; // 单位：毫秒
    }
    this.storage.put('UFP-' + this.tokenId, tokenObj);
  };

  /**
   * 获取token信息，可能会触发refreshToken方法
   * refresh_token无效时，access_token返回空串
   */
  Service.prototype.getToken = function () {
    var _this = this;
    var tokenObj = this.storage.get('UFP-' + this.tokenId) || '';
    var currentTime = new Date().getTime(); // 当前时间
    if (tokenObj.expires_in && (currentTime - tokenObj.buildTime) / 1000 > tokenObj.expires_in) {
      // access_token 已失效，通过refresh_token 同步ajax请求重新获取；
      tokenObj = _this.refreshToken(tokenObj);
      if (tokenObj) {
        _this.putToken(tokenObj);
      }
      return tokenObj ? tokenObj.access_token : '';
    } else {
      // access_token 未失效，正常获取使用
      return tokenObj.access_token;
    }
  };

  /**
   * 移除token信息
   */
  Service.prototype.removeToken = function () {
    this.storage.remove('UFP-' + this.tokenId);
  };

  /**
   * 通过refresh_token，同步ajax请求重新获取相关token信息
   * @param {object|string} token 对象
   * { access_token: '', refresh_token: '', expires_in: '' }
   */
  Service.prototype.refreshToken = function (tokenObj) {
    var returnTokenObj;
    yufp.service.request({
      needToken: false,
      async: false, // 同步请求
      url: backend.uaaService + '/oauth/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Basic d2ViX2FwcDo='
      },
      data: {
        'grant_type': 'refresh_token',
        'refresh_token': tokenObj.refresh_token
      },
      callback: function (code, message, response) {
        if (response && response.access_token) {
          // 刷新相关token请求成功
          returnTokenObj = {
            'access_token': response.access_token,
            'refresh_token': response.refresh_token,
            'expires_in': response.expires_in
          };
        } else {
          // 刷新相关token请求失败, 跳转至登录页
          yufp.session.logout(true);
        }
      }
    });
    return returnTokenObj;
  };

  /**
   * 添加服务请求过滤器
   * @param {*} obj 过滤器对象
   */
  Service.prototype.addFilter = function (obj) {
    if (typeof obj != 'object') {
      yufp.logger.error('filter args must been json object');
      return;
    }
    if (!obj.name) {
      yufp.logger.error('filter args must have name attribute');
      return;
    }
    if (!obj.before || typeof obj.before !== 'function') {
      yufp.logger.error('filter args must have before function');
      return;
    }
    if (!obj.after || typeof obj.after !== 'function') {
      yufp.logger.error('filter args must have after function');
      return;
    }
    if (!obj.exception || typeof obj.exception !== 'function') {
      yufp.logger.error('filter args must have exception function');
      return;
    }
    this._filters.push(obj);
  };

  /**
   * 移除服务请求过滤器
   * @param {*} obj 过滤器对象
   */
  Service.prototype.removeFilter = function (obj) {
    var name = typeof obj == 'string' ? obj : obj.name;
    var i = 0;
    for (; i < this._filters.length; i++) {
      if (name == this._filters[i].name) {
        break;
      }
    }
    if (i < this._filters.length) {
      this._filters.splice(i, 1);
    }
  };

  /**
   * 执行过滤
   * @param {*} type 过滤类型
   * @param {*} event 过滤事件参数
   */
  Service.prototype._doFilter = function (type, event) {
    var fname = 'exception';
    fname = type == 0 ? 'before' : fname;
    fname = type == 1 ? 'after' : fname;
    for (var i = 0; i < this._filters.length; i++) {
      if (!this._filters[i][fname]) {
        continue;
      }
      var res = this._filters[i][fname](event);
      if (res === false) {
        return false;
      }
    }
  };

  return new Service();
}));
