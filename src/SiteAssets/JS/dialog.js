//Dialog Opening
function OpenSubDomainDialog(itemId) {
	if(msieversion()){
		var options = SP.UI.$create_DialogOptions();
		options.url = _spPageContextInfo.webAbsoluteUrl + '/SitePages/SubDomains.aspx';
		options.title = "Edit Sub-Domains for this domain";
		options.height = 600;
		options.args = JSON.stringify(itemId);
		options.dialogReturnValueCallback = Function.createDelegate(null, CloseCallbackPublish);
		SP.UI.ModalDialog.showModalDialog(options);
	} else {
		var value = SP.UI.Notify.addNotification("<span style='color:red'>This browser version is not supported by the quick edit tool</span>", false);
	}
}

function msieversion() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var validBrowser = true;

	if (msie > 0) {     // If Internet Explorer, return version number
		var num = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
		if(num <= 8) {
			validBrowser = false;
		}
	}

	return validBrowser;
}

// Dialog callback
function CloseCallbackPublish(result, target) {
	if (result == SP.UI.DialogResult.OK) {
		SP.UI.ModalDialog.RefreshPage(SP.UI.DialogResult.OK);
	}
}