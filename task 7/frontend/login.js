let login=document.getElementById('login');

login.addEventListener('click',async (e)=>{
    e.preventDefault();
    let phone=document.getElementById('phone').value;
    let pass=document.getElementById('password').value;

    if(phone=='')
   {
    let e='*phone cannot empty';
    popup(e);
    return;
   }
   if(pass=='')
   {
    let p='*password cannot empty';
    popup(p);
    return;
   }

    let obj={phone,pass};
    try{
      await  axios.post('http://localhost:3000/login',obj)
      .then(res=>{
        console.log(res.data);
        localStorage.setItem('token',res.data.token);
        window.location.href='./chat.html'
      })
    }
    catch(err)
    {
        console.log(err);
        popup(err.response.data.message);
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