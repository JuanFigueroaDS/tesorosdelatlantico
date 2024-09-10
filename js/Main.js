/* *************** Cambio del la malla del mundo ******************* */

//Selecciona las clases de los check de la malla
let selectCheckMun = document.querySelectorAll('.leaflet-control-layers-selector');

selectCheckMun.forEach(element => {
    element.addEventListener("change",function (event) {
        if (selectCheckMun[0].checked === true && selectCheckMun[1].checked === false) {
            changeMun(0);
        } else if (selectCheckMun[1].checked === true && selectCheckMun[0].checked === false) {
            changeMun(1);
        } else if (selectCheckMun[0].checked === true && selectCheckMun[1].checked === true){
            changeMun(0);
        } else {
            layer_Mun_atlantico_2.remove();
        }
    })
});

function changeMun(valueJson) {

    let style_Mun;

    if (valueJson === 0) {
        style_Mun = {
            pane: 'pane_Mun_atlantico_2',
            opacity: 1,
            color: '#33691e',
            // color: '#ffff',
            dashArray: '',
            lineCap: 'square',
            lineJoin: 'bevel',
            weight: 2.0,
            fillOpacity: 0,
            interactive: false,
        }
    } else if (valueJson === 1) {
        style_Mun = {
            pane: 'pane_Mun_atlantico_2',
            opacity: 1,
            // color: '#33691e',
            color: '#ffff',
            dashArray: '',
            lineCap: 'square',
            lineJoin: 'bevel',
            weight: 2.0,
            fillOpacity: 0,
            interactive: false,
        }
    }

    //Elimina la malla del atlantico , ya creada
    layer_Mun_atlantico_2.remove();

    layer_Mun_atlantico_2 = new L.geoJson(json_Mun_atlantico_2[valueJson], {
        attribution: '',
        interactive: false,
        dataVar: 'json_Mun_atlantico_2',
        layerName: 'layer_Mun_atlantico_2',
        pane: 'pane_Mun_atlantico_2',
        style: style_Mun,
    });

    bounds_group.addLayer(layer_Mun_atlantico_2);
    map.addLayer(layer_Mun_atlantico_2);
}

/* ************ Modal y Cambio de puntos y rutas  ***************** */

// Obtener el valor del input
let selectOpcion = document.getElementById("selectOpcion");

// selectOpcion.addEventListener("change", function(e) {
//     changeRouteSpot(e.target.value);
// })

// Escuchar el evento 'message' para recibir datos de la página principal
window.addEventListener('message', function(event) {
    // Aquí puedes validar el origen del mensaje para mayor seguridad
    // if (event.origin !== 'https://tudominio.com') return;

    // Obtener el mensaje enviado desde la página principal
    const mensaje = event.data;

    // Mostrar el mensaje en la página del iframe
    // document.getElementById('mensajeRecibido').textContent = 'Mensaje recibido: ' + mensaje;

    // console.log(layer_Puntosturisticos_4);
    // let valueSelect = e.target.options.selectedIndex;

    changeRouteSpot(mensaje)

});

function changeRouteSpot(value) {

    let jsonSpot;
    let jsonRoute;

    if (value === "value2") {
        jsonSpot = json_Puntosturisticos_3[1];
        jsonRoute = json_Ruta_4[1];
    } else if (value === "value3") {
        jsonSpot = json_Puntosturisticos_3[2];
        jsonRoute = json_Ruta_4[2];
    } else if (value === "value4") {
        jsonSpot = json_Puntosturisticos_3[3];
        jsonRoute = json_Ruta_4[2];
    } else {
        jsonSpot = json_Puntosturisticos_3[0];
        jsonRoute = json_Ruta_4[0];
    }
    

    // console.log(value);
    // console.log(jsonSpot);
    // console.log(layer_Puntosturisticos_3);
    

    //Remueve los marcardores
    layer_Puntosturisticos_3.remove();

    //Marcadores - puntos
    layer_Puntosturisticos_3 = new L.geoJson(jsonSpot, {
        attribution: '',
        interactive: true,
        dataVar: 'json_Puntosturisticos_3',
        layerName: 'layer_Puntosturisticos_3',
        pane: 'pane_Puntosturisticos_3',
        onEachFeature: modal_Puntosturisticos_4,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.circleMarker(latlng, style_Puntosturisticos_3_0(feature));
        },
    });

    bounds_group.addLayer(layer_Puntosturisticos_3);
    map.addLayer(layer_Puntosturisticos_3);

    //Remueve las rutas
    layer_Ruta_4.remove();

    //Rutas
    layer_Ruta_4 = new L.geoJson(jsonRoute, {
        attribution: '',
        interactive: false,
        dataVar: 'json_Ruta_4',
        layerName: 'layer_Ruta_4',
        pane: 'pane_Ruta_4',
        // onEachFeature: pop_Ruta_4,
        style: style_Ruta_4_0,
    });

    bounds_group.addLayer(layer_Ruta_4);
    map.addLayer(layer_Ruta_4);

}

/* ****** Nuevo modal ****** */
// function showModal(name, img, description, url) {
//     const modal = document.getElementById("myModal");
//     const placeName = document.getElementById("place-name");
//     const placeImg1 = document.getElementById("place-img1");
//     const placeImg2 = document.getElementById("place-img2");
//     const placeImg3 = document.getElementById("place-img3");
//     const placeDescription = document.getElementById("place-description");
//     const placeUrl = document.getElementById("place-url");
//     console.log(placeImg2)
//     console.log(placeImg3)

//     placeName.textContent = name;
//     placeImg1.src = img[0];
//     placeImg2.src = img[1];
//     placeImg3.src = img[2];
//     placeDescription.textContent = description;
//     placeUrl.href = url;

//     modal.style.display = "block";
// }

// Para mostrar el modal
function showModal(name, img, description, url) {
    const modal = document.getElementById("myModal");
    const placeName = document.getElementById("place-name");
    const placeImg1 = document.getElementById("place-img1");
    const placeImg2 = document.getElementById("place-img2");
    const placeImg3 = document.getElementById("place-img3");
    const placeDescription = document.getElementById("place-description");
    const placeUrl = document.getElementById("place-url");

    placeName.textContent = name;
    placeImg1.src = img[0];
    placeImg2.src = img[1];
    placeImg3.src = img[2];
    placeDescription.textContent = description;
    placeUrl.href = url;

    modal.style.display = "block";
}

// Cerrar el modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/* ********* Carrusel *********** */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

function moveSlide(n) {
    showSlide(currentSlide + n);
}


showSlide(currentSlide);