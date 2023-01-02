let token=localStorage.getItem('token');
let chat=document.querySelector('.chat');
let initial=document.querySelector('.initial');
var u=document.querySelector('.user-container');
let aUser=document.getElementById('a-user');
let group=document.getElementById('group');
let chatSec=document.querySelector('.c-section');
let Gchat=document.querySelector('.g-section');
let UserContainr=document.querySelector('.user-container');
let GroupContainr=document.querySelector('.group-container');
let Gcon=document.querySelector('.y-group');
let GForm=document.querySelector('.f-group');
let gChat=document.querySelector('.g-chat');
let f=document.querySelector('.a-parti');
let aM=document.querySelector('.m-con');
let delGroup=document.getElementById('delGroup');
let a=document.getElementById('amem');
let b=document.getElementById('leave');
var messg,dom,dom2,gMessg;


window.addEventListener('DOMContentLoaded',async (e)=>{
    aUser.classList.toggle('active');
    UserContainr.classList.toggle('active');
    GroupContainr.classList.toggle('active');
    GForm.classList.toggle('active');
    inter();
});

aUser.addEventListener('click',user);

function user()
{   
    if(aUser.classList.contains('active'))
    {
        clearInterval(dom2);
        inter();
    }
    else{
    aUser.classList.toggle('active');
    group.classList.remove('active');
    UserContainr.classList.toggle('active');
    GroupContainr.classList.toggle('active');
    clearInterval(dom2);
    inter();
    }
    
}

group.addEventListener('click',Group)

async function Group()
{
    if(group.classList.contains('active'))
    {
        clearInterval(dom);
    }
    else{
    aUser.classList.remove('active');
    group.classList.toggle('active');
    UserContainr.classList.remove('active');
    GroupContainr.classList.remove('active');
    clearInterval(dom);
    }
   dom2=setInterval(async (e) => {
    try{
        await axios.get('http://localhost:3000/get/groups',{headers:{'token':token}})
        .then(res=>{
           console.log(res.data);
           Gcon.innerHTML='';
           gInter(res.data);
        });
       }
       catch(err)
       {
       console.log(err);
       }
   }, 1000);
    
}

function gInter(data)
{
   for(var i=0;i<data.length;i++)
    {
    Gcon.innerHTML+=`<button class='group-names' id=${data[i].admin}>${data[i].name}</button><br><br>`
    }
   let gr=document.getElementsByClassName('group-names');
   gNext(gr);
}

function gNext(data)
{
    for(var i=0;i<data.length;i++)
    {
        data[i].addEventListener('click',(e)=>{
            clearInterval(dom2);
            GroupContainr.classList.remove('active');
            initial.classList.toggle('active');
            gChat.classList.toggle('active');
            let gName=document.querySelector('.g-name');
            let gro=e.target.innerText;
            gName.innerText=gro;
            if(e.target.id==='true'||'true(su)')
            {
                 delGroup.classList.toggle('active');
                 f.classList.toggle('active');
                 f.id=gro;
            }
            else{
                a.classList.toggle('active');
                b.classList.toggle('active');
            }
            Gchat.innerHTML='';
            groInt(gro);
           
        })
    }
}

function groInt(data)
{
    gMessg=setInterval(async (e) => {
        try{
            await  axios.get('http://localhost:3000/group/getM',{headers:{'token':token,'group':data}})
          .then(res=>{
              console.log(res.data);
              Gchat.innerHTML='';
              for(var i=0;i<res.data.length;i++)
              {
                  if(res.data[i].sender==='logger')
                  {
                      Gchat.innerHTML+=`<ul class="log">${res.data[i].message}</ul>
                      <br><ul class="log-1">you</ul><br><br>`;
                   }
                  else{
                      Gchat.innerHTML+=`<ul class="sec">${res.data[i].message}</ul>
                      <br><ul class="sec-1">${res.data[i].name}</ul><br><br>`;
                  }
             } 
          })
          }
          catch(err)
          {
              console.log(err);
          }
    }, 1000);
}

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
        main.innerText=`Hello ${res.data.logger}`;
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
    UserContainr.classList.toggle('active');
    clearInterval(messg);
    inter();
});

function show(data)
{
    for(var i=0;i<data.length;i++)
    {
        u.innerHTML+=`<button class='users'>${data[i].name}</button><br><br>`
    }
    let user=document.getElementsByClassName('users');
    s(user)
};

function s(user)
{
    for(var i=0;i<user.length;i++)
    {
        user[i].addEventListener('click',async (e)=>{
            e.preventDefault();
            clearInterval(dom);
            chat.classList.toggle('active');
            UserContainr.classList.remove('active');
            initial.classList.toggle('active');
            let n=e.target.innerText;
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
}

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
            chatSec.innerHTML+=`<ul class="log">${mssg}</ul><br><br>`
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

let createGroup=document.getElementById('new-group');
createGroup.addEventListener('click',(e)=>{
    e.preventDefault();
    GForm.classList.remove('active');
    e.target.classList.toggle('active');
    GroupContainr.classList.toggle('active');
})

let cancel=document.getElementById('back');
cancel.addEventListener('click',(e)=>{
    e.preventDefault();
    createGroup.classList.remove('active');
    GForm.classList.toggle('active');
    if(group.classList.contains('active'))
    {
        group.classList.remove('active');
    }
    Group();
})

let create=document.getElementById('create');
create.addEventListener('click',(e)=>{
    e.preventDefault();
    let gName=document.getElementById('group-name').value;
    let obj={token,gName};
    axios.post('http://localhost:3000/create/group',obj)
    .then(res=>{
        console.log(res.data);
        Gchat.innerHTML='';
        gChat.classList.toggle('active');
        createGroup.classList.remove('active');
        f.classList.toggle('active');
        GForm.classList.toggle('active');
        initial.classList.toggle('active');
        let gN=document.querySelector('.g-name');
        gN.innerText=gName;
    }).catch(err=>console.log(err));
})

let gBack=document.getElementById('g-allchats');
gBack.addEventListener('click',gB)

function gB(e)
{
    clearInterval(gMessg);
    a.classList.remove('active');
    b.classList.remove('active');
    delGroup.classList.remove('active');
    gChat.classList.remove('active');
    GroupContainr.classList.remove('active');
    initial.classList.remove('active');
    f.classList.remove('active');
    Group();
}

let addP=document.getElementById('add-participants');
addP.addEventListener('click',async (e)=>{
    e.preventDefault();
    let gName=document.querySelector('.g-name').innerText;
    let par=document.getElementById('p-number').value;
    let obj={gName,par};
    try{
       await axios.post('http://localhost:3000/group/addp',obj).then(res=>{
        console.log(res.data);
        popup(res.data.message);
    })
    }
    catch(err)
    {
        console.log(err);
    }
    
})

let gmessge=document.getElementById('g-snd-mssg');
gmessge.addEventListener('click',async (e)=>{
    e.preventDefault();
    let gm=document.getElementById('g-messg').value;
    let gName=document.querySelector('.g-name').innerText;
    let obj={gm,gName,token};
    try{
       await axios.post('http://localhost:3000/group/addM',obj)
       .then(r=>{
        console.log(r.data);
        var m=document.getElementById('g-messg');
            m.value='';
            Gchat.innerHTML+=`<ul class="log">${gm}</ul>
                              <br><ul class="log-1">you</ul><br><br>`;
    })
    }
    catch(err)
    {
        console.log(err);
    }
    
})

function popup(data)
{
  let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText=data;
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
}

let n=document.querySelector('.g-na');
let n1=document.querySelector('.g-name');
let aMem=document.querySelector('.all-members');
let aParticipants=document.getElementById('all-participants');
aParticipants.addEventListener('click',async (e)=>{
    e.preventDefault();
    clearInterval(gMessg);
    n.innerText=n1.textContent;
   aMem.classList.toggle('active');
   gChat.classList.remove('active');
   f.classList.remove('active');
   let gN=f.id;
   try{
    await axios.get('http://localhost:3000/group/memN',{headers:{'token':token,'group':gN}})
    .then(res=>{
        console.log(res.data);
        allMembers(res.data);
    })
   }
   catch(err)
   {
    console.log(err);
   }
})

function allMembers(data)
{
    for(var i=0;i<data.length;i++)
    {
        if(data[i].admin=='true(su)')
        {
            aM.innerHTML+=`<ul class="member">${data[i].name} (SUPER ADMIN)</ul><hr><br>`
        }
        if(data[i].admin==='true')
        {
            aM.innerHTML+=`<ul class="member">${data[i].name} (ADMIN) <button id=${data[i].id} class="rema">Remove Admin</button></ul><hr><br>`
        }
        if(data[i].admin==='false')
        {
            aM.innerHTML+=`<ul class="member">${data[i].name}<button id=${data[i].id} class="rem">Remove</button><button id=${data[i].id} class="madmin">Make Admin</button></ul><hr><br>`
        }
        
    }
   let rema=document.getElementsByClassName('rema');
    remAdmin(rema); 

    let rem=document.getElementsByClassName('rem');
    remove(rem);

    let mad=document.getElementsByClassName('madmin');
    MakeAd(mad);
}



function remAdmin(data)
{
    for(var i=0;i<data.length;i++)
    {
     data[i].addEventListener('click',async (e)=>{
         try{
             await axios.get(`http://localhost:3000/group/Radmin`,{headers:{'id':e.target.id,'group':n.innerText,'token':token}})
             .then(res=>{
                 console.log(res.data);
                 popup('admin removed');
                 e.target.parentElement.innerHTML=`${res.data.name}<button id=${res.data.id} class="rem">Remove</button><button id=${res.data.id} class="madmin">Make Admin</button>`
             })
         }
         catch(err)
         {
             console.log(err);
         }
     })
    }

}

function MakeAd(data)
{
    for(var i=0;i<data.length;i++)
    {
     data[i].addEventListener('click',async (e)=>{
         try{
             await axios.get(`http://localhost:3000/group/admin`,{headers:{'id':e.target.id,'group':n.innerText,'token':token}})
             .then(res=>{
                 console.log(res.data);
                 popup(res.data.message);
                 e.target.parentElement.innerHTML=`${res.data.name}(ADMIN)<button id=${res.data.id} class="rema">Remove Admin</button>`
             })
         }
         catch(err)
         {
             console.log(err);
         }
     })
    }
    
}

function remove(rem)
{
   for(var i=0;i<rem.length;i++)
   {
    rem[i].addEventListener('click',async (e)=>{
        try{
            await axios.get(`http://localhost:3000/group/member`,{headers:{'id':e.target.id,'group':n.innerText}})
            .then(res=>{
                console.log(res.data);
                e.target.parentElement.remove();
                popup(res.data.message);
            })
        }
        catch(err)
        {
            console.log(err);
        }
    })
   }
}

let mBack=document.getElementById('m-back');
mBack.addEventListener('click',(e)=>{
    aMem.classList.remove('active');
    gChat.classList.toggle('active');
    f.classList.toggle('active');
    aM.innerHTML='';
    groInt(n.innerText);
});

let nn1=document.querySelector('.n-g-na');
let nn=document.querySelector('.n-all-members');
let am1=document.querySelector('.n-m-con');
a.addEventListener('click',async (e)=>{
    e.preventDefault();
    nn.classList.toggle('active');
    gChat.classList.remove('active');
    clearInterval(gMessg);
    nn1.textContent=n1.textContent;
    let gN=nn1.innerText;
    try{
        await axios.get('http://localhost:3000/group/memN',{headers:{'token':token,'group':gN}})
        .then(res=>{
            console.log(res.data);
            for(var i=0;i<res.data.length;i++)
            {
                if(res.data[i].admin=='true')
                {
                    am1.innerHTML+=`<ul class="member">${res.data[i].name} (ADMIN)</ul><hr><br>`;
                }
                else{
                    am1.innerHTML+=`<ul class="member">${res.data[i].name}</ul><hr><br>`;
                }
            }
        })
       }
       catch(err)
       {
        console.log(err);
       }
});

let nn3=document.getElementById('n-m-back');
nn3.addEventListener('click',(e)=>{
    nn.classList.remove('active');
    gChat.classList.toggle('active');
    am1.innerHTML='';
    groInt(nn1.innerText);
});

delGroup.addEventListener('click',async(e)=>{
    try{
        await axios.delete(`http://localhost:3000/group/del/${n1.innerText}`)
        .then(res=>{
            console.log(res.data);
            popup(res.data.message);
            GroupContainr.classList.remove('active');
            initial.classList.remove('active');
            gChat.classList.remove('active');
            clearInterval(gMessg);
            Group();
        })
    }
    catch(err)
    {
        console.log(err);
    }
})

b.addEventListener('click',async(e)=>{
    try{
        await axios.get(`http://localhost:3000/group/leave`,{headers:{'token':token,'group':n1.innerText}})
        .then(res=>{
            console.log(res.data);
            popup(res.data.message);
            gB();
        })
    }
    catch(err)
    {
        console.log(err);
    }
});