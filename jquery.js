$(document).ready(()=>{
    localStorage.clear();
    class Jsonobj{
        constructor(){
            this.id= 1;
            this.reportdate= "";
            this.previousdose= "";
            this.totaldoseadm= "";
            this.totaldosefullyvaccinated= "";
            this.totalindivuduals=""
        }
    }
    $("#loadstrg").click(function(){
        alert(clicked);
        $.ajax({
            url: '../JSON/vaccine_doses.json',
            method: "get",
            contentType: "jsonp",
            success: storeJson,
            error: error_json
        });
        function error_json(){
            alert("Failed to load JSON data ");
        };
        function storeJson(data){
            var jsonobj= new Jsonobj("0", "", "", "", "", "");
            for(i in data){
                jsonobj[i].id= i+1;
                jsonobj[i].reportdate= data[i].report_date;
                jsonobj[i].previousdose= data[i].previous_day_doses_administered;
                jsonobj[i].totaldoseadm= data[i].total_doses_administered;
                jsonobj[i].totaldosefullyvaccinated= data[i].total_doses_in_fully_vaccinated_individuals;
                jsonobj[i].totalindivuduals=data[i].total_individuals_fully_vaccinated;
            }
            localStorage.setItem("report_date", JSON.stringify(jsonobj.reportdate));
        };
    });
    $("#listdisplay").click(()=>{
        $("#ulist").html("Summary of Total Vaccine Doses Administered in Ontario. <br>");
        var getdata= localStorage.getItem("report_date");
        $("#mainlist").append("<li>"+JSON.parse(getdata)+"</li>");
        var valuclick= $("li").click(function(){
            for(i in jsonobj){
                if(valuclick== jsonobj[i].reportdate){
                    $('#detail').append("Report date: "+ JSON.stringify(jsonobj[i].reportdate +"<br>"));
                    $('#detail').append("Previous doses administered: "+ JSON.stringify(jsonobj[i].previousdose +"<br>"));
                    $('#detail').append("Total doses administered: "+ JSON.stringify(jsonobj[i].totaldoseadm +"<br>"));
                    $('#detail').append("Total does in fully vaccinated individuals: "+ JSON.stringify(jsonobj[i].totaldosefullyvaccinated +"<br>"));
                    $('#detail').append("Total individulas fully vaccinated: "+ JSON.stringify(jsonobj[i].totalindivuduals +"<br>"));
                }
            }
        })
    });
});