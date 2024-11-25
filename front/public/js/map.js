// Définition de l'icône personnalisée
const customIcon = L.icon({
    iconUrl: './images/tree.svg', // Le chemin vers ton icône
    iconSize: [20, 20],     // Taille de l'icône
    iconAnchor: [10, 10],   // Point de l'icône qui correspond à la position du marqueur
    popupAnchor: [0, -10]   // Position du popup par rapport à l'icône
});

// Déclaration de la variable `map` à un niveau supérieur
let map;

window.onload = async function () {
    // Initialisation de la carte Leaflet centrée sur Paris
    map = L.map("map").setView([48.866667, 2.333333], 12);

    // Ajout des tuiles de la carte
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Appel de la fonction pour récupérer les données après l'initialisation de la carte
    await fetchData(); // Appelez fetchArbres pour charger les données initiales

    // Attacher l'événement de mouvement uniquement après l'initialisation de la carte
    map.on('moveend', fetchData);
};

async function fetchData() {

    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    const limit = 1000; // Nombre maximum d'arbres par appel

    try {
        const params = new URLSearchParams({
            'rows': limit,
            'geofilter.bbox': `${southWest.lat},${southWest.lng},${northEast.lat},${northEast.lng}`
        });

        const response = await fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=les-arbres&${params.toString()}`); // Effectue la requête vers l'API

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`); // Gère les erreurs HTTP
        }

        const data = await response.json(); // Convertit la réponse en JSON
        console.log(data);
        createTree(data.records)

        return data; // Retourne les données
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return null; // Retourne null en cas d'erreur
    }
}



// Fonction pour créer les marqueurs d'arbres
async function createTree(data) {
    // Supprimez tous les marqueurs précédents avant d'ajouter les nouveaux
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    data.forEach(tree => {
        const coordLon = tree.geometry.coordinates[0]; // Récupération de la longitude
        const coordLat = tree.geometry.coordinates[1]; // Récupération de la latitude

        const genre = tree.fields.libellefrancais; // Récupération du genre
        const stadeDev = tree.fields.stadedeveloppement; // Récupération du stade de développement

        // Création et ajout du marqueur à la carte
        const marker = L.marker([coordLat, coordLon], {
            icon: customIcon
        }).addTo(map);

        // Liaison d'une popup au marqueur
        marker.bindPopup(`<strong>Genre : ${genre}</strong><br>Stade de développement: ${stadeDev}`);
    });
}