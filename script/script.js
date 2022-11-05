let API = "AIzaSyCwkM2TfT5Kz0CiPWhKHv08CXod-r-_kUg";
// let API = "AlzaSyAw1V5DhZoOC3MhpO0vTvWsRjWglt5AMvU";
let first;


let load = async () =>{
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&key=${API}&maxResults=10`);

        let {items}= await res.json(); /* get data with key "items" in the obj*/ //destructuring
        first = items
        console.log(first);
        appenData(first);
    } catch (error) {
        
    }  
}

let getData = async () =>{
    try {
        let query = document.querySelector("#query").value;
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${API}&part=snippet&maxResults=20`);

        let {items}= await res.json(); /* get data with key "items" in the obj*/ //destructuring

        appenData(items);
    } catch (error) {
        
    }
}
let appenData = (data) =>{
    document.querySelector("#searchRslt").innerHTML = ""
    data.forEach(({snippet,id:{videoId},snippet:{thumbnails},snippet:{channelTitle},snippet:{title}}) =>{  //destructuring
        let url = thumbnails.default.url;

        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = url;
        let name = document.createElement("h4");
        name.innerText = title;
        let channel = document.createElement("p");
        channel.innerText = channelTitle;
        div.append(img,name,channel);
        div.style.cursor = "pointer"
        div.onclick = () =>{
            let data = {
                snippet : snippet,
                vdoId : videoId
            }
            localStorage.setItem("clicked_video",JSON.stringify(data));
            window.location.href = "./video.html"
        }
        document.querySelector("#searchRslt").append(div);

    })
}

function home(){
    window.location.href = "./index.html"
}

function filterFn() {
    var filt = document.querySelector("#filter").value;
    filt = filt.toLowerCase()
    let firstnew = [];
    first.forEach((ele)=>{
        channelTitle = ele.snippet.channelTitle.toLowerCase();
         if(channelTitle.includes(filt)){
            firstnew.push(ele)
         }
    })
    appenData(firstnew)
  }