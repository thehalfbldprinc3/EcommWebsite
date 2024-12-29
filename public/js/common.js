let allLikeButton=document.querySelectorAll('.like-btn');

async function likeButton(productID, btn){
    try{
        let response = await axios({
            method: 'post',
            url: `/products/${productID}/like`,
            headers : {'X-Requested-With' : 'XMLHttpRequest'}
        })
        // console.log(response);
        if(btn.children[0].classList.contains('fa-regular')){

            btn.children[0].classList.remove('fa-regular')
            btn.children[0].classList.add('fa-solid')
        }else{
            btn.children[0].classList.remove('fa-solid')
            btn.children[0].classList.add('fa-regular')
        }
    } catch(e){
        if(e.response.status === 401){
            window.location.replace('/login');
            console.log(e.message , 'error for the redirect window line')
        }
    }
}
for(let btn of allLikeButton){
    btn.addEventListener('click' ,  ()=>{
        let productID =  btn.getAttribute('product-id');
        likeButton(productID , btn);
    })
}