// import { InteractionManager } from './node_modules/three.interactive';
const planets = {
  sun: {
    name: 'Sun',
    info: {
      description: 'The Sun is the star at the center of our solar system. It is a nearly perfect sphere of hot plasma, with internal convective motion generating a magnetic field via a dynamo process. The Sun provides the energy necessary for life on Earth and influences all the objects in the solar system with its gravity.',
      radius: '696,340 km'
    }
  },
  mercury: {
    name: "Mercury",
    info: {
      description: "Mercury is the closest planet to the Sun and the smallest in our solar system. It has no atmosphere, and its surface temperatures vary drastically between day and night.",
      distanceFromSun: "57.9 million km",
      orbitalPeriod: "88 Earth days",
      radius: "2,439.7 km"
    }
  },
  venus: {
    name: "Venus",
    info: {
      description: "Venus is the second planet from the Sun and is known for its thick, toxic atmosphere. Its surface is hotter than any other planet in the solar system due to the greenhouse effect.",
      distanceFromSun: "108.2 million km",
      orbitalPeriod: "225 Earth days",
      radius: "6,051.8 km"
    }
  },
  earth: {
    name: "Earth",
    info: {
      description: "Earth is the third planet from the Sun and the only planet known to support life. It has one natural satellite, the Moon.",
      distanceFromSun: "149.6 million km",
      orbitalPeriod: "365.25 Earth days",
      radius: "6,371 km"
    }
  },
  mars: {
    name: "Mars",
    info: {
      description: "Mars, the fourth planet from the Sun, is often called the 'Red Planet' because of its reddish appearance caused by iron oxide on its surface. It's a prime candidate for future human exploration.",
      distanceFromSun: "227.9 million km",
      orbitalPeriod: "687 Earth days",
      radius: "3,389.5 km"
    }
  },
  jupiter: {
    name: "Jupiter",
    info: {
      description: "Jupiter is the largest planet in our solar system. It's known for its massive size, Great Red Spot (a giant storm), and many moons, including the four largest: Io, Europa, Ganymede, and Callisto.",
      distanceFromSun: "778.5 million km",
      orbitalPeriod: "12 Earth years",
      radius: "69,911 km"
    }
  },
  saturn: {
    name: "Saturn",
    info: {
      description: "Saturn is famous for its stunning ring system, which is made up of ice and rock. It's the second-largest planet in the solar system and has numerous moons, including Titan, its largest.",
      distanceFromSun: "1.43 billion km",
      orbitalPeriod: "29 Earth years",
      radius: "58,232 km"
    }
  },
  uranus: {
    name: "Uranus",
    info: {
      description: "Uranus is unique for its sideways rotation and faint ring system. It's an ice giant with a frigid atmosphere composed mainly of hydrogen, helium, and methane.",
      distanceFromSun: "2.87 billion km",
      orbitalPeriod: "84 Earth years",
      radius: "25,362 km"
    }
  },
  neptune: {
    name: "Neptune",
    info: {
      description: "Neptune, the furthest planet from the Sun, is a deep blue ice giant. Its most prominent feature is the Great Dark Spot, a storm system similar to Jupiter's Great Red Spot.",
      distanceFromSun: "4.5 billion km",
      orbitalPeriod: "165 Earth years",
      radius: "24,622 km"
    }
  },
  asteroidBelt: {
    name: 'The Asteroid Belt',
    info: {
        description: 'The asteroid belt lies between Mars and Jupiter and contains thousands of rocky bodies. Ceres, the largest object here, is considered a dwarf planet.'
    }
  },
  comets: {
      name: 'Comets',
      info: {
          description: 'Comets are icy bodies that originate from the outer solar system. When they approach the Sun, their ice turns to gas, forming a bright tail visible from Earth.'
      }
  },
  kuiperBelt: {
      name: 'The Kuiper Belt',
      info: {
          description: 'The Kuiper Belt is a region beyond Neptune filled with icy bodies and dwarf planets, including Pluto. It\'s similar to the asteroid belt but far larger and more distant.'
      }
  }
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const solarSystem = new THREE.Group();
scene.add(solarSystem);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.addEventListener('click', (event) => {
  console.log("hii")
});
var canvas = document.createElement("CANVAS");
canvas.width = 128;
canvas.height = 128;
var texture = new THREE.CanvasTexture(canvas);

const starCount = 10000;
const starGroup = new THREE.Group();

// Create Sun
const sunGeometry = new THREE.SphereGeometry(4.2, 42, 42); 
const sunTexture = new THREE.TextureLoader().load(
    'sun_texture.jpg',
    () => { console.log('Sun texture loaded'); },
    undefined,
    (err) => { console.error('Error loading Sun texture:', err); }
  );
  const sunMaterial = new THREE.MeshStandardMaterial({
    map: sunTexture,
    emissive: new THREE.Color(0xffff00), // Set the emissive color to yellow
    emissiveMap: sunTexture, // Set the emissive map
    emissiveIntensity: 1.0 // Adjust the intensity as needed
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.name=planets.sun.name
sun.info={
  ...planets.sun.info
}
solarSystem.add(sun);

function createCometTail(xPos,yPos,zPos,angle,cometLength,infor) {
  const particleCount = 1500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3); // x, y, z for each particle
  const velocities = new Float32Array(particleCount * 3); // velocity for each particle
    // Define the length of the tail
  const tailLength = cometLength; // Length of the tail effect
  for (let i = 0; i < particleCount; i++) {
      // Set random positions within a small area to simulate fire's base
      const distance = Math.random() * tailLength;
        positions[i * 3] = (Math.random() - 0.5)*15;
        positions[i * 3 + 1] = -distance; // Start at the base
        positions[i * 3 + 2] = (Math.random() - 0.5)*10;

      // Set random upward velocity
      velocities[i * 3] = Math.random() * 0.05 - 0.025;
      velocities[i * 3 + 1] = Math.random() * 0.1 + 0.05;
      velocities[i * 3 + 2] = Math.random() * 0.05 - 0.025;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      map: new THREE.TextureLoader().load('fire.jpg'),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
  });

  // Create the particle system
  const fireParticles = new THREE.Points(geometry, material);
  fireParticles.position.set(xPos,yPos,zPos); // Make sure it's positioned correctly
  fireParticles.rotateZ(angle); // Rotate 45 degrees around the Z axis
  fireParticles.name=infor.name;
  fireParticles.info={
    ...infor.info
  }
  scene.add(fireParticles);

  return { fireParticles, particleCount, velocities ,tailLength};
}

// Call the function to create the comet tail
const cometTail = createCometTail(-380, -205, -600,600,200,planets.comets);
const cometTail1 = createCometTail(580, -85, -600,700,150,planets.comets);


function createComet(positionX, positionZ) {
  // Create the nucleus of the comet with noise for a rocky surface
  const nucleusGeometry = new THREE.SphereGeometry(1, 32, 32); // Smaller for realism
  const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, shininess: 20 });
  const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);

  // Add slight randomness to the nucleus geometry to make it look rocky
  const pos = nucleusGeometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i,
          pos.getX(i) + (Math.random() - 0.5) * 0.1,
          pos.getY(i) + (Math.random() - 0.5) * 0.1,
          pos.getZ(i) + (Math.random() - 0.5) * 0.1
      );
  }
  pos.needsUpdate = true;

  // Create a particle system for the tail using BufferGeometry
  const tailParticleCount = 1000; // Increase particle count for a more flowing tail
  const tailGeometry = new THREE.BufferGeometry();
  const tailPositions = new Float32Array(tailParticleCount * 3); // Each particle has an (x, y, z) position
  const tailSizes = new Float32Array(tailParticleCount); // Vary particle sizes for realism

  for (let i = 0; i < tailParticleCount; i++) {
      tailPositions[i * 3 + 0] = (Math.random() * 2 - 1);  // X position of the particle
      tailPositions[i * 3 + 1] = (Math.random() * 5 - 2.5); // Y position (length and spread of the tail)
      tailPositions[i * 3 + 2] = (Math.random() * 2 - 1);  // Z position

      tailSizes[i] = Math.random() * 0.3 + 0.1; // Size variation for tail particles
  }

  tailGeometry.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
  tailGeometry.setAttribute('size', new THREE.BufferAttribute(tailSizes, 1));

  // Create the tail material
  const tailMaterial = new THREE.PointsMaterial({
      color: 0xffe0b2,
      size: 1,
      blending: THREE.AdditiveBlending, // To create a glowing tail effect
      depthWrite: false,
  });

  const tail = new THREE.Points(tailGeometry, tailMaterial);

  // Create a group to combine nucleus and tail
  const comet = new THREE.Group();
  comet.add(nucleus);
  comet.add(tail);

  // Position the nucleus and tail in relation to each other
  nucleus.position.set(0, 0, 0);
  tail.position.set(0, -1, 0); // Tail following the nucleus
  comet.rotation.x = Math.PI / 4; // Tilt the comet for a dynamic appearance

  // Add the comet to the scene
  scene.add(comet);
  comet.orbitRadiusX = positionX;
  comet.orbitRadiusZ = positionZ;
  return comet;
}
var domes = [];
function createStar(){

  var context = canvas.getContext("2d");
  context.globalAlpha = 0.3;
  context.filter = "blur(16px)";
  context.fillStyle = "white";
  context.beginPath();
  context.arc(64, 64, 40, 0, 2 * Math.PI);
  context.fill();
  context.globalAlpha = 1;
  context.filter = "blur(5px)";
  context.fillStyle = "white";
  context.beginPath();
  context.arc(64, 64, 16, 0, 2 * Math.PI);
  context.fill();

  var starsMaterial = new THREE.PointsMaterial({
    size: 1/2 ,
    sizeAttenuation: true,
    map: texture,
    // transparent: true
  });
  for (var i = 0; i < 20; i++) {
    var dome = new THREE.Points(
      new THREE.IcosahedronGeometry(20, 4),
      starsMaterial
    );
    dome.scale.set(50, 50, 50);
    dome.rotation.set(6 * Math.random(), 6 * Math.random(), 6 * Math.random());
    dome.position.set(Math.random() * 2000 - 1000, Math.random() * 1000 - 500, -500);
    scene.add(dome);
    domes.push(dome); 
  }
}
function animateStars() {
  domes.forEach(dome => {
    dome.position.x -= 2; // Move each dome left by 2 units

    // If the dome goes too far left, reset its position to the right
    if (dome.position.x < -1000) {
      dome.position.x = 1000; // Reset to the right side
    }
  });
}
createStar();
//Create Planet
function addOrbitRing(scene, radiusX, radiusZ, textureFile) {
  const curve = new THREE.EllipseCurve(
    0, 0,            // ax, aY - The center of the ellipse
    radiusX, radiusZ, // xRadius, zRadius - The radii of the ellipse
    0, 2 * Math.PI,   // startAngle, endAngle
    false,            // clockwise - Whether the ellipse is drawn clockwise
    0                 // Rotation angle (optional)
  );

  const points = curve.getPoints(100); // 100 points to form the ellipse
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

  // Create a basic material to apply the orbit texture (optional)
  const orbitTexture = new THREE.TextureLoader().load(
    textureFile,
    () => { console.log(`${textureFile} texture loaded`); },
    undefined,
    (err) => { console.error(`Error loading ${textureFile} texture:`, err); }
  );
  const asteroidTexture = new THREE.TextureLoader().load(
    textureFile,
    () => { console.log(`${textureFile} texture loaded`); },
    undefined,
    (err) => { console.error(`Error loading ${textureFile} texture:`, err); }
  );
  const ringGeometry = new THREE.RingGeometry(radiusX - 0.2, radiusX + 0.3, 64);
  const ringMaterial = new THREE.MeshLambertMaterial({
    map: orbitTexture,
    side: THREE.DoubleSide,
    color: '#F00', emissive: '#0FF',
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2; // Rotate to make it flat
  scene.add(ring);
}

function createPlanet(scene, name, radius, textureFile, positionX, positionZ = 0,planetInfo) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const texture = new THREE.TextureLoader().load(
    textureFile,
    () => { console.log(`${name} texture loaded`); },
    undefined,
    (err) => { console.error(`Error loading ${name} texture:`, err); }
  );

  const material = new THREE.MeshStandardMaterial({
     map: texture, 
    //  emissive: new THREE.Color(0xffffff), // Set the emissive color
    //  emissiveMap: emissiveTexture, // Set the emissive map
    //  emissiveIntensity: 1.0,
     side: THREE.FrontSide
    });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);
  planet.position.set(positionX, 0, positionZ); 
  const worldPosition = new THREE.Vector3();

  planet.getWorldPosition(worldPosition);
  console.log(planetInfo)
  planet.name = planetInfo.name;
  planet.info = {
    ...planetInfo.info
  };

  addOrbitRing(scene, positionX, positionZ, 'brick.jpg');
  planet.orbitRadiusX = positionX;
  planet.orbitRadiusZ = positionZ;
  planet.orbitSpeed = Math.random() * 0.01 + 0.01;
  planet.orbitAngle = Math.random() * 2 * Math.PI
  return planet;
}


//create mercury
const mercuryRadius=10;
const mercuryOrbitZ = 8;
const mercuryName='mercury';
const mercury= createPlanet(solarSystem, mercuryName, 3, 'mercury.jpg', mercuryRadius, mercuryOrbitZ,planets[mercuryName]);

// Create Benus
const venusRadius=20;
const venusOrbitZ = 18;
const venusName='venus';
const venus = createPlanet(solarSystem, venusName, 3.5, 'venus.jpg', venusRadius, venusOrbitZ,planets[venusName]);

// Create Earth
const earthRadius=30;
const earthOrbitZ = 28;
const earthName='earth'
const earth = createPlanet(solarSystem, earthName, 4.0, 'earth_texture.jpg', earthRadius, earthOrbitZ,planets[earthName]);

// Create Mars
const marsRadius=40;
const marsOrbitZ = 38;
const marsName='mars';
const mars = createPlanet(solarSystem, marsName, 3.5, 'mars.jpg', marsRadius, marsOrbitZ,planets[marsName]);

//create asteroide belt
function addAsteroidBelt(scene, innerRadius, outerRadius, numAsteroids, textureFile,infor) {
  const geometries = [
    new THREE.SphereGeometry(0.5, 8, 8), // Small sphere
    new THREE.DodecahedronGeometry(0.5), // Dodecahedron
    new THREE.TetrahedronGeometry(0.5), // Tetrahedron
    new THREE.OctahedronGeometry(0.5), // Octahedron
  ];
  
  const asteroidTexture = new THREE.TextureLoader().load(
    textureFile,
    () => { console.log(`${textureFile} texture loaded`); },
    undefined,
    (err) => { console.error(`Error loading ${textureFile} texture:`, err); }
  );
  const asteroidMaterial = new THREE.MeshStandardMaterial({ 
    map: asteroidTexture,
    emissive: new THREE.Color(0xfafe01), // Set the emissive color
    emissiveIntensity: 1,
    emissiveMap: asteroidTexture, // Set the emissive map
  });

  for (let i = 0; i < numAsteroids; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const asteroid = new THREE.Mesh(geometry, asteroidMaterial);
    const angle = Math.random() * 2 * Math.PI;
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const offsetX = (Math.random() - 0.5) * 0.2; // Random offset between -0.1 and 0.1
    const offsetY = (Math.random() - 0.5) * 0.2; // Random offset between -0.1 and 0.1
    const offsetZ = (Math.random() - 0.5) * 0.2; // Random offset between -0.1 and 0.1
    asteroid.position.set(
      radius * Math.cos(angle) + offsetX,
      offsetY,
      radius * Math.sin(angle) + offsetZ
    );
    asteroid.name=infor.name;
    asteroid.info={
      ...infor.info
    }
    scene.add(asteroid);
  }
}
addAsteroidBelt(solarSystem, 44, 45, 500, 'asteroid.jpg',planets.asteroidBelt);

//Create Jupiter
const jupiterRadius=50;
const jupiterOrbitZ = 48;
const jupiterName='jupiter';
const jupiter = createPlanet(solarSystem, jupiterName, 5, 'jupiter.jpg', jupiterRadius, jupiterOrbitZ,planets[jupiterName]);

// Create Saturn
const saturnRadius = 60; // Adjust this radius as needed
const saturnOrbitZ = 58; // Adjust this orbit position as needed
const saturnName='saturn';
const saturn = createPlanet(solarSystem,  saturnName,4.5, 'saturn.jpg', saturnRadius, saturnOrbitZ,planets[saturnName]);

// Add Saturn's rings
function addSaturnRings(scene, saturn, innerRadius, outerRadius, textureFile) {
  // Load the texture for the rings
  const ringTexture = new THREE.TextureLoader().load(
      textureFile,
      () => { console.log(`${textureFile} texture loaded`); },
      undefined,
      (err) => { console.error(`Error loading ${textureFile} texture:`, err); }
  );

  // Create the ring geometry
  const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);

  // Create the material for the ring
  const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      depthWrite: false // Disable depth writing to ensure proper appearance
  });

  // Create the mesh for the ring
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  // Ensure the ring is scaled appropriately
  // Adjust scale if needed based on Saturn's size
  ring.scale.set(0.1, 0.1, 0.1);

  // Position and rotate the ring
  ring.rotation.x = Math.PI / 2; // Make the ring horizontal

  // Adjust the position to align with Saturn
  ring.position.set(0, 0, 0); // Center it around Saturn

  // Add the ring to Saturn
  saturn.add(ring);

  // Optional: Fine-tune the position or scale if needed
  // Example: Adjust position slightly if needed
  // ring.position.set(0, 0, 0); // Adjust to fit visually
}


addSaturnRings(solarSystem, saturn, saturnRadius + 1, saturnRadius + 10, 'saturn_ring.png');


//Create Uranus
const uranusRadius=70;
const uranusOrbitZ = 68;
const uranusName='uranus';
const uranus = createPlanet(solarSystem, uranusName , 4.0, 'uranus.jpg', uranusRadius, uranusOrbitZ,planets[uranusName]);

//Create Neptune
const neptuneRadius=80;
const neptuneOrbitZ=78;
const neptuneName='neptune';
const neptune = createPlanet(solarSystem, neptuneName, 4, 'neptune.jpg', neptuneRadius, neptuneOrbitZ,planets[neptuneName]);



addAsteroidBelt(solarSystem, 85, 89, 1200, 'asteroid.jpg',planets.kuiperBelt);



// Lighting setup
const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);



camera.position.set(0, 80, 80); // Move the camera up and back
camera.lookAt(0, 0, 0); // Ensure the camera is looking at the center of the scene

// Apply a slight tilt to the entire solar system
solarSystem.rotation.x = Math.PI / 6; // Tilt the solar system by 30 degrees
solarSystem.rotation.y = Math.PI / 11; // Tilt the solar system by 30 degrees
solarSystem.rotation.z = Math.PI / 8; // Tilt the solar system by 30 degrees
solarSystem.position.y += 10;

// const speed = 0.001; // Speed of Earth's orbit
// const spaceTexture = new THREE.TextureLoader().load('star.png');
scene.background = new THREE.Color(0x000410); // Set the background color

function animateComet(cometTail){
  if (cometTail) {
    const positions = cometTail.fireParticles.geometry.attributes.position.array;
    for (let i = 0; i < cometTail.particleCount; i++) {
        const index = i * 3;
        if(index<(cometTail.particleCount/1.5)){
          positions[index + 1] -= cometTail.velocities[index + 1];
        }else{
          positions[index + 1] += cometTail.velocities[index + 1];
        }

        // Reset particles to simulate a continuous fire effect
        if (positions[index + 1] > -0.5) {
          const distance = Math.random() * cometTail.tailLength;
          positions[index+ 1] = -distance; // Start at the base
      }
    }
    cometTail.fireParticles.geometry.attributes.position.needsUpdate = true;
}
}

function getScreenPosition(object, camera) {
  const vector = new THREE.Vector3();
  console.log(object)
  object.getWorldPosition(vector); // Get the world position of the object
  vector.project(camera); // Convert to normalized device coordinates (-1 to +1)

  // Convert from normalized device coordinates to screen coordinates
  const widthHalf = 0.5 * window.innerWidth;
  const heightHalf = 0.5 * window.innerHeight;
  
  return {
    x: Math.round(vector.x * widthHalf + widthHalf),
    y: Math.round(-vector.y * heightHalf + heightHalf)
  };
}


function displayPlanetInfo(planet) {
  
  const infoPanel = document.getElementById('planet-info');
  console.log(planet);
  
  if (infoPanel) {
    const screenPos = getScreenPosition(planet, camera);
    
    infoPanel.style.position = 'absolute';
    infoPanel.style.left = `${screenPos.x}px`;
    infoPanel.style.top = `${screenPos.y}px`;

    infoPanel.style.width="300px"
    infoPanel.style.borderRadius="1rem"
    if(planet.name=="Sun"){
      infoPanel.innerHTML = `<article style="
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: #1C1E1F;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      font-family: Arial, sans-serif;
    ">
        <h3 style="
            font-size: 24px;
            color: #fff;
            margin-bottom: 10px;
        ">${planet.name}</h3>
        <p style="
            font-size: 16px;
            color: #ffffff;
            line-height: 1.6;
            margin-bottom: 15px;
        ">${planet.info.description}</p>
        <ul style="
            list-style: none;
            padding: 0;
        ">
            <li style="
                font-size: 16px;
                color: #fff;
                margin-bottom: 10px;
            "><strong style="
                color: #fff;
            ">Radius:</strong> ${planet.info.radius}</li>
        </ul>
    </article>
    `;
    }
    else if(planet.name=="The Asteroid Belt" || planet.name=="Comets" || planets.name==planets.kuiperBelt.name){
      infoPanel.innerHTML = `<article style="
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: #1C1E1F;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      font-family: Arial, sans-serif;
    ">
        <h3 style="
            font-size: 24px;
            color: #ffffff;
            margin-bottom: 10px;
        ">${planet.name}</h3>
        <p style="
            font-size: 16px;
            color: #fff;
            line-height: 1.6;
            margin-bottom: 15px;
        ">${planet.info.description}</p>
    </article>
    `;
    }
    else{
      infoPanel.innerHTML = `<article style="
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: #1C1E1F;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      font-family: Arial, sans-serif;
    ">
        <h3 style="
            font-size: 24px;
            color: #ffffff;
            margin-bottom: 10px;
        ">${planet.name}</h3>
        <p style="
            font-size: 16px;
            color: #fff;
            line-height: 1.6;
            margin-bottom: 15px;
        ">${planet.info.description}</p>
        <ul style="
            list-style: none;
            padding: 0;
        ">
            <li style="
                font-size: 16px;
                color: #fff;
                margin-bottom: 10px;
            "><strong style="
                color: #fff;
            ">Distance from Sun:</strong> ${planet.info.distanceFromSun}</li>
            <li style="
                font-size: 16px;
                color: #fff;
                margin-bottom: 10px;
            "><strong style="
                color: #fff;
            ">Orbital Period:</strong> ${planet.info.orbitalPeriod}</li>
            <li style="
                font-size: 16px;
                color: #fff;
                margin-bottom: 10px;
            "><strong style="
                color: #fff;
            ">Radius:</strong> ${planet.info.radius}</li>
        </ul>
    </article>
    `;
    }
  }
}

const pointer = new THREE.Vector2();

function onPointerMove( event ) {
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
const raycaster = new THREE.Raycaster();


let selectedPlanet=null;
function animate(t) {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.0001;
  
  function updatePlanet(planet) {
    if (planet.orbitSpeed > 0) { // Only update if orbitSpeed is positive
      planet.orbitAngle += planet.orbitSpeed; // Update the angle
      planet.position.x = planet.orbitRadiusX * Math.cos(planet.orbitAngle);
      planet.position.z = planet.orbitRadiusZ * Math.sin(planet.orbitAngle);
    }
  }

  updatePlanet(mercury);
  updatePlanet(venus);
  updatePlanet(earth);
  updatePlanet(mars);
  updatePlanet(jupiter);
  updatePlanet(saturn);
  updatePlanet(uranus);
  updatePlanet(neptune);

  // Rotate planets on their axes (optional)
  mercury.rotation.y += 0.01;
  venus.rotation.y += 0.01;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.01;
  jupiter.rotation.y += 0.01;
  saturn.rotation.y += 0.01;
  uranus.rotation.y += 0.01;
  neptune.rotation.y += 0.01;


	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children,true );

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (selectedPlanet) {
      selectedPlanet.orbitSpeed = selectedPlanet.originalOrbitSpeed;
      const infoPanel = document.getElementById('planet-info');
      if(infoPanel){
        infoPanel.innerHTML=""
        infoPanel.attributeStyleMap.clear();
        infoPanel.setAttribute("id","planet-info")
      }
    }
    if (clickedObject.name) {
      clickedObject.originalOrbitSpeed = clickedObject.orbitSpeed;
      clickedObject.orbitSpeed = 0;
      
            // Update the selected planet
      selectedPlanet = clickedObject;
      
            // Display information about the selected planet
      displayPlanetInfo(clickedObject);
    }
  }
  animateComet(cometTail)
  animateComet(cometTail1)

  // animateComet();
  animateStars();
  // controls.update(); 
  renderer.render(scene, camera);
}


window.addEventListener( 'pointermove', onPointerMove );
animate();




  
