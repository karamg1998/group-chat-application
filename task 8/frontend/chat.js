window.addEventListener('DOMContentLoaded',async (e)=>{
    let token=localStorage.getItem('token');
    try{
         await axios.get('http://localhost:3000/user/chats',{headers:{'token':token}})
         .then(res=>{
            console.log(res.data);
            for(var i=0;i<res.data.obj.length;i++)
            {
                show(res.data.obj[i].message);
            }
            
         })
    }
    catch(err)
    {
        console.log(err);
    }
});

let send=document.getElementById('snd-mssg');
send.addEventListener('click',async (e)=>{
    e.preventDefault();
    let token=localStorage.getItem('token');
     let message=document.getElementById('messg').value;
     let obj={message,token};
    try{
       await axios.post('http://localhost:3000/user/achat',obj)
       .then(res=>{
        console.log(res.data);
          show(res.data.message);
       })
       let s=document.getElementById('messg');
       s.value='';
    }
    catch(err)
    {
        console.log(err);
    }
    
})

function show(data)
{
    let section=document.querySelector('.c-section');
    section.innerHTML+=`<ul class="chats">${data}</ul>`
}