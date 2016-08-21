
var siteUrl_GlossaryA = "/newsites/BTS-BizSolDesign";
var lstName_GlossaryA = "BSDAnnouncement";
var alphabet;
var glossaryItems = new Array();
var jsonArr = [];

$(document).ready(function () {   
    GetAllGlossary();
    GetGlossaryData("A");
});

function GetGlossaryData(beginsWith) {
    alphabet = beginsWith;
    $("#secondRow").show();
    $("#thirdRow").hide();
    $('#txtGlossary').val('');
    //  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', retrieveLstItms_GlossaryA);
    ExecuteOrDelayUntilScriptLoaded(retrieveLstItms_GlossaryA, "sp.js");
}

function retrieveLstItms_GlossaryA() {

    var clientContext_GlossaryA = new SP.ClientContext(siteUrl_GlossaryA);
    var oList_GlossaryA = clientContext_GlossaryA.get_web().get_lists().getByTitle(lstName_GlossaryA);
    alphabet = "O";
    var camlQuery_GlossaryA = new SP.CamlQuery();   
    //camlQuery_GlossaryA.set_viewXml(
    //   '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><BeginsWith><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + alphabet + '</Value></BeginsWith><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></Where></Query>' +
    //   '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Label\' /><FieldRef Name=\'Active\' /><FieldRef Name=\'Calculation\' /><FieldRef Name=\'Description\' /></ViewFields></View>');

    camlQuery_GlossaryA.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><BeginsWith><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + alphabet + '</Value></BeginsWith><And><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>ECM</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></And>'+
                                    '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'Domain_Area\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Solution_Design_Area\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');
      
    this.collListItem_GlossaryA = oList_GlossaryA.getItems(camlQuery_GlossaryA);

    clientContext_GlossaryA.load(collListItem_GlossaryA);
    clientContext_GlossaryA.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded_GlossaryA),
        Function.createDelegate(this, this.onQueryFailed_GlossaryA)
    );
}

function onQuerySucceeded_GlossaryA(sender, args) {   
    var listItemEnumerator_GlossaryA = collListItem_GlossaryA.getEnumerator();
    //var GlossaryAHTML = "<thead><tr><td>Measure</td><td>Label</td><td>Calculation</td><td>Description</td></tr></thead>";
    //var count = 0;
    while (listItemEnumerator_GlossaryA.moveNext()) {
        var oListItem_GlossaryA = listItemEnumerator_GlossaryA.get_current();
        alert(oListItem_GlossaryA.get_item('Title'));
    //    var oListItem_GlossaryA = listItemEnumerator_GlossaryA.get_current();
    //    GlossaryAHTML += "<tr><td>" + oListItem_GlossaryA.get_item('Title') + "</td><td>" + oListItem_GlossaryA.get_item('Label') + "</td><td>" + oListItem_GlossaryA.get_item('Calculation') + "</td><td>" + oListItem_GlossaryA.get_item('Description') + "</td></tr>";
    //    count++;
    }
    //if (count > 0)
    //{
    //    $("#glossaryData").html(GlossaryAHTML);
    //    $("#glossaryData").removeClass("norecorddiv");
    //    $("#glossaryData").addClass("wordsTable");

    //}
    //else
    //{
    //    $("#glossaryData").html('<div>No results found</div>');       
    //    $("#glossaryData").removeClass("wordsTable");
    //    $("#glossaryData").addClass("norecorddiv");
    //}
  
    ApplyClass(alphabet);
}

function onQueryFailed_GlossaryA(sender, args) {

    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function GetAllGlossary() {
    // SP.SOD.executeFunc('sp.js', 'SP.ClientContext', retrieveLstItms_Glossary);
    ExecuteOrDelayUntilScriptLoaded(retrieveLstItms_Glossary, "sp.js");
}

function retrieveLstItms_Glossary() {
    alert('Hiii')
    var clientContext_Glossary = new SP.ClientContext(siteUrl_GlossaryA);
    var oList_Glossary = clientContext_Glossary.get_web().get_lists().getByTitle(lstName_GlossaryA);

    var camlQuery_Glossary = new SP.CamlQuery();

    camlQuery_Glossary.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><BeginsWith><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + alphabet + '</Value></BeginsWith><And><And><Eq><FieldRef Name=\'Domain_Area\' /><Value Type=\'Lookup\'>ECM</Value></Eq><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></And>' +
                                   '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Application_Description\' /><FieldRef Name=\'Domain_Area\' /><FieldRef Name=\'LOB\' /><FieldRef Name=\'Comments\' /><FieldRef Name=\'Solution_Design_Area\' /><FieldRef Name=\'Interfaces\' /><FieldRef Name=\'Solution_Provider\' /><FieldRef Name=\'Application_Tier\' /><FieldRef Name=\'Marathon_Mapping\' /><FieldRef Name=\'Time\' /><FieldRef Name=\'Active\' /></ViewFields></View>');
    //camlQuery_Glossary.set_viewXml(
    //   '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></Where></Query>' +
    //   '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Label\' /><FieldRef Name=\'Active\' /><FieldRef Name=\'Calculation\' /><FieldRef Name=\'Description\' /></ViewFields></View>');
    this.collListItem_Glossary = oList_Glossary.getItems(camlQuery_Glossary);

    clientContext_Glossary.load(collListItem_Glossary);
    clientContext_Glossary.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded_Glossary),
        Function.createDelegate(this, this.onQueryFailed_Glossary)
    );
}

function onQuerySucceeded_Glossary(sender, args) {
    var listItemEnumerator_Glossary = collListItem_Glossary.getEnumerator();
    //var counter = 0;
    var array1 = new Array();
    var array2 = new Array();
    while (listItemEnumerator_Glossary.moveNext()) {
        var oListItem_Glossary = listItemEnumerator_Glossary.get_current();
        alert(removedivtags(oListItem_Glossary.get_item('Title')));
        //array1.push(removedivtags(oListItem_Glossary.get_item('Title')));
        //array2.push(removedivtags(oListItem_Glossary.get_item('Label')));
        //counter++;
    }

    glossaryItems = $.merge(array1, array2);
    $("#txtGlossary").autocomplete({
        source: glossaryItems,
        open : function(){
            $(".ui-autocomplete:visible").css({top:"+=8",left:"-=3"});
        }
    });
}

function onQueryFailed_Glossary(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function searchIt() {
    if ($("#txtGlossary").val() != "") {
        $('#txtGlossary').blur();
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', GlossarySearchResult);
    }
    else {
        GetGlossaryData("A");
    }
}

function GlossarySearchResult() {
    var clientContext_GlossarySrchRes = new SP.ClientContext(siteUrl_GlossaryA);
    var oList_GlossarySrchRes = clientContext_GlossarySrchRes.get_web().get_lists().getByTitle(lstName_GlossaryA);

    var camlQuery_GlossarySrchRes = new SP.CamlQuery();
    camlQuery_GlossarySrchRes.set_viewXml(
       '<View><Query><OrderBy><FieldRef Name=\'Title\' /></OrderBy><Where><And><Or><Contains><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + $("#txtGlossary").val() + '</Value></Contains><Contains><FieldRef Name=\'Title\' /><Value Type=\'Text\'>' + $("#txtGlossary").val() + '</Value></Contains></Or><Eq><FieldRef Name=\'Active\' /><Value Type=\'Boolean\'>1</Value></Eq></And></Where></Query>' +
       //'<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Instead_x002c__x0020_say\' /><FieldRef Name=\'Active\' /><FieldRef Name=\'Try_x0020_not_x0020_to_x0020_use\' /></ViewFields></View>');
    '<ViewFields><FieldRef Name=\'Title\' /><FieldRef Name=\'Label\' /><FieldRef Name=\'Active\' /><FieldRef Name=\'Calculation\' /><FieldRef Name=\'Description\' /></ViewFields></View>');

    this.collListItem_GlossarySrchRes = oList_GlossarySrchRes.getItems(camlQuery_GlossarySrchRes);

    clientContext_GlossarySrchRes.load(collListItem_GlossarySrchRes);
    clientContext_GlossarySrchRes.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded_GlossarySrchRes),
        Function.createDelegate(this, this.onQueryFailed_GlossarySrchRes)
    );

}

function onQuerySucceeded_GlossarySrchRes(sender, args) {
    var count = 0;
    var listItemEnumerator_GlossarySrchRes = collListItem_GlossarySrchRes.getEnumerator();
    var SrchResHTML = "<thead><tr><td>Measure</td><td>Label</td><td>Calculation</td><td>Description</td></tr></thead>";
    $("#secondRow").hide();
  
    if (this.collListItem_GlossarySrchRes.get_count() == 0) {
        ApplyClass(null);     
        $("#searchResult").html('<div>No results found</div>');
        $("#searchResult").removeClass("wordsTable");
        $("#searchResult").addClass("norecorddiv");
       $("#thirdRow").show();
    }
    else {
        while (listItemEnumerator_GlossarySrchRes.moveNext()) {
            var oListItem_GlossarySrchRes = listItemEnumerator_GlossarySrchRes.get_current();
            SrchResHTML += "<tr><td>" + oListItem_GlossarySrchRes.get_item('Title') + "</td><td>" + oListItem_GlossarySrchRes.get_item('Label') + "</td><td>" + oListItem_GlossarySrchRes.get_item('Calculation') + "</td><td>" + oListItem_GlossarySrchRes.get_item('Description') + "</td></tr>";
        }

        ApplyClass(null);
        $("#searchResult").html(SrchResHTML);
        $("#searchResult").removeClass("norecorddiv");
        $("#searchResult").addClass("wordsTable");
        $("#thirdRow").show();
    }

}

function onQueryFailed_GlossarySrchRes(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function ApplyClass(alp) {
    $('#' + alp + '').addClass("selected");
    $('.firstRow ul li').each(function (i, el) {
        if ($(this).text() != alp) {
            $(el).removeClass("selected");
        }
    });
}

function checkforEnterKey(eventcode) {
    if (eventcode == 13) {
        searchIt();
    }
}

function removedivtags(descdata) {
    //alert(descdata);
    descdata = descdata.replace(/<[\/]{0,1}(DIV|div)[^><]*>/g, "");
    //alert("new data:"+descdata)
    return descdata;
}