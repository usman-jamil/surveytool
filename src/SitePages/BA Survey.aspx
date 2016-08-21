<%-- _lcid="1033" _version="15.0.4420" _dal="1" --%>
<%-- _LocalBinding --%>
<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c"  %> <%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Import Namespace="Microsoft.SharePoint" %> <%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePoint:ListItemProperty Property="BaseName" maxlength="40" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
	<meta name="GENERATOR" content="Microsoft SharePoint" />
	<meta name="ProgId" content="SharePoint.WebPartPage.Document" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="CollaborationServer" content="SharePoint Team Web Site" />
    <SharePoint:ScriptLink ID="ScriptLink1" Name="sp.ui.dialog.js" LoadAfterUI="true" Localizable="false" runat="server"></SharePoint:ScriptLink>
    <SharePoint:ScriptLink ID="ScriptLink11" Name="SP.core.debug.js" LoadAfterUI="true" Localizable="false" runat="server"></SharePoint:ScriptLink>
    <SharePoint:ScriptLink ID="ScriptLink12" Name="SP.runtime.debug.js" LoadAfterUI="true" Localizable="false" runat="server"></SharePoint:ScriptLink>
    <SharePoint:ScriptLink ID="ScriptLink13" Name="SP.debug.js" LoadAfterUI="true" Localizable="false" runat="server"></SharePoint:ScriptLink>

	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/jquery.smartWizard.js"></script>	
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/knockout-3.3.0.js"></script>	
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/wizardvalidation.js"></script>
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/survey.js"></script>
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/utility.js"></script>
	
	<link rel="stylesheet" href="/newsites/BTS-BizSolDesign/SiteAssets/CSS/smart_wizard.css" />
	<link rel="stylesheet" href="/newsites/BTS-BizSolDesign/SiteAssets/CSS/wizard-custom.css" />
	
	<SharePoint:ScriptBlock runat="server">
	var navBarHelpOverrideKey = "WSSEndUser";
	</SharePoint:ScriptBlock>
<SharePoint:StyleBlock runat="server">
body #s4-leftpanel {
	display:none;
}
.s4-ca {
	margin-left:0px;
}
</SharePoint:StyleBlock>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server"
		ControlId="SmallSearchInputBox" />
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">
	<SharePoint:ProjectProperty Property="Description" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
	<div>
	
	<h2><b>Welcome to the Business Analysis Competency survey from the BA practice. Please follow the instructions given below to complete the survey. </b></h2><br>
	<h2><u>To learn more about the survey please click here</u> &#9658; <a href="http://infospace.emirates.com/newsites/BTS-BizSolDesign/_layouts/15/WopiFrame2.aspx?sourcedoc=/newsites/BTS-BizSolDesign/SiteAssets/BASureveyPPT/BA%20Practice%20Survey.pptx&action=default"> BA Capability Assessment	Presentation</a></h2><br>
	
	<ul type="square">
  <h2><b>Structure of Survey:</b></h2> <br>

<p>&#9658;Self-assessment</p>
<p>&#9658;Three parts</p>
<ul>
<p>&#9658;Generic & Demographic – 12 to 15 questions</p>
<p>&#9658;Domain – 5 to 10 questions (based on your domain exposure)</p>
<p>&#9658;BA Competency – 48 questions (IIBA based standards)</p>
</ul>
<br>
<h2><b>Expectations and Timelines:</b></h2><br>

<p>&#9658;Survey is mandatory for ALL Members of Solution Design</p>
<p>&#9658;Survey is NOT a test, Be honest with your ratings</p>
<p>&#9658;Time for taking survey – 45 mins (approx.)</p>
<p>&#9658;Once the survey is started, you need to finish it till the end and click on “SUBMIT”. Half completed surveys will not be saved.</p>
<p>&#9658;Survey needs to be completed within two weeks</p>
<p>&#9658;Freshers with no experience can select "No Experience in Aviation" domain and sub-domain to start survey.</p>
</ul>
	
	</div>
	
	<div class="ms-hide">
		<WebPartPages:WebPartZone runat="server" title="loc:TitleBar" id="TitleBar" AllowLayoutChange="false" AllowPersonalization="false" Style="display:none;" />
	</div>
	<table class="ms-core-tableNoSpace ms-webpartPage-root" width="100%">
		<tr>
			<td valign="top" width="100%">
				<div id="wizard" class="swMain">
					<ul>
						<li>
							<a href="#step-1">
								<label class="stepNumber">1</label>
								<span class="stepDesc">
									Domains
									<br />
									
								</span>
							</a>
						</li>
						<li>
							<a href="#step-2">
								<label class="stepNumber">2</label>
								<span class="stepDesc">
									Sub-Domains
									<br />
									
								</span>
							</a>
						</li>
						<li>
							<a href="#step-3">
								<label class="stepNumber">3</label>
								<span class="stepDesc">
									Selected 
									<br />
									Competencies
								</span>
							</a>
						</li>
					</ul>
					<div id="step-1">
						<h2 class="StepTitle">Select Domain(s)</h2>
						<div data-bind="foreach: domainItems">
							<input type="checkbox" data-bind="value: id(), checked: $root.selectecDomainItems, click: $root.setAssociation" />	
							<span data-bind="text: '&nbsp;' + Name()"></span>
							<br/>
						</div>
					</div>
					<div id="step-2">
						<h2 class="StepTitle">Choose Sub-Domains</h2>
						<div data-bind="template: { name: $root.templateToUse, foreach: subDomainItems }">
						</div>
						<script id="headingTemplate" type="text/html">
							<span data-bind="text: Name()"></span><br>
						</script>
						<script id="inputTemplate" type="text/html">
							&nbsp;&nbsp;<input type="checkbox" data-bind="value: id(), checked: $parent.selectedSubDomainItems, click: $parent.setSubAssociation" />
							<span data-bind="text: '&nbsp;' + Name()"></span>
							<br/>
						</script>								
					</div>
					<div id="step-3">
						<h2 class="StepTitle">Selected Competencies</h2>
						<table class='parent-selectedcompetencies' data-bind="foreach: chosenCompetencies">
							<tr class='child-selectedcompetencies'>
								<td class='left-selectedcompetencies' data-bind="text: domainName">
								</td>
								<td class='right-selectedcompetencies' data-bind="text: subDomains">
								</td>
							</tr>
						</table>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td id="_invisibleIfEmpty" name="_invisibleIfEmpty" valign="top" width="100%">
				<WebPartPages:WebPartZone runat="server" Title="loc:FullPage" ID="FullPage" FrameType="TitleBarOnly"/>
			</td>
		</tr>
		<SharePoint:ScriptBlock runat="server">if(typeof(MSOLayout_MakeInvisibleIfEmpty) == "function") {MSOLayout_MakeInvisibleIfEmpty();}</SharePoint:ScriptBlock>
	</table>				
</asp:Content>
