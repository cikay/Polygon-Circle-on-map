
let poly, map
let polygonMarkers = []
let clickedFirstPolygonMarker = false
let path

function initMap(){

    let circle
    
    let poly = new google.maps.Polyline({
        strokeColor: "#2bb20e",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        
        
    })
    map = new google.maps.Map(document.getElementById('map'), {

        zoom: 10,
        center: {lat: 37.066666, lng: 37.383331},
        mapTypeId: 'terrain'

    })

    map.addListener('click', (event) => {

        if(circle) return

        if(!clickedFirstPolygonMarker){

            path = poly.getPath()

            polygonMarker = addPolygonMarker(event.latLng, path.getLength())

            polygonMarkers.push(polygonMarker)
        
            path.push(event.latLng)

            let firstpolymarker = polygonMarkers[0]

            firstpolymarker.addListener('click', () =>{

                path.push(firstpolymarker.position)
                clickedFirstPolygonMarker = true
            })
        }
    })

    poly.setMap(map)


    document.getElementById('draw').addEventListener('click', () =>{

        let radius = document.getElementById('radius').value

        if(path) return 

        if(!circle){

            circle = new google.maps.Circle({
                strokeOpacity: 0.0,
                strokeColor: '#ff0000',
                center: {lat: 37.066666, lng: 37.383331},
                map: map,
                radius: parseInt(radius)*1000,
            
            })

        }
        else circle.setRadius(parseInt(radius)*1000)
        
    })
}


function addPolygonMarker(location, length){

    const marker = new google.maps.Marker({

        position: location,
        title: `#${length}`,
        icon: './images/point4.png',
        map: map,
        

    })

    return marker
}

