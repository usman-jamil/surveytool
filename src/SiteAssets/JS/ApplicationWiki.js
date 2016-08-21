var siteurl = "";
var maxlength = 100;
var alphabet;
var catg;
var glossaryItems = new Array();
var jsonArr = [];
var wikiTabs = {};
var maxlength = 100;
var allWikiglossaryItems = new Array();
$(document).ready(function () {
    siteurl = _spPageContextInfo.webServerRelativeUrl;   
    GetAllTabs();
    //GetApplicationWikiData("A");
});
function GetAllTabs() {
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', LoadApplicationWikiTabs);
}
function GetApplicationWikiData(beginsWith) {
    alphabet = beginsWith;
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', LoadApplicationWikiDetails);
}
function GetApplicationWikiAData(catg, tabid) {
    var catgname = wikiTabs[catg];
    alphabet = "";
    //alphabet = "A";
    $('#hdTab').val(catgname);
    $('#hdselectedTab').val(tabid);
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', LoadApplicationWikiDetails);
}

//Load Application Wiki Tabs
//Start
function LoadApplicationWikiTabs() {
    var clientContext_wikitabs = new SP.ClientContext(siteurl);
    var oList_wikitabs = clientContext_wikitabs.get_web().get_lists().getByTitle("BSDApplicationWikiTabs");
    var camlQuery_wikitabs = new SP.CamlQuery();
    camlQuery_wikitabs.set_viewXml(
      '<View><Query><OrderBy><FieldRef Name=\'Title\' Ascending=\'True\' /></OrderBy><Where><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></Where></Query>' +
      '<ViewFields><FieldRef Name=\'ID\' /><FieldRef Name=\'Title\' /></ViewFields></View>');
    this.collListItem_wikitabs = oList_wikitabs.getItems(camlQuery_wikitabs);
    clientContext_wikitabs.load(collListItem_wikitabs);
    clientContext_wikitabs.executeQueryAsync(
         Function.createDelegate(this, this.ongetwikitabsQuerySucceeded),
         Function.createDelegate(this, this.onQueryFailed_Wiki)
     );


}
function ongetwikitabsQuerySucceeded() {
    var flag = "block;";
    var desc = "";
    var ctr = 0;
    var strHTML = "";
    var listItemEnumerator_wikitabs = collListItem_wikitabs.getEnumerator();
    while (listItemEnumerator_wikitabs.moveNext()) {
        var oListItem_wikitabs = listItemEnumerator_wikitabs.get_current();
        ctr = ctr + 1;
        // $('#hdTab').val(oListItem_wikitabs.get_item('Title'));
        var appname = oListItem_wikitabs.get_item('Title');
        var ID = oListItem_wikitabs.get_item('ID');
        if (ctr == '1') {
            $('#hdTab').val(appname);
        }
        if (ctr > 1) {
            strHTML += "<li id='tab" + ID + "'><a  onclick=GetApplicationWikiAData('" + ID + "','tab" + ID + "') style='cursor:hand;'>" + appname + "</a></li>";

        }
        else {
            strHTML += "<li id='tab" + ID + "' class='selected'><a onclick=GetApplicationWikiAData('" + ID + "','tab" + ID + "') style='cursor:hand;'>" + appname + "</a></li>";

        }
        wikiTabs[ID] = appname;


    }

    //if (ctr > 3) {
    //    strHTML += "<a target='_blank' href='http://infospace.emirates.com/newsites/RO/Lists/ROAnnouncement/AllItems.aspx' class='btn-read-more' style='color:#fff!important;'>View All</a>";

    //}

    document.getElementById("ulwikitabs").innerHTML = strHTML;
    //GetApplicationWikiData("A");
    GetApplicationWikiData("");
}
//End

//Load Application Wiki Details
//Start
function LoadApplicationWikiDetails() {
    var clientContext_wikidetails = new SP.ClientContext(siteurl);
    var oList_wikidetails = clientContext_wikidetails.get_web().get_lists().getByTitle("BSDApplicationWikiDetails");
    var camlQuery_wikidetails = new SP.CamlQuery();
    // alert($('#hdTab').val());
    catg = $('#hdTab').val();
    //alert(alphabet)    
    if ($("#txtWikiGlossary").val())
    {
            camlQuery_wikidetails.set_viewXml(
                        '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><Contains><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + $("#txtWikiGlossary").val() + '</Value></Contains><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></Where></Query>' +
                  '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');

            //camlQuery_wikidetails.set_viewXml(
            //              '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><Contains><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + $("#txtWikiGlossary").val() + '</Value></Contains><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>' + catg + '</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></And></Where></Query>' +
            //        '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');
                   
       // camlQuery_wikidetails.set_viewXml(
       //      '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><Contains><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + $("#txtWikiGlossary").val() + '</Value></Contains><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>' + catg + '</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></And></Where></Query>' +       
       //'<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Solution_Design_Area\' /> <FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');
    }
    else
    {
        if (alphabet) {
            camlQuery_wikidetails.set_viewXml(
      '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><BeginsWith><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + alphabet + '</Value></BeginsWith><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>' + catg + '</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></And></Where></Query>' +
      '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');

        }
        else {

            camlQuery_wikidetails.set_viewXml(
      '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>' + catg + '</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></Where></Query>' +
      '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');
        }
      
    }
   

    this.collListItem_wikidetails = oList_wikidetails.getItems(camlQuery_wikidetails);
    clientContext_wikidetails.load(collListItem_wikidetails);
    clientContext_wikidetails.executeQueryAsync(
         Function.createDelegate(this, this.ongetwikidetailsQuerySucceeded),
         Function.createDelegate(this, this.onQueryFailed_Wiki)
     );

   
}
function ongetwikidetailsQuerySucceeded() {
    var flag = "block;";
    var desc = "";
    var count = 0;
    var strHTML = "";
    var Description = "";
    var LOB = "";
    var Tier = "";
    var SolutionProvider = "";
    var Interfaces = "";
    var Comments = "";
    var Solution_Design_Area = "";
    var Marathon_Mapping = "";
    var Time = "";
    var GlossaryAHTML = "";
    var listItemEnumerator_wikidetails = collListItem_wikidetails.getEnumerator();
    while (listItemEnumerator_wikidetails.moveNext()) {
        var oListItem_wikidetails = listItemEnumerator_wikidetails.get_current();
        var ApplicationWikiImage = oListItem_wikidetails.get_item('ApplicationWikiImage');
        var Name = oListItem_wikidetails.get_item('Title');      
        Description = oListItem_wikidetails.get_item('Application_Description');     
        desc = trimltstdstndesc(removedivlatestdstntags(Description)) + "...&raquo;&nbsp;";
        var ID = oListItem_wikidetails.get_item('ID');
        if (Description.length < maxlength) {
            flag = "none;";
            desc = trimltstdstndesc(removedivlatestdstntags(Description));
        }
        else {
            desc = trimltstdstndesc(removedivlatestdstntags(Description)) + "...&raquo;&nbsp;" + "<a class='readMore' target='_self' href='http://infospace.emirates.com/newsites/BTS-BizSolDesign/Lists/BSDApplicationWikiDetails/DispForm.aspx?ID=" + ID + "&source="+window.location.href+"'>Read more</a>";


        }
        if (oListItem_wikidetails.get_item('LOB')) {
            LOB = oListItem_wikidetails.get_item('LOB');

        }      
        if (oListItem_wikidetails.get_item('Application_Tier')) {
            Tier = oListItem_wikidetails.get_item('Application_Tier');
        }      
        if (oListItem_wikidetails.get_item('Solution_Provider')) {
            SolutionProvider = oListItem_wikidetails.get_item('Solution_Provider');

        }      
        if (oListItem_wikidetails.get_item('Interfaces')) {

            Interfaces = oListItem_wikidetails.get_item('Interfaces');
        }      
        if (oListItem_wikidetails.get_item('Comments')) {
            Comments = oListItem_wikidetails.get_item('Comments');

        }      
        //if (oListItem_wikidetails.get_item('Solution_Design_Area')) {

        //    Solution_Design_Area = oListItem_wikidetails.get_item('Solution_Design_Area');
        //}

        if (oListItem_wikidetails.get_item('Marathon_Mapping')) {
            Marathon_Mapping = oListItem_wikidetails.get_item('Marathon_Mapping');

        }

        if (oListItem_wikidetails.get_item('Time')) {
            Time = oListItem_wikidetails.get_item('Time');

        }

        Description=   replaceAll(Description, '"', '');
    
        GlossaryAHTML += "<table style='margin-bottom: 7px;'><tr ><td colspan='2' style='background: lightgrey;' ><b><span style='font-size:3;color:#363636;' id=span" + ID + ">" + Name + "</span></b></td></tr>";
        if (ApplicationWikiImage) {            
           // GlossaryAHTML += "<tr><td style='width: 400px;background: #fefefe;' title=\"" + Description + "\">" + desc + "</td><td style='padding:1px;background: #fefefe;'><a href='javascript:showPhotoMediaGalleryPopup(" + ID + ")'>" + ApplicationWikiImage.replace("<img ", "<img ID='img" + ID + "' align='left' width='390px' height='250px'") + "</a></td></tr>";
            GlossaryAHTML += "<tr><td style='width: 400px;background: #fefefe;'>" + desc + "</td><td style='padding:1px;background: #fefefe;'><a href='javascript:showPhotoMediaGalleryPopup(" + ID + ")'>" + ApplicationWikiImage.replace("<img ", "<img ID='img" + ID + "' align='left' width='390px' height='250px'") + "</a></td></tr>";
            //GlossaryAHTML += "<tr><td style='width: 400px;background: #fefefe;' title='" + Description + "'>" + desc + "</td><td style='padding:1px;background: #fefefe;'>" + ApplicationWikiImage.replace("<img ", "<a   href='http://infospace.emirates.com/newsites/BTS-BizSolDesign/Lists/BSDApplicationWikiDetails/DispForm.aspx?ID=" + ID + "' target='_blank' ><img align='left' width='390px' height='250px'") + "</a>" + "</td></tr>";
            //GlossaryAHTML += "<div class='hover'>"          
           // GlossaryAHTML += "<div class='more-info-controls'>"           
           // GlossaryAHTML += "<a href='javascript:showPhotoMediaGalleryPopup()'><span class='ico-btn-zoom'></span></a></div></div></li>"+ "</td></tr>";
            
        }
        else {
            //GlossaryAHTML += "<tr><td style='width: 400px;background: #fefefe;' title=\"" + Description + "\">" + desc + "</td><td style='width: 400px;background: #fefefe;' ></td></tr>";
            GlossaryAHTML += "<tr><td style='width: 400px;background: #fefefe;'>" + desc + "</td><td style='width: 400px;background: #fefefe;' ></td></tr>";

        }
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>Line of Business</font></b></td><td style='background: #fefefe;'>" + LOB + "</td></tr>";
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>Application Tier</font></b></td><td style='background: #fefefe;' >" + "Tier " + Tier + "</td></tr>";
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>In-House or Vendor</font></b></td><td style='background: #fefefe;' >" + SolutionProvider + "</td></tr>";
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>Interfaces</font></b></td><td style='background: #fefefe;' >" + Interfaces + "</td></tr>";
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>Marathon Mapping</font></b></td><td style='background: #fefefe;' >" + Marathon_Mapping + "</td></tr>";
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>TIME</font></b></td><td style='background: #fefefe;' >" + Time + "</td></tr>";
        GlossaryAHTML += "<tr><td style='background: #fefefe;' ><b><font color='#363636'>Notes</font></b></td><td style='background: #fefefe;' >" + Comments + "</td></tr></table>";
       count++;
       Description = "";
       LOB = "";
       Tier = "";
       SolutionProvider = "";
       Interfaces = "";
       Comments = "";
       Solution_Design_Area = "";
       Marathon_Mapping = "";
       Time = "";
    }
   
    if (count > 0) {
        //GlossaryAHTML = encodeURI(GlossaryAHTML)
        //$("#glossaryData").html(GlossaryAHTML);
        //GlossaryAHTML=  $("#glossaryData").html();
        //GlossaryAHTML = decodeURI(GlossaryAHTML)
        $("#glossaryData").html(GlossaryAHTML);
        $("#glossaryData").removeClass("norecorddiv");
        $("#glossaryData").addClass("wordsTable");      

    }
    else {
        $("#glossaryData").html('<div>No results found</div>');
        $("#glossaryData").removeClass("wordsTable");
        $("#glossaryData").addClass("norecorddiv");
       
    }
    ApplyClass(alphabet);
    GetAllApplicationWikiDetails();
    ApplyTabClass();   

}

function replaceAll(str, find, replceStr) {
    var find = '"';
    var re = new RegExp(find, 'g');

    str = str.replace(re, replceStr);
    return str;
}
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// UNSAFE with unsafe strings; only use on previously-escaped ones!
function unescapeHtml(escapedStr) {
    var div = document.createElement('div');
    div.innerHTML = escapedStr;
    var child = div.childNodes[0];
    return child ? child.nodeValue : '';
};
//End

//Load data in search text Box
//Start
function GetAllApplicationWikiDetails() {
    // SP.SOD.executeFunc('sp.js', 'SP.ClientContext', retrieveLstItms_Glossary);
    ExecuteOrDelayUntilScriptLoaded(retrieveLstItms_AllWikiDetails, "sp.js");
}

function retrieveLstItms_AllWikiDetails() {
    var clientContext_AllWikiDetails = new SP.ClientContext(siteurl);
    var oList_AllWikiDetails = clientContext_AllWikiDetails.get_web().get_lists().getByTitle('BSDApplicationWikiDetails');
     catg = $('#hdTab').val();
    var camlQuery_AllWikiDetails = new SP.CamlQuery();

    camlQuery_AllWikiDetails.set_viewXml(
'<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></Where></Query>' +
'<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');

//    camlQuery_AllWikiDetails.set_viewXml(
//'<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>' + catg + '</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></Where></Query>' +
//'<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'ApplicationWikiImage\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');


    this.collListItem_AllWikiDetails = oList_AllWikiDetails.getItems(camlQuery_AllWikiDetails);

    clientContext_AllWikiDetails.load(collListItem_AllWikiDetails);
    clientContext_AllWikiDetails.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceededAllWikiDetails),
        Function.createDelegate(this, this.onQueryFailed_Wiki)
    );
}

function onQuerySucceededAllWikiDetails(sender, args) {
    var listItemEnumerator_AllWikiDetails = collListItem_AllWikiDetails.getEnumerator();
    //var counter = 0;
    var array1 = new Array();
    var array2 = new Array();
    while (listItemEnumerator_AllWikiDetails.moveNext()) {
        var oListItem_AllWikiDetails = listItemEnumerator_AllWikiDetails.get_current();
        //alert(removedivtags(oListItem_AllWikiDetails.get_item('Title')));
        array1.push(removedivtags(oListItem_AllWikiDetails.get_item('Title')));
        //array2.push(removedivtags(oListItem_AllWikiDetails.get_item('Application_Description')));
        //counter++;
    }   
    //allWikiglossaryItems = $.merge(array1, array2);
    //$.merge(array1, array2);
    //var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
    //$("#txtWikiGlossary").autocomplete({ source: availableTags });
    $("#txtWikiGlossary").autocomplete({
        source: array1,
     open: function () {
          $(".ui-autocomplete:visible").css({ top: "+=8", left: "-=3" });
      }
    });
    $('.ui-autocomplete').css('list-style-type', 'none');
}
//End

function checkforEnterKey(eventcode) {
    if (eventcode == 13) {
        searchIt();
    }
}

function searchIt() {
    //RemoveClass();
    if ($("#txtWikiGlossary").val() != "") {
        $('#txtWikiGlossary').blur();
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', LoadApplicationWikiDetails);
    }
    else {
        //GetApplicationWikiData("A");
        GetApplicationWikiData("");
    }
}

function RemoveClass() {   
    $('.firstRow ul li').each(function (i, el) {      
            $(el).removeClass("selected");       
    });
}
function onQueryFailed_Wiki(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}
function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh - 12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;
    return date.replace(pattern, replacement);
}


function trimltstdstndesc(str) {
    // alert('new data is =' + str)
    str = str.replace(/<[\/]{0,1}(p)[^><]*>/ig, "");
    var m = str;
    str = str.substring(0, maxlength);
    if (m.charAt(maxlength) != " ") {
        m = m.substring(maxlength, m.length)
        pos = m.indexOf(" ");
        if (pos != -1) {
            m = m.substring(0, pos);
        }
        if (pos == -1) {
            m = m.substring(0, m.length);
        }
        str = str + m
    }
    // alert(str)
    // str = str.replace(/(^,)|(,$)/g, "")

    // alert(str)
    return str;
}



function removehtml(desc) {
    //  alert('before desc=' + desc);
    desc = desc.replace(/<\/?[^>]+>/gi, '')
    // alert(desc);
    return desc;
}

function removedivlatestdstntags(descdata) {
    //alert(descdata);
    descdata = descdata.replace(/<[\/]{0,1}(DIV|div)[^><]*>/g, "");
    //  desc = desc.replace(/<\/?[^>]+>/gi, '')
    //alert("new data:"+descdata)
    //   alert('neat data is='+ descdata);
    return descdata;
}
function removeHTMLTags(inputText) {
    var strInputCode = inputText;
    strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
        return (p1 == "lt") ? "<" : ">";
    });
    var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
    return (strTagStrippedText.substring(0, 59) + ".&nbsp;");
}
function ApplyClass(alp) {
    $('#' + alp + '').addClass("selected");
    $('.firstRow ul li').each(function (i, el) {
        if ($(this).text() != alp) {
            $(el).removeClass("selected");
        }
    });
}

function ApplyTabClass() {
    var alp = $('#hdselectedTab').val();
    if (alp) {
        $('#dvtabs ul li').each(function (i, el) {
            $(el).removeClass("selected");
        });
        $('#' + alp + '').addClass("selected");

    }



}

function removedivtags(descdata) {
    //alert(descdata);
    descdata = descdata.replace(/<[\/]{0,1}(DIV|div)[^><]*>/g, "");
    //alert("new data:"+descdata)
    return descdata;
}