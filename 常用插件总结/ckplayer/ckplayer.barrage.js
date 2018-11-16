(function(w, d, ck, $){
	var isOpen = true,
		nTime = -1,
		_loadBarrage = null,
		liveNum = 0,//直播时用来记录已发送过的弹幕的最新编号
		cksarr = parseInt(ckstyle()['cpt_barrage'].split('|')[4])==1 ? isOpen = true : isOpen = false,
		isLive = true,
		settings = {
			"isLive": false,
			"sendUrl": null,
			"sendCallback": null,
			"loadUrl": null,
			"loadCallback": null,
			"parser": null,
			"refreshTime": 3
		};
		w.isOpen = isOpen;
		w.cksarr = cksarr;

	function openOrclose(b){
		if(b){
			/*if(_loadBarrage){
				window.clearInterval(_loadBarrage);
				_loadBarrage = null;
			}*/

			_loadBarrage = window.setInterval(window.loadBarrage, settings.refreshTime * 1000);
		}else{
			if(_loadBarrage){
				window.clearInterval(_loadBarrage);
				_loadBarrage = null;
			}
		}
	}

	function writeBarrage(playerObject, data){
		var dataType = $.type(data);

		if(dataType == "boolean" || dataType == "number" || dataType == "string" || dataType == "date"){
			playerObject.loadBarrage(data.toString());
		}else if(dataType == "array"){
			for(var i = 0; i < data.length; i++){
				playerObject.loadBarrage(data[i]);
			}
		}
	}

	ck.barrage = function(objectId, options){
		var playerObject = CKobject.getObjectById(objectId);

		settings = $.extend(settings, options||{});
		
		window.timeHandler = function(t){
			//openOrclose(true);
		}

		window.barrageShowHandler = function(b){
			if(b){ //如果是关闭的现在需要开启则开始调用弹幕
				window.loadBarrage();
				openOrclose(true);
			}else{
				openOrclose(false);
			}
			isOpen = b;
		}

		window.loadBarrage = function(){
			if(settings.loadUrl){
				$.getJSON(settings.loadUrl, function(response){
					if($.isFunction(settings.loadCallback) == true){
						settings.loadCallback(response);
					}

					writeBarrage(playerObject, $.isFunction(settings.parser) == true ? settings.parser(response) : response);
				});
			}
		}

		window.barrage = function(s){//写弹幕，写完同时把所有的读取出来
			if(settings.sendUrl){
				$.ajax({
					headers: {"X-Action": "Barrage"},
					type: "post",
					dataType: "json",
					cache: false,
					url: settings.sendUrl,
					data: {"content": s},
					success: function (response) {
						playerObject.loadBarrage(s);
					}
				});
			}
		}

		if(!playerObject.getType()){//只有在flash播放器情况下使用该监听
			playerObject.addListener("barrageShow", "barrageShowHandler");
			if(settings.isLive == false){//不是直播才需要来监听时间
				playerObject.addListener("time", "timeHandler");
			}
		}

		if(settings.loadUrl && isOpen){
			$.getJSON(settings.loadUrl, function(response){
				if($.isFunction(settings.loadCallback) == true){
					settings.loadCallback(response);
				}

				writeBarrage(playerObject, $.isFunction(settings.parser) == true ? settings.parser(response) : response);
			});
		}

		if(isOpen){
			openOrclose(true);
		}
	}
})(window, document, CKobject, jQuery);