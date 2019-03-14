'use strict';
// test source https://static3.businessinsider.com/image/4f5112e169bedd1526000061/facebook-open-graph.jpg
const popupMarkup =  `
<div class="">
<div class="transparencia-popup">
    <h3>Persona Lorem</h3>
    <img src="https://www.elespectador.com/sites/default/files/fiscal_martinez_-_cristian_garavito_0.jpg" width="360">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada felis mi, semper vestibulum lectus vehicula vitae. Sed facilisis...</p>
    <a href="https://www.dejusticia.org" target="_blank">Más en www.ejemplo.dev</a>
    <h4>Red de Relaciones</h4>
    <img src="https://tsicilian.files.wordpress.com/2012/05/social-graph.png" width="360">
    <ul>
        <li data-transparency-action="close">Cerrar</li>
    </ul>

</div>
`;
var transparenciaPopupContainer = document.createElement('div'), transparenciaStyle = document.createElement('style'), transparenciaPopup, transparenciaPopupHeader, teaserElement, quienesquien, pageBody;
transparenciaPopupContainer.innerHTML = popupMarkup;
pageBody = document.querySelector('body');
pageBody.appendChild( transparenciaPopupContainer );
teaserElement = document.querySelector('.node-teaser');
teaserElement.innerHTML = `
<p><span class="transparency-item transparency-item--open" data-transparency-popup="false" data-transparency-score="30">Leonardo Espinosa</span> fue elegido esta semana como fiscal ad hoc para las investigaciones que se llevan a cabo en <span class="transparency-item" data-transparency-score="60">Odebrecht</span>. Sin embargo, un documento revelaría que desde hace más de cinco años conoce al fiscal general <span class="transparency-item" data-transparency-score="90">Néstor Humberto Martínez</span>.</p>
`;
transparenciaStyle.innerHTML = `
.transparencia-popup {
    background-color: #fc0;
    box-sizing: border-box;
    display: none;
    padding: 1rem;
    left: 50%;
    left: calc( 50% - 400px);
    top: 2rem;
    width: 400px;
    z-index: 9999;
}
.transparencia-popup--open {
    display: block;
    position: fixed;
}
.transparency-item {
    font-weight: 600;
    color: #222;
    color: #600;
    border-bottom: 2px solid #000;
    position: relative;
    white-space: pre;
}
.transparency-item::after {
    background: rgba(0,0,0,0.75);
    border-radius: 0.1em;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
    content: " ";
    width: 0;
    height: 1.2em;
    left: 0;
    position: absolute;
    -webkit-transform: skewY(-5deg) rotate(5deg);
    transform: skewY(-5deg) rotate(5deg);
}
.transparency-item[data-transparency-score="100"]::after {
    width: 100%;
}
.transparency-item[data-transparency-score="90"]::after {
    width: 90%;
}
.transparency-item[data-transparency-score="80"]::after {
    width: 80%;
}
.transparency-item[data-transparency-score="70"]::after {
    width: 70%;
}
.transparency-item[data-transparency-score="60"]::after {
    width: 60%;
}
.transparency-item[data-transparency-score="50"]::after {
    width: 50%;
}
.transparency-item[data-transparency-score="40"]::after {
    width: 40%;
}
.transparency-item[data-transparency-score="30"]::after {
    width: 30%;
}
.transparency-item[data-transparency-score="20"]::after {
    width: 20%;
}
.transparency-item[data-transparency-score="10"]::after {
    width: 10%;
}
`;
document.querySelector('body').appendChild( transparenciaStyle );
transparenciaPopup = document.querySelector('.transparencia-popup');
transparenciaPopupHeader = transparenciaPopup.querySelector( 'h3');
document.addEventListener( 'click', function( event ){
    let entityName = '';
    if ( event.target.classList.contains( 'transparency-item' ) ){
        entityName = event.target.innerText;
        transparenciaPopupHeader.innerText = entityName;
        transparenciaPopup.classList.add( 'transparencia-popup--open' );
        return;
    }
    if ( 'close' === event.target.dataset.transparencyAction ){
        transparenciaPopup.classList.remove( 'transparencia-popup--open' );
    }
});
var sillaFetch = fetch('https://raw.githubusercontent.com/Dejusticia/opaqueness-chrome-addon/develop/datos/nodesjsonv2.json')
    .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.status);
        }
        return resp;
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log('myJson bruto = ' + JSON.stringify(myJson));
        console.log('myJson bruto parsed = ' + JSON.parse(JSON.stringify(myJson)));
        var object = JSON.parse(JSON.stringify(myJson));
        console.log('object.nodes = ' + object.nodes);
        object.nodes.forEach(function (item) {
            console.log(item); // key
            console.log(item.name); // value

        });
        return object.nodes;
    });