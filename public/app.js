const host = "http://localhost:5000/"

const loading = document.querySelector(".loading")


document.querySelector("#get-video-info-btn").addEventListener("click", function() {

    
    let videoURL = document.querySelector("#videoURL").value.trim()

    if(videoURL.length == 0){
        alert("Please enter youtube video link!")
        return;
    }

    fetch(`${host}videoInfo?videoURL=${videoURL}`).then(function(response) {
        return response.json()
    }).then(function(data){
        console.log(data)

        if(data.status === 400){
            alert("Video not found. Check the link.")
        }
         
        loading.style.display = "block"

        let detailsNodes = {
            thumbnail: document.querySelector(".video-data .thumbnail img"),
            title : document.querySelector(".video-data .info h2"),
            description : document.querySelector(".video-data .info p"),
            videoURL : document.querySelector(".video-data .controls #video-url"),
            downloadOptions : document.querySelector(".video-data .controls #download-options")
        }

        let html = ""

        for(let i=0; i < data.formats.length; i++){
            if(data.formats[i].container != "mp4"){
                continue;
            }

            html += `
            <option value="${data.formats[i].itag}">
                ${data.formats[i].container.toUpperCase()} - ${data.formats[i].qualityLabel}
            </option>
            `
            // video cover photo (HD thumbnail photo)
            detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length -1].url
            detailsNodes.title.innerText = data.videoDetails.title
            detailsNodes.description.innerText = data.videoDetails.description
            detailsNodes.videoURL.value = videoURL
            detailsNodes.downloadOptions.innerHTML = html

            document.querySelector(".video-data").style.display = "block"
            document.querySelector(".video-data").scrollIntoView({
                behavior : "smooth"
            })
        }

        loading.style.display = "none"


    }).catch(function(error){
        loading.style.display = "none"
    })
})

document.querySelector("#download-btn").addEventListener("click", function(){
    let videoURL = document.querySelector("#video-url").value
    let itag = document.querySelector("#download-options").value

    // Yeni sekmede açar
    // window.open(`${host}download?videoURL=${videoURL}&itag=${itag}`)

    window.location.assign(`${host}download?videoURL=${videoURL}&itag=${itag}`);

})

