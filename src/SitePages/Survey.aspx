<!-- DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" -->
<%@ Page language="C#" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<meta name="GENERATOR" content="Microsoft SharePoint" />
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <!-- the following 5 js files are required to use CSOM -->
<Sharepoint:ScriptLink ID="ScriptLink1" Name="init.js" LoadAfterUI="true" Localizable="false" runat="server"></Sharepoint:ScriptLink>  
<Sharepoint:ScriptLink ID="ScriptLink2" Name="MicrosoftAjax.js" LoadAfterUI="true" Localizable="false" runat="server"></Sharepoint:ScriptLink>  
<Sharepoint:ScriptLink ID="ScriptLink3" Name="sp.ui.dialog.js" LoadAfterUI="true" Localizable="false" runat="server"></Sharepoint:ScriptLink>  
<Sharepoint:ScriptLink ID="ScriptLink4" Name="sp.core.js" LoadAfterUI="true" Localizable="false" runat="server"></Sharepoint:ScriptLink>  
<Sharepoint:ScriptLink ID="ScriptLink5" Name="sp.runtime.js" LoadAfterUI="true" Localizable="false" runat="server"></Sharepoint:ScriptLink>  
<Sharepoint:ScriptLink ID="ScriptLink6" Name="sp.js" LoadAfterUI="true" Localizable="false" runat="server"></Sharepoint:ScriptLink>  	
 
<!-- CSS -->
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/css/bootstrap.css" rel="stylesheet">
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/css/style.css" rel="stylesheet">
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/font-awesome/css/font-awesome.css" rel="stylesheet" >
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/css/socialize-bookmarks.css" rel="stylesheet">
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/fancybox/source/jquery.fancybox.css?v=2.1.4" rel="stylesheet">
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/check_radio/skins/square/aero_small.css" rel="stylesheet">
 
<!-- Toggle Switch -->
<link rel="stylesheet" href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/css/jquery.switch.css">
 
<!-- Owl Carousel Assets -->
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/css/owl.carousel.css" rel="stylesheet">
<link href="/newsites/BTS-BizSolDesign/SiteAssets/Survey/css/owl.theme.css" rel="stylesheet">
 
<!-- Google web font -->
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300' rel='stylesheet' type='text/css'>
 
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
 
<!-- Jquery -->
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/jquery-1.10.2.min.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/jquery-ui-1.8.22.min.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/JS/knockout-3.3.0.js"></script>
 
<!-- Wizard-->
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/jquery.wizard.js"></script>
 
<!-- Radio and checkbox styles -->
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/check_radio/check.min.js"></script>
 
<!-- HTML5 and CSS3-in older browsers-->
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/modernizr.custom.17475.js"></script>
 
<!-- Support media queries for IE8 -->
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/respond.min.js"></script>
 
</head>
 
<body>
        	
            <div class="container">
            </div>
 
<section class="container" id="main">
 
<!-- Start Survey container -->
<!--[if IE 8 ]><div id="survey_container" class="ie8"> <![endif]-->
<!--[if IE 9 ]><div id="survey_container" class="ie9"> <![endif]-->
<div id="survey_container">
<!--<![endif]--> 
	<div id="top-wizard">
		<strong>Progress <span id="location"></span></strong>
		<div id="progressbar"></div>
		<div class="shadow"></div>
	</div><!-- end top-wizard -->
    
	<form name="example-1" data-bind="submit: finalSubmit" return false;" id="wrapped" action="" method="POST">
		<input id="website" name="website" type="text" value="" ><!-- Leave for security protection, read docs for details -->	
		<div id="middle-wizard" data-bind="template: { name: renderSubmitTemplate, foreach: blocks }">
		</div><!-- end middle-wizard -->
        
		<div id="bottom-wizard">
			<button type="button" name="backward" class="backward">Previous</button>
			<button type="button" name="forward" class="forward">Next </button>
		</div><!-- end bottom-wizard -->
		<SharePoint:FormDigest runat="server" />    
	</form>
    
</div><!-- end Survey container -->
 
</section><!-- end section main container -->

<!-- start scripts -->
<script id="radioTemplate" type="text/html">
	<div class="row">
		<div class="col-md-10">
			<h3 data-bind="text: questionTitle"></h3>
			<ul class="data-list-2" data-bind="foreach: questionOptions">
				<li><input type="radio" data-bind="value: $rawData, attr: { name: $parent.questionId }, css: { required: $parent.isRequired, check_radio: true }"><label data-bind="text: $rawData"></label></li>
			</ul>
		</div>
	</div>
</script>
<script id="checkboxTemplate" type="text/html">
	<div class="row">
		<div class="col-md-10">
			<h3 data-bind="text: questionTitle"></h3>
			<ul class="data-list-2" data-bind="foreach: questionOptions">
				<li><input type="checkbox" data-bind="value: $rawData, attr: { name: $parent.questionId }, css: { required: $parent.isRequired, check_radio: true }"><label data-bind="text: $rawData"></label></li>
			</ul>
		</div>
	</div>
</script>
<script id="numericTemplate" type="text/html">
	<div class="row">
		<div class="col-md-10">
			<h3 data-bind="text: questionTitle"></h3>
			<ul class="data-list floated clearfix">
				<li data-bind="attr: { id: questionId }"><input type="text" data-bind="attr: { name: questionId }, css: { required: isRequired, number: true, 'form-control': true }"></li>
			</ul>
		</div>
	</div>
</script>
<script id="selectTemplate" type="text/html">
	<div class="row">
		<div class="col-md-10">
			<h3 data-bind="text: questionTitle"></h3>
			<ul class="data-list">
				<li>
				<div class="styled-select">
					<select data-bind="options: questionOptions, attr: { name: questionId }, css: { required: isRequired, 'form-control': true }"></select>
				</div>
				</li>
			</ul>			
		</div>
	</div>
</script>
<script id="booleanTemplate" type="text/html">
	<div class="row">
		<div class="col-md-10">
			<h3 data-bind="text: questionTitle"></h3>
			<label class="switch-light switch-ios">
				<input data-bind="attr: { name: questionId }" type="checkbox" class="fix_ie8" value="yes">
				<span>
					<span class="ie8_hide">No</span>
					<span>Yes</span>
				</span>
				<a></a>
			</label>
		</div>
	</div>
</script>
<script id="submitTemplate" type="text/html">
	<div class="step" data-bind="template: { name: templateToUse, foreach: questions }">
	</div>
	<div class="submit step" id="complete">
		<i class="icon-check"></i>
		<h3>Survey complete! Thank you for you time.</h3>
		<button type="submit" name="process" class="submit">Submit the survey</button>
	</div><!-- end submit step -->
</script>
<script id="blockTemplate" type="text/html">
	<div class="step" data-bind="template: { name: templateToUse, foreach: questions }">
	</div>
</script>
<!-- end scripts -->
 
<!-- OTHER JS --> 
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/jquery.validate.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/jquery.placeholder.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/jquery.bxslider.min.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/quantity-bt.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/bootstrap.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/functions.js"></script>
<script src="/newsites/BTS-BizSolDesign/SiteAssets/js/surveysubmit.js"></script> 
<script src="/newsites/BTS-BizSolDesign/SiteAssets/js/surveyKO.js"></script> 
 
<!-- FANCYBOX -->
<script  src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/fancybox/source/jquery.fancybox.pack.js?v=2.1.4" type="text/javascript"></script> 
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/fancybox/source/helpers/jquery.fancybox-media.js?v=1.0.5" type="text/javascript"></script> 
<script src="/newsites/BTS-BizSolDesign/SiteAssets/Survey/js/fancy_func.js" type="text/javascript"></script> 
 
</body>
</html>