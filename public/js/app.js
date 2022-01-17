


// $('#submit').on('click',()=>{
//     // e.preventDefault();
//     var name= $('#name').val();
//     var bd= $('#birth_date').val();
//     var email =$('#email').val();
//     var password= $('#password').val();
    
//     var data = {
//         name:name.toString(),
//         birth_date:bd,
//         email:email,
//         password:password.toString()
//     }
//     // console.log(data);
//     // alert(name+' '+age+' '+pass );
//     $.ajax({
//         url:'/users/add',
//         type:'POST',
//         data:data,
//         success:()=>{
//            location.href = '/users';
//             // $.each(res, (i, val)=>{
//             //     console.log (val);
//             // })
//             // alert(res);
//         }
//     })
// });


  $(function () {
    $("#example1").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });
