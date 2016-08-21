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
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/handsontable.full.min.js"></script>
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/subdomains.js"></script>
	<script type="text/javascript" src="/newsites/BTS-BizSolDesign/SiteAssets/JS/utility.js"></script>
	
	<!--<link rel="stylesheet" href="/newsites/BTS-BizSolDesign/SiteAssets/CSS/main-handsontable.css" />-->
	<link rel="stylesheet" href="/newsites/BTS-BizSolDesign/SiteAssets/CSS/handsontable.full.min.css" />
	
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
#s4-ribbonrow {
	display:none;
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
	<div class="ms-hide">
		<WebPartPages:WebPartZone runat="server" title="loc:TitleBar" id="TitleBar" AllowLayoutChange="false" AllowPersonalization="false" Style="display:none;" />
	</div>
	<table class="ms-core-tableNoSpace ms-webpartPage-root" width="100%">
		<tr>
			<td valign="top" width="100%">
				<input type="button" value="Save" onclick="javascript:performSaveOperation(); return false;" id="SaveItem" />&nbsp;
				<input type="button" value="Cancel" onclick="javascript: SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.cancel,'Cancelled');" id="CancelItem" />
			</td>
		</tr>	
		<tr>
			<td valign="top" width="100%">
				<div id="subdomains"></div>
			</td>
		</tr>
		<!--<tr>
			<td valign="top" width="100%">
				<input type="button" value="Save" id="SaveItem" />&nbsp;
				<input type="button" value="Cancel" id="CancelItem" />
			</td>
		</tr>-->
	</table>				
</asp:Content>
