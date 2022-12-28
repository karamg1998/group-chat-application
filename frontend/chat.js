let token=localStorage.getItem('token');
let chat=document.querySelector('.chat');
let initial=document.querySelector('.initial');
var u=document.querySelector('.user-container');
var messg;
var dom;

window.addEventListener('DOMContentLoaded',inter);

function inter()
{
   dom= setInterval(async (e) => {
    try{
     await axios.get('http://localhost:3000/users',{headers:{'token':token}})
     .then(res=>{
        console.log(res.data);
            u.innerHTML='';
            show(res.data.obj);
            var main=document.querySelector('.user');
            main.innerText=`Hello ${res.data.logger[0].toUpperCase()+res.data.logger.slice(1)}`;
     });
    }
    catch(err)
    {
    console.log(err);
    }
     },1000);
}

var AC=document.getElementById('allchats');
AC.addEventListener('click',(e)=>{
    chat.classList.remove('active');
    initial.classList.remove('active');
    clearInterval(messg);
    inter();
});

function show(data)
{
    for(var i=0;i<data.length;i++)
    {
        u.innerHTML+=`<button class='users'>${data[i].name[0].toUpperCase()+data[i].name.slice(1)}</button><br><br>`
    }

    let user=document.getElementsByClassName('users');
    for(var i=0;i<user.length;i++)
    {
        user[i].addEventListener('click',async (e)=>{
            e.preventDefault();
            clearInterval(dom);
            chat.classList.toggle('active');
            initial.classList.toggle('active');
            let chatSec=document.querySelector('.c-section');
            let n=e.target.innerText[0].toLowerCase()+e.target.innerText.slice(1);
                try{
                    await axios.get('http://localhost:3000/user/chats',{headers:{'token':token,'secondUser':n}})
                    .then(res=>{
                       console.log(res.data);
                       localStorage.setItem('logger',res.data.l);
                       localStorage.setItem('secondaryUser',res.data.s);
                       let secUser=document.querySelector('.sec-user');
                       secUser.innerText=e.target.innerText;
                       chatSec.innerHTML='';
                    });
                    
                  messg =  setInterval(() => {
                        let l=localStorage.getItem('logger');
                        let s=localStorage.getItem('secondaryUser');
                        axios.get('http://localhost:3000/chats',{headers:{'logger':l,'secondary':s}})
                        .then(res=>{
                            console.log(res.data);
                            chatSec.innerHTML='';
                            for(var i=0;i<res.data.length;i++)
                            {
                                if(res.data[i].sender==='logger')
                                {
                                    chatSec.innerHTML+=`<ul class="log">${res.data[i].message}</ul><br><br>`;
                                }
                                else{
                                    chatSec.innerHTML+=`<ul class="sec">${res.data[i].message}</ul><br><br>`;
                                }
                            } 
                    }).catch(err=>console.log(err));  
                    }, 1000);
                                     
            }
            catch(err)
            {
            console.log(err);
            }
        })
    }
};

let send=document.getElementById('snd-mssg');
send.addEventListener('click',async (e)=>{
    e.preventDefault();
    let mssg=document.getElementById('messg').value;
    let lo=localStorage.getItem('logger');
    let su=localStorage.getItem('secondaryUser');
    let obj={mssg,lo,su};
    try{
        await axios.post('http://localhost:3000/user/addchat',obj)
        .then(res=>{
            console.log(res.data);
            var m=document.getElementById('messg');
            m.value='';
        })
    }
    catch(err)
    {
        console.log(err);
    }
})

let logout=document.querySelector('.logout');
    logout.addEventListener('click',(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('logger');
    localStorage.removeItem('secondaryUser');
    window.location.href="./login.html";
});