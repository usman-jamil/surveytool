mjhViews.itemHtml = function (ctx) {
  // start with a <tr> and a <td>
  var returnHtml = “<tr><td colspan=’3′>”;

  returnHtml += “<h2>” + ctx.CurrentItem.Question + “</h2>”;

  if (ctx.CurrentItem.User_x0020_Response) {
    returnHtml += “<p>” + ctx.CurrentItem.User_x0020_Response + “</p>”;
  }
  // close off our <td> and <tr> elements
  returnHtml += “</td></tr>”;
  return returnHtml;
};
