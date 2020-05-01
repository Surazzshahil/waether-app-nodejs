const searchBtn = document.querySelector('#searchBTN')
const search = document.querySelector('input')
const text1 = document.querySelector('#textmsg1')
const text2 = document.querySelector('#textmsg2')
const text3 = document.querySelector('#textmsg3')
const text4 = document.querySelector('#textmsg4')


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchVal = search.value
    const api = `/weather?address=${searchVal}`;
    text1.textContent = 'Loading...'
    text2.textContent = ' '
    text3.textContent = ' '
    fetch(api).then((res)=>{

        res.json().then((data)=>{
            if(data.error) {
                text1.style.color="red"
                text1.innerHTML = data.error
            }else {
                console.log(data.summary)
                text1.style.color="black"
                text1.textContent= data.placeName
                text3.textContent = 'Temperature :'+Math.floor((data.temperature-32)*5/9)+'°C'
                text2.textContent=data.summary
            }
        })
    })
})