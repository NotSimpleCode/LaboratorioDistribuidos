const nombre = document.querySelector('#nombre')
const numero = document.querySelector('#numero')
const btnAgregar = document.querySelector('#btn_agregar')
const btnBorrar =  document.getElementsByClassName('borrar')

btnAgregar.addEventListener('click',function(){
    //envia un enlace con los datos requeridos
    window.location.href = `agregar/${nombre.value}/${numero.value}`
})

for(let i of btnBorrar){
    i.addEventListener('click', function(){
        let id = i.getAttribute('id')
        window.location.href = `borrar/${id}`
    })
}