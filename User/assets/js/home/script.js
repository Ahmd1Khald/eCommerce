// ! Category comment
function _click(){
    debugger;
    console.log("SASA")
    var element=document.getElementById("sidebar");
    var ss=document.getElementById("display");
let isVisible = window.getComputedStyle(ss).display == "none";

if (isVisible) {
    console.log("العنصر مرئي");
    ss.style.display="block";
    ss.appendChild(element);
    // ss.innerHTML=ss.appendChild(element);
}
else {
    console.log("العنصر مخفي");
    ss.removeChild(element);
    ss.style.display="none";
    }

}
//////setinterval
var myDiv=document.getElementById("imageDiv");
 var images=["../../resourses/phone1.jpg","../../resourses/phone2.jpg","../../resourses/phone3.jpg"]
var image=document.createElement("img");
image.src=images[0];
image.style.width="50%";
image.style.height="100%";
var counter=0;
function myInterval(){
    
}
var intereval=setInterval(function(){
    if(counter>images.length-1){
        counter=0;
        image.src=images[counter];
    }
    else if(counter==images.length-1){
        image.src=images[counter];
        counter=0;
    }
    else{
        image.src=images[counter];
        counter++;
    }
},3000)
myDiv.appendChild(image);
var button1=document.getElementById("divbutton1");
var button2=document.getElementById("divbutton2");
myDiv.addEventListener("mouseover",function(){
    button1.style.display="block";
    button2.style.display="block";
})
myDiv.addEventListener("mouseout",function(){
    button1.style.display="none";
    button2.style.display="none";
})
button1.addEventListener("click",function(){
    console.log(counter);
    if(counter>images.length-1){
        counter=0;
        image.src=images[counter];
    }
    else if(counter==images.length-1){
        image.src=images[counter];
        counter=0;
    }
    else{
        image.src=images[counter];
        counter++;
    }
})
button2.addEventListener("click",function(){   
        if(counter<0){
            counter=images.length-2;
            image.src=images[counter];
        }
        else if(counter==0){
            counter=images.length-1;
            image.src=images[counter];
        }
        else{
            image.src=images[counter-1];
            counter--;
        }
})

/////////////////////////////////// !Add To Cart
var cartCounter=0;
function AddToCart(event){
    
    debugger;
    var ss=document.getElementById("cartbadge");
    ss.style.display="block";
    ss.textContent=cartCounter+1;
    cartCounter++;
    //! كنت عايز اعرض بيانات الحاجه الي اتضافت في صفحه ال cart بس لازم local storage
    // var element=document.getElementById(event.target.parentElement.id) 
    // console.log(element.id);
    // var cartItemImg=document.createElement("img");
    // cartItemImg.src=element.children[0].children[0].src;
    // console.log(cartItemImg.src);
    // document.getElementById("cartItems").appendChild(ss);
}
///////////////////////////////////////////////////flash sale
const updateCountdown = () => {
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    let dayValue = parseInt(days.textContent);
    let hourValue = parseInt(hours.textContent);
    let minuteValue = parseInt(minutes.textContent);
    let secondValue = parseInt(seconds.textContent);
    secondValue--;
    
    if (secondValue < 0) {
        secondValue = 59;
        minuteValue--;
        
        if (minuteValue < 0) {
            minuteValue = 59;
            hourValue--;
            
            if (hourValue < 0) {
                hourValue = 23;
                dayValue--;
            }
        }
    }
    
    days.textContent = dayValue.toString().padStart(2, '0');
    hours.textContent = hourValue.toString().padStart(2, '0');
    minutes.textContent = minuteValue.toString().padStart(2, '0');
    seconds.textContent = secondValue.toString().padStart(2, '0');
};

setInterval(updateCountdown, 1000);
