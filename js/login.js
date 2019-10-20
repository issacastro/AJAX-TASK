$(document).ready(()=>{
    $('#Check').on('click',e=>{
        e.preventDefault();
        var form = $('#User').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
          var User=JSON.stringify(form);
        $.ajax({
            url:'control.php',
            type:'POST',
            data:{User:User},
            success: (data)=>{
                //alert(data);
                if(data=='YES'){
                    alert($('#user').val());
                    localStorage.setItem("Sesion",$('#user').val());
                    window.location.href ="Home";
                }else{
                    $('#Error').html('Datos Invalidos')
                }
                
            }
        });
    });

    
});