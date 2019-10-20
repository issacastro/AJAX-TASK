$(document).ready(function(){
    console.log('Query anda chido');
     var user = localStorage.getItem("Sesion");
    obtenertabla();
//Buscar Elementos en la Base de datos
    $('#resultados').hide();
   $('#buscar').keyup(function(e){
      if($('#buscar').val()){
       let buscar = $('#buscar').val();
      
       $.ajax({
           url :'buscar.php',
           type: 'POST',
           data:{buscar:buscar,'user':user},
           success: function(r) {
            let consulta = JSON.parse(r);
            let template='';
            consulta.forEach(consulta => {
               console.log(consulta);
               template += `<li>
               ${consulta.title}
               </li>`
            });
             $('#contenedor').html(template);
             $('#resultados').show();
           }
           
       })
   
      }else{
       $('#resultados').hide();
      }
   });
   $('#encontrar').click(function(e){
       let buscar = $('#buscar').val();
       console.log(buscar);
       e.preventDefault();
       $.ajax({
           url :'encontrar.php',
           type : 'POST',
           data :{buscar:buscar,'user':user},
           success: function(r) {
           let consulta = JSON.parse(r);
           let template='';
           consulta.forEach(consulta => {
              console.log(consulta);
              template += `
              <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>${consulta.title}</strong> 
              <p>${consulta.description}</p>
              ${consulta.date}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              `
           });
           $('#informacion').html(template);
           $('#buscar').val('');
           $('#resultados').hide();
           }
       })
   })
//Insertar Elementos en la Base de Datos
$('#formulario').submit(function(e){
   const datos={
       'title':$('#Titulo').val(),
       'description':$('#Nota').val(),
       'user': user
   };
   $.post('guardar.php',datos,function(r){
       console.log(r);
       obtenertabla();
       
   })
   e.preventDefault();
   $('#formulario')[0].reset();
})
//Mostrar tabla de la Base de Datos
function obtenertabla(){
   $.ajax({
       url: 'mostrar.php',
       type:'post',
       data:{user:user},
       success: function (response) {
          let tareas = JSON.parse(response);
          let template ='';
          tareas.forEach(tareas => {
              template += `
              <tr IDT="${tareas.id}">
               <td class="TID"  >${tareas.id}</td>
                <td> <a class="editar" data-toggle="modal" data-target="#EdicionModal">${tareas.title}</a></td>
                <td>${tareas.description}</td>
                <td>${tareas.date}</td>
                <td>
                <a class="borrar-tarea btn btn-danger">
                <i class="fas fa-trash-alt " style="color:white;width:10px; height:10px"></i>
             </a>
                </td>
              </tr>
              `
          });
          $('#tabla').html(template);      
          $('.TID').hide();  
       }
   });
}
//Borrar tareas de la Base de Datos
$(document).on('click','.borrar-tarea',function(){
 let fila = $(this)[0].parentElement.parentElement;
 let id = $(fila).attr('IDT');
 $.post('borrar.php',{id},function(response){
   console.log(response); 
   obtenertabla();   
 });

});

//Editar tareas de la Base de Datos

$(document).on('click','.editar',function(){
   let fila = $(this)[0].parentElement.parentElement;
   let buscar = $(fila).attr('IDT');
   console.log(buscar);
  $.ajax({
       url :'encontrar.php',
       type: 'POST',
       data: {buscar:buscar},
       success:function(r) {
           let consulta = JSON.parse(r);
           $('#ID2').val(consulta[0].id);
           $('#Titulo2').val(consulta[0].title);
           $('#Nota2').val(consulta[0].description);

           $('#EDITAR').click(function(e) {
               let id = $('#ID2').val();
               let title = $('#Titulo2').val();
               let description = $('#Nota2').val();
               
               $.ajax({
                   url : 'actualizar.php',
                   type: 'post',
                   data: {id:id,title:title,description:description},
                   success: function(r) {
                       console.log(r)
                   }
               })
               
               $('#EdicionModal').modal('hide');    
               obtenertabla();    
               $('#formularioE')[0].reset();
           })    
       }
   });
   
});

});
