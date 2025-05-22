// Global Game Variables
let playerCurrency = 500; // Starting currency

const CAR_TYPES = [
    {
        name: 'Standard EV',
        textureKey: 'playerCar',
        moveSpeed: 250,
        angularVelocity: 200,
        maxEnergy: 1000,
        color: 0xff0000,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 100, energy: 80, handling: 120 },
        upgradeIncrements: { speed: 15, energy: 150, angularVelocity: -10 } // angularVelocity is reduced for better handling
    },
    {
        name: 'Quick Volt',
        textureKey: 'carQuickVolt',
        moveSpeed: 300,
        angularVelocity: 180,
        maxEnergy: 800,
        color: 0x00ff00,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 120, energy: 100, handling: 150 },
        upgradeIncrements: { speed: 20, energy: 120, angularVelocity: -8 }
    },
    {
        name: 'EnduroCell',
        textureKey: 'carEnduroCell',
        moveSpeed: 220,
        angularVelocity: 220,
        maxEnergy: 1500,
        color: 0x0000dd,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 90, energy: 150, handling: 100 },
        upgradeIncrements: { speed: 10, energy: 200, angularVelocity: -12 }
    },
    {
        name: 'Rally Pro',
        textureKey: 'carRallyPro',
        color: 0x228B22, // Forest Green
        moveSpeed: 240,
        angularVelocity: 230,
        maxEnergy: 1100,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 110, energy: 90, handling: 100 },
        upgradeIncrements: { speed: 12, energy: 125, angularVelocity: -18 } // Negative for better handling
    },
    {
        name: 'Speedster X',
        textureKey: 'carSpeedsterX',
        color: 0xFFFF00, // Bright Yellow
        moveSpeed: 320,
        angularVelocity: 190,
        maxEnergy: 750,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 200, energy: 100, handling: 150 },
        upgradeIncrements: { speed: 25, energy: 75, angularVelocity: -15 } // Negative for better handling
    },
    {
        name: 'Heavy Duty',
        textureKey: 'carHeavyDuty',
        color: 0x696969, // Dark Grey
        moveSpeed: 180,
        angularVelocity: 160, // Lower means less nimble by default
        maxEnergy: 2000,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 150, energy: 70, handling: 130 },
        upgradeIncrements: { speed: 10, energy: 250, angularVelocity: -10 } // Negative for better handling (tighter turns)
    },
    {
        name: 'Drift King',
        textureKey: 'carDriftKing',
        color: 0x007FFF, // Electric Blue (Primary)
        secondaryColor: 0xFFA500, // Bright Orange (Accent for cabin/spoiler)
        moveSpeed: 230,
        angularVelocity: 280, // Very high for sharp turning
        maxEnergy: 950,
        energyDrainRate: 1.0, // Default drain rate
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 120, energy: 110, handling: 80 }, // Cheap handling
        upgradeIncrements: { speed: 10, energy: 100, angularVelocity: 25 } // Positive means more rotation/input.
    },
    {
        name: 'Eco Cruiser',
        textureKey: 'carEcoCruiser',
        color: 0xADD8E6, // Light Blue
        secondaryColor: 0xC0C0C0, // Silver cabin
        moveSpeed: 200,
        angularVelocity: 200,
        maxEnergy: 1200,
        energyDrainRate: 0.6, // Custom stat: consumes 60% of normal energy
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 100, energy: 100, handling: 100 },
        upgradeIncrements: { speed: 10, energy: 150, angularVelocity: -15 } // Negative for better handling
    },
    {
        name: 'Hyperion',
        textureKey: 'carHyperion',
        color: 0x8A2BE2, // Metallic Purple (BlueViolet)
        secondaryColor: 0x00FFFF, // Cyan accents
        moveSpeed: 340,
        angularVelocity: 260,
        maxEnergy: 1100,
        energyDrainRate: 1.2, // Consumes more energy
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 250, energy: 200, handling: 220 },
        upgradeIncrements: { speed: 20, energy: 100, angularVelocity: 20 }
    },
    {
        name: 'Classic Roadster',
        textureKey: 'carClassicRoadster',
        color: 0xFFFDD0, // Cream
        secondaryColor: 0x800020, // Burgundy accents
        moveSpeed: 250,
        angularVelocity: 200,
        maxEnergy: 1000,
        energyDrainRate: 1.0,
        upgrades: { speedLevel: 0, energyLevel: 0, handlingLevel: 0 },
        baseUpgradeCosts: { speed: 100, energy: 100, handling: 100 },
        upgradeIncrements: { speed: 15, energy: 120, angularVelocity: 15 } // Positive for more rotation/input
    }
];

// Initialize default energyDrainRate for existing cars if not present
CAR_TYPES.forEach(car => {
    if (car.energyDrainRate === undefined) {
        car.energyDrainRate = 1.0;
    }
});

// selectedCarData will be a DEEP COPY of a CAR_TYPES object, used by PlayScene
// It's populated when a car is chosen in CarSelectionScene.
let selectedCarData = null; 

// Global Level Data
let currentLevelId = 1; // Start with Level 1
const GAME_WIDTH = 800; // Define game width and height for level data
const GAME_HEIGHT = 600;

const LEVELS = [
    {
        levelId: 1,
        name: "Simple City Loop",
        roadTextureKey: 'road_procedural_tile',
        backgroundTextureKey: 'grass_procedural',
        playerStartPosition: { x: GAME_WIDTH / 2, y: (GAME_HEIGHT / 2) + (500 / 2) - 50 }, // Approx. current start
        aiCarCount: 4,
        aiCarTextureKey: 'aiCar_procedural',
        aiCarMinSpeed: 75,
        aiCarMaxSpeed: 125,
        roadBoundaries: { topY: 50, bottomY: 550 }, // Current wider road
        obstacles: [
            // Outer boundary buildings (approximations of current setup)
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH / 2, y: 50 - 20 - 75/2, scaleX: GAME_WIDTH/80, scaleY: 0.5, isStatic: true }, // Top wall (y adjusted for anchor)
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH / 2, y: 550 + 20 + 75/2, scaleX: GAME_WIDTH/80, scaleY: 0.5, isStatic: true }, // Bottom wall
            { type: 'building', textureKey: 'building_procedural', x: 50 - 20 - 40/2, y: GAME_HEIGHT/2, scaleX: 0.5, scaleY: GAME_HEIGHT/150, isStatic: true }, // Left wall
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH - (50-20-40/2) , y: GAME_HEIGHT/2, scaleX: 0.5, scaleY: GAME_HEIGHT/150, isStatic: true }, // Right wall
            
            // Inner obstacles (approximations of current setup)
            { type: 'building', textureKey: 'building_procedural', x: 200, y: 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH - 200, y: 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: 200, y: GAME_HEIGHT - 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH - 200, y: GAME_HEIGHT - 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, scaleX: 1.5, scaleY: 1.5, isStatic: true }
        ],
        finishLineX: GAME_WIDTH - 100 // Example
    },
    {
        levelId: 2,
        name: "Desert Dash",
        backgroundTextureKey: 'desert_sand_background',
        roadTextureKey: 'desert_road_tile',
        playerStartPosition: { x: 100, y: GAME_HEIGHT / 2 },
        aiCarCount: 3,
        aiCarTextureKey: 'aiCar_procedural', // Can use the same AI car for now
        aiCarMinSpeed: 100,
        aiCarMaxSpeed: 180,
        roadBoundaries: { topY: 100, bottomY: GAME_HEIGHT - 100 },
        obstacles: [
            // Rocks (placed near road edges)
            { type: 'rock', textureKey: 'rock_obstacle', x: 200, y: 80, scale: Phaser.Math.FloatBetween(0.8, 1.2), isStatic: true },
            { type: 'rock', textureKey: 'rock_obstacle', x: 450, y: GAME_HEIGHT - 90, scale: Phaser.Math.FloatBetween(0.9, 1.5), isStatic: true },
            { type: 'rock', textureKey: 'rock_obstacle', x: 700, y: 120, scale: Phaser.Math.FloatBetween(0.7, 1.1), isStatic: true },
            { type: 'rock', textureKey: 'rock_obstacle', x: GAME_WIDTH - 150, y: GAME_HEIGHT - 110, scale: Phaser.Math.FloatBetween(1.0, 1.3), isStatic: true },
             // More rocks can be added for variety
            { type: 'rock', textureKey: 'rock_obstacle', x: 300, y: GAME_HEIGHT - 85, scale: Phaser.Math.FloatBetween(0.8, 1.2), isStatic: true },
            { type: 'rock', textureKey: 'rock_obstacle', x: 550, y: 95, scale: Phaser.Math.FloatBetween(0.9, 1.4), isStatic: true },


            // Oil Slicks (placed on the road)
            { type: 'oilSlick', textureKey: 'oil_slick_patch', x: 350, y: GAME_HEIGHT / 2, scale: Phaser.Math.FloatBetween(1.5, 2.0), isStatic: true, isHazard: true, isSensor: true },
            { type: 'oilSlick', textureKey: 'oil_slick_patch', x: 600, y: GAME_HEIGHT / 2 - 50, scale: Phaser.Math.FloatBetween(1.0, 1.8), isStatic: true, isHazard: true, isSensor: true },
            { type: 'oilSlick', textureKey: 'oil_slick_patch', x: GAME_WIDTH - 250, y: GAME_HEIGHT / 2 + 30, scale: Phaser.Math.FloatBetween(1.2, 2.2), isStatic: true, isHazard: true, isSensor: true },
        ],
        finishLineX: GAME_WIDTH - 50
    },
    {
        levelId: 3,
        name: "Forest Sprint",
        backgroundTextureKey: 'forest_background',
        roadTextureKey: 'forest_road_tile',
        playerStartPosition: { x: 100, y: GAME_HEIGHT / 2 },
        aiCarCount: 2,
        aiCarTextureKey: 'aiCar_procedural',
        aiCarMinSpeed: 60,
        aiCarMaxSpeed: 120,
        roadBoundaries: { topY: 150, bottomY: GAME_HEIGHT - 150 }, // Effective boundaries for AI & off-track visual
        levelTint: 0xDDDDDD, // Slight greyish tint for shadowed feel
        obstacles: [
            // Trees defining a winding path - more dense on sides, sparser for path
            // Start straightish
            { type: 'tree', textureKey: 'tree_obstacle', x: 50, y: 100, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 50, y: GAME_HEIGHT - 100, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 150, y: 50, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 150, y: GAME_HEIGHT - 50, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            
            // First bend - right
            { type: 'tree', textureKey: 'tree_obstacle', x: 250, y: 100, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 250, y: 200, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 300, y: GAME_HEIGHT - 150, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true }, // Inner corner
            { type: 'tree', textureKey: 'tree_obstacle', x: 350, y: GAME_HEIGHT - 50, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },


            // Second bend - left
            { type: 'tree', textureKey: 'tree_obstacle', x: 450, y: GAME_HEIGHT - 100, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 450, y: GAME_HEIGHT - 200, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 400, y: 150, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true }, // Inner corner
            { type: 'tree', textureKey: 'tree_obstacle', x: 350, y: 50, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },

            // Straight section with some narrowing
            { type: 'tree', textureKey: 'tree_obstacle', x: 550, y: 100, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 550, y: GAME_HEIGHT - 100, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 600, y: 200, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 600, y: GAME_HEIGHT - 200, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            
            // Towards finish
            { type: 'tree', textureKey: 'tree_obstacle', x: 700, y: 50, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: 700, y: GAME_HEIGHT - 50, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: GAME_WIDTH - 50, y: 150, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: GAME_WIDTH - 50, y: GAME_HEIGHT - 150, scale: Phaser.Math.FloatBetween(0.9, 1.3), isStatic: true },
        ],
        finishLineX: GAME_WIDTH - 70
    },
    {
        levelId: 4,
        name: "Coastal Highway",
        backgroundTextureKey: 'ocean_background',
        roadTextureKey: 'highway_road_tile',
        playerStartPosition: { x: 100, y: GAME_HEIGHT / 2 - 100 }, // Start on upper part of road
        aiCarCount: 3,
        aiCarTextureKey: 'aiCar_procedural',
        aiCarMinSpeed: 90,
        aiCarMaxSpeed: 160,
        roadBoundaries: { topY: 150, bottomY: GAME_HEIGHT - 150 }, // Road area within screen
        levelTint: 0xE0FFFF, // Light Cyan / Pale Blue tint for bright coastal feel
        obstacles: [
            // Invisible Cliff Barrier along the bottom edge of the road area
            { type: 'cliff_barrier', x: 0, y: GAME_HEIGHT - 145, width: GAME_WIDTH, height: 10, isStatic: true, isInvisible: true },

            // Optional: Some rocks on the non-ocean side (e.g., top side) for visual breakup
            { type: 'rock', textureKey: 'rock_obstacle', x: 200, y: 120, scale: Phaser.Math.FloatBetween(0.7, 1.0), isStatic: true },
            { type: 'rock', textureKey: 'rock_obstacle', x: 500, y: 100, scale: Phaser.Math.FloatBetween(0.8, 1.1), isStatic: true },
            { type: 'rock', textureKey: 'rock_obstacle', x: GAME_WIDTH - 200, y: 130, scale: Phaser.Math.FloatBetween(0.7, 0.9), isStatic: true },

            // A few sparse trees on the non-ocean side
            { type: 'tree', textureKey: 'tree_obstacle', x: 350, y: 110, scale: Phaser.Math.FloatBetween(0.8, 1.0), isStatic: true },
            { type: 'tree', textureKey: 'tree_obstacle', x: GAME_WIDTH - 350, y: 90, scale: Phaser.Math.FloatBetween(0.7, 1.0), isStatic: true },
        ],
        finishLineX: GAME_WIDTH - 50
    },
    {
        levelId: 5,
        name: "Night Ride",
        backgroundTextureKey: 'night_sky_background',
        roadTextureKey: 'road_procedural_tile', // Using Level 1 road
        levelTint: 0x333355, // Dark blue/purple tint
        playerStartPosition: { x: 100, y: GAME_HEIGHT / 2 },
        aiCarCount: 6,
        aiCarTextureKey: 'aiCar_procedural',
        aiCarMinSpeed: 60,
        aiCarMaxSpeed: 110,
        roadBoundaries: { topY: 50, bottomY: GAME_HEIGHT - 50 }, // Same as Level 1
        obstacles: [
            // Buildings (similar layout to Level 1 but could be different)
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH / 2, y: 50 - 20 - 75/2, scaleX: GAME_WIDTH/80, scaleY: 0.5, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH / 2, y: GAME_HEIGHT - 50 + 20 + 75/2, scaleX: GAME_WIDTH/80, scaleY: 0.5, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: 200, y: 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH - 200, y: 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: 200, y: GAME_HEIGHT - 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH - 200, y: GAME_HEIGHT - 200, scaleX: 1.0, scaleY: 1.0, isStatic: true },
            { type: 'building', textureKey: 'building_procedural', x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2, scaleX: 1.5, scaleY: 1.5, isStatic: true },

            // Streetlights (visual only)
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 100, y: 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 100, y: GAME_HEIGHT - 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 300, y: 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 300, y: GAME_HEIGHT - 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 500, y: 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 500, y: GAME_HEIGHT - 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 700, y: 30, scale: 1.0, isVisualOnly: true },
            { type: 'streetlight', textureKey: 'streetlight_sprite', x: 700, y: GAME_HEIGHT - 30, scale: 1.0, isVisualOnly: true },
        ],
        finishLineX: GAME_WIDTH - 100
    }
];


class CarSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CarSelectionScene' });
        this.currencyText = null;
        this.selectedCarDisplayGroup = null; // Group to hold details of the selected car
        this.activeCarIndex = -1; 
        this.levelText = null; // For displaying current level and switch instruction
    }

    preload() {
        CAR_TYPES.forEach(car => {
            if (!this.textures.exists(car.textureKey)) {
                let graphics = this.add.graphics();
                const carWidth = 32;
                const carHeight = 64;
                graphics.fillStyle(car.color, 1);
                graphics.fillRect(0, 0, carWidth, carHeight);
                
                let cabinColor = Phaser.Display.Color.ValueToColor(car.color).lighten(30).color;
                let cabinWidthMultiplier = 0.7;
                let cabinXOffsetMultiplier = 0.15;
                let cabinHeightMultiplier = 0.35;
                let cabinYOffsetMultiplier = 0.1;
                let bodyWidthMultiplier = 1.0; 
                let carXOffset = 0; 

                if (car.secondaryColor) { 
                    cabinColor = car.secondaryColor;
                }

                if (car.name === 'Quick Volt' && !car.secondaryColor) cabinColor = 0xFFFF00; 
                else if (car.name === 'EnduroCell' && !car.secondaryColor) cabinColor = 0xAAAAFF; 
                else if (car.name === 'Speedster X') {
                    if (!car.secondaryColor) cabinColor = 0x444444; 
                    cabinWidthMultiplier = 0.6; 
                    cabinXOffsetMultiplier = 0.2;
                } else if (car.name === 'Heavy Duty') {
                    if (!car.secondaryColor) cabinColor = Phaser.Display.Color.ValueToColor(car.color).lighten(15).color;
                    bodyWidthMultiplier = 1.15; 
                } else if (car.name === 'Eco Cruiser') {
                    cabinWidthMultiplier = 0.6;
                    cabinXOffsetMultiplier = 0.2;
                    cabinHeightMultiplier = 0.4; 
                    cabinYOffsetMultiplier = 0.08; 
                } else if (car.name === 'Hyperion') {
                    cabinWidthMultiplier = 0.65; 
                    cabinXOffsetMultiplier = 0.175;
                } else if (car.name === 'Classic Roadster') {
                    // Attempt a 'rounder' cabin by making it slightly shorter and wider
                    cabinWidthMultiplier = 0.75; 
                    cabinXOffsetMultiplier = 0.125;
                    cabinHeightMultiplier = 0.3; // Shorter
                    cabinYOffsetMultiplier = 0.12; 
                }
                
                const currentCarWidth = carWidth * bodyWidthMultiplier;
                if (bodyWidthMultiplier !== 1.0) {
                    carXOffset = (carWidth - currentCarWidth) / 2; 
                }

                graphics.fillStyle(car.color, 1);
                graphics.fillRect(carXOffset, 0, currentCarWidth, carHeight);


                graphics.fillStyle(cabinColor, 1);
                graphics.fillRect(carXOffset + (currentCarWidth * cabinXOffsetMultiplier), carHeight * cabinYOffsetMultiplier, currentCarWidth * cabinWidthMultiplier, carHeight * cabinHeightMultiplier);
                
                // Accents / Spoilers
                if (car.name === 'Drift King' && car.secondaryColor) {
                    graphics.fillStyle(car.secondaryColor, 1);
                    graphics.fillRect(carXOffset + (currentCarWidth * 0.1), carHeight * 0.75, currentCarWidth * 0.8, carHeight * 0.1); 
                } else if (car.name === 'Hyperion' && car.secondaryColor) {
                    graphics.fillStyle(car.secondaryColor, 1);
                    graphics.fillRect(carXOffset + (currentCarWidth * 0.05), carHeight * 0.65, currentCarWidth * 0.1, carHeight * 0.15); 
                    graphics.fillRect(carXOffset + (currentCarWidth * 0.85), carHeight * 0.65, currentCarWidth * 0.1, carHeight * 0.15); 
                }


                graphics.fillStyle(0xffffff, 0.7); 
                graphics.fillRect(carXOffset + (currentCarWidth * 0.2), carHeight * 0.05, currentCarWidth * 0.15, carHeight * 0.05); 
                graphics.fillRect(carXOffset + (currentCarWidth * 0.65), carHeight * 0.05, currentCarWidth * 0.15, carHeight * 0.05); 
                graphics.generateTexture(car.textureKey, carWidth, carHeight); 
                graphics.destroy();
            }
        });

        // UI Click Sound
        if (!this.textures.exists('ui_click_sound_texture')) { // Use texture check to ensure only one attempt
             // Simple click sound generation (placeholder)
            let audioCtx = this.sound.context;
            if (audioCtx) {
                let buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate); // 50ms
                let data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                    data[i] = Math.sin(i / (audioCtx.sampleRate / (440 * 4)) * Math.PI * 2) * (1 - i / data.length); // Short, decaying sine wave (A7)
                }
                this.sound.addAudioSprite('ui_click_sound_sprite', { main: buffer });
                 // Create a dummy texture to prevent re-generation if preload is called multiple times
                this.textures.createCanvas('ui_click_sound_texture', 1, 1).destroy();
            }
        }
    }

    create() {
        this.add.text(this.game.config.width / 2, 30, 'Select & Upgrade Your Car', { fontSize: '28px', fill: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        this.currencyText = this.add.text(this.game.config.width - 100, 30, 'Money: $' + playerCurrency, { fontSize: '20px', fill: '#80bdff', fontStyle: 'bold' }).setOrigin(1, 0.5);

        // Background for car list area
        let listBg = this.add.graphics({fillStyle: {color: 0x222222, alpha: 0.7}});
        listBg.fillRect(20, 70, 350, CAR_TYPES.length * 80 + 20);


        // Area for car list
        const listYStart = 80;
        CAR_TYPES.forEach((car, index) => {
            this.add.sprite(70, listYStart + index * 80 + 10, car.textureKey).setScale(1.2);
            let carNameText = this.add.text(120, listYStart + index * 80, car.name, { fontSize: '20px', fill: '#ffffff', fontStyle: 'bold' });
            
            // View Button
            let viewButtonBg = this.add.graphics({fillStyle: {color: 0x444444}});
            let viewButton = this.add.text(280, listYStart + index * 80 + 10, 'View Details', { fontSize: '16px', fill: '#00dd00', fontStyle: 'bold' })
                .setOrigin(0.5).setInteractive({ useHandCursor: true })
                .setPadding(8,5);
            
            viewButtonBg.fillRoundedRect(viewButton.x - viewButton.width/2, viewButton.y - viewButton.height/2, viewButton.width, viewButton.height, 5);
            viewButtonBg.setAlpha(0.8);
            
            viewButton.on('pointerover', () => viewButtonBg.setAlpha(1));
            viewButton.on('pointerout', () => viewButtonBg.setAlpha(0.8));
            viewButton.on('pointerdown', () => {
                if (this.sound.get('ui_click_sound_sprite')) this.sound.play('ui_click_sound_sprite', { key: 'main', volume: 0.3 });
                this.activeCarIndex = index;
                this.displaySelectedCarDetails();
            });
        });

        // Background for selected car details
        let detailsBg = this.add.graphics({fillStyle: {color: 0x2c2c2c, alpha: 0.8}});
        detailsBg.fillRoundedRect(390, 70, 390, this.game.config.height - 150, 10);


        // Selected Car Details & Upgrades Area
        this.selectedCarDisplayGroup = this.add.group();

        // Start Game Button
        let startGameButtonBg = this.add.graphics({fillStyle: {color: 0x008800}});
        let startGameButton = this.add.text(this.game.config.width / 2, this.game.config.height - 45, 'Start Game', { fontSize: '28px', fill: '#ffffff', fontStyle: 'bold' })
            .setOrigin(0.5).setInteractive({ useHandCursor: true })
            .setPadding(15,10);
        
        startGameButtonBg.fillRoundedRect(startGameButton.x - startGameButton.width/2, startGameButton.y - startGameButton.height/2, startGameButton.width, startGameButton.height, 8);
        startGameButtonBg.setAlpha(0.9);

        startGameButton.on('pointerover', () => startGameButtonBg.setAlpha(1));
        startGameButton.on('pointerout', () => startGameButtonBg.setAlpha(0.9));
        startGameButton.on('pointerdown', () => {
            if (this.sound.get('ui_click_sound_sprite')) this.sound.play('ui_click_sound_sprite', { key: 'main', volume: 0.4 });
            if (this.activeCarIndex !== -1) { 
                selectedCarData = JSON.parse(JSON.stringify(CAR_TYPES[this.activeCarIndex]));
                this.scene.start('PlayScene');
            } else {
                let tempMsg = this.add.text(this.game.config.width / 2, this.game.config.height - 90, 'Please view a car first!', { fontSize: '18px', fill: '#ffcc00', fontStyle:'bold' }).setOrigin(0.5);
                this.time.delayedCall(2000, () => { tempMsg.destroy(); });
            }
        });
        
        if (this.activeCarIndex === -1 && CAR_TYPES.length > 0) {
            this.activeCarIndex = 0;
        }
        this.displaySelectedCarDetails(); 

        // Temporary Level Switcher UI
        this.levelText = this.add.text(10, 10, 'Level: ' + currentLevelId + ' (Press L to switch - placeholder)', { fontSize: '14px', fill: '#fff' });
        this.input.keyboard.on('keydown-L', () => {
            // Simple toggle for 2 levels for now, assuming Level 2 might exist later
            currentLevelId = (currentLevelId === 1 ? 2 : 1); 
            this.levelText.setText('Level: ' + currentLevelId + ' (Press L to switch - placeholder)');
            // Note: This only changes the ID. PlayScene will pick it up upon next start.
            // To make it more dynamic, a scene restart or event system would be needed if changing mid-selection.
        });
    }

    displaySelectedCarDetails() {
        if (this.activeCarIndex === -1) return;

        this.selectedCarDisplayGroup.clear(true, true); 

        const car = CAR_TYPES[this.activeCarIndex]; 
        
        const displayX = 450 + 195/2; // Centered in the right panel
        const displayYStart = 100;

        // Panel for selected car sprite and name
        let carHeaderBg = this.add.graphics({fillStyle: {color: 0x333333, alpha:0.7}});
        carHeaderBg.fillRoundedRect(displayX - 180, displayYStart - 40, 360, 80, 5);
        this.selectedCarDisplayGroup.add(carHeaderBg);

        this.selectedCarDisplayGroup.add(this.add.sprite(displayX - 100, displayYStart, car.textureKey).setScale(2));
        this.selectedCarDisplayGroup.add(this.add.text(displayX + 20, displayYStart - 5, car.name, { fontSize: '24px', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0, 0.5));

        // Panel for stats
        let statsPanelY = displayYStart + 60;
        let statsPanelBg = this.add.graphics({fillStyle: {color: 0x333333, alpha:0.7}});
        statsPanelBg.fillRoundedRect(displayX - 180, statsPanelY, 360, 80, 5);
        this.selectedCarDisplayGroup.add(statsPanelBg);
        
        let currentStatsText = `Current Stats:\nSpeed: ${car.moveSpeed.toFixed(0)} | Handling: ${car.angularVelocity.toFixed(0)}\nEnergy: ${car.maxEnergy.toFixed(0)}`;
        let statsDisplay = this.add.text(displayX, statsPanelY + 40, currentStatsText, { fontSize: '16px', fill: '#eeeeee', align: 'center' }).setOrigin(0.5);
        this.selectedCarDisplayGroup.add(statsDisplay);

        const upgradeYStart = displayYStart + 160;
        const upgradeTypes = ['speed', 'energy', 'handling'];

        upgradeTypes.forEach((type, i) => {
            const currentLevel = car.upgrades[type + 'Level'];
            const cost = Math.floor(car.baseUpgradeCosts[type] * Math.pow(1.5, currentLevel));
            
            let buttonText = `Upgrade ${type.charAt(0).toUpperCase() + type.slice(1)} (Lvl ${currentLevel + 1})\nCost: $${cost}`;
            
            let upgradeButtonBg = this.add.graphics();
            this.selectedCarDisplayGroup.add(upgradeButtonBg);

            let upgradeButton = this.add.text(displayX, upgradeYStart + i * 75, buttonText, { 
                fontSize: '16px', 
                fill: '#ffffff', 
                fontStyle: 'bold',
                align:'center' 
            }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setPadding(10,8);
            this.selectedCarDisplayGroup.add(upgradeButton);

            upgradeButtonBg.fillStyle(playerCurrency >= cost ? 0x008800 : 0xaa0000, 0.9); // Green if affordable, red otherwise
            upgradeButtonBg.fillRoundedRect(upgradeButton.x - upgradeButton.width/2, upgradeButton.y - upgradeButton.height/2, upgradeButton.width, upgradeButton.height, 5);

            upgradeButton.on('pointerover', () => upgradeButtonBg.setAlpha(1));
            upgradeButton.on('pointerout', () => upgradeButtonBg.setAlpha(0.9));
            upgradeButton.on('pointerdown', () => {
                if (this.sound.get('ui_click_sound_sprite')) this.sound.play('ui_click_sound_sprite', { key: 'main', volume: 0.3 });
                if (playerCurrency >= cost) {
                    playerCurrency -= cost;
                    this.currencyText.setText('Money: $' + playerCurrency);

                    CAR_TYPES[this.activeCarIndex].upgrades[type + 'Level']++;
                    if (type === 'speed') CAR_TYPES[this.activeCarIndex].moveSpeed += car.upgradeIncrements.speed;
                    else if (type === 'energy') CAR_TYPES[this.activeCarIndex].maxEnergy += car.upgradeIncrements.energy;
                    else if (type === 'handling') CAR_TYPES[this.activeCarIndex].angularVelocity += car.upgradeIncrements.angularVelocity;

                    this.displaySelectedCarDetails(); 
                } else {
                    let tempMsg = this.add.text(upgradeButton.x, upgradeButton.y + 35, 'Not enough money!', { fontSize: '14px', fill: '#ffcc00', fontStyle:'bold' }).setOrigin(0.5);
                    this.selectedCarDisplayGroup.add(tempMsg); 
                    this.time.delayedCall(1500, () => { if(tempMsg.active) tempMsg.destroy(); });
                }
            });
        });
    }
}


class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
        this.player = null;
        this.cursors = null;
        this.energyText = null;
        this.aiCars = null;
        this.buildings = null; 
        this.roadTopY = 50; 
        this.roadBottomY = 550; 
        this.moveSpeed = 250; 
        this.playerAngularVelocity = 200; 
        this.playerIsTintedByCollision = false; 
        this.engineSoundInstance = null;
        this.playedOutOfEnergySound = false;
        this.playerEnergyDrainRate = 1.0; 
        this.oilSlicks = null; 
        this.playerOnOilSlick = false; 
        this.scenery = null; // Group for non-collidable scenery like streetlights
        this.headlight = null; // For player headlight effect
    }

    preload() {
        // Ensure all textures potentially used by ANY level are loaded here.
        // For this task, 'aiCar_procedural', 'grass_procedural', 'road_procedural_tile', 
        // and 'building_procedural' are the key ones from Level 1 data.
        // Car textures are loaded in CarSelectionScene.

        // AI car texture
        if (!this.textures.exists('aiCar_procedural')) {
            let graphics = this.add.graphics();
            const aiCarWidth = 32; const aiCarHeight = 64;
            graphics.fillStyle(0x4444ff, 1); graphics.fillRect(0, 0, aiCarWidth, aiCarHeight);
            graphics.fillStyle(0x8888ff, 1); graphics.fillRect(aiCarWidth * 0.15, aiCarHeight * 0.1, aiCarWidth * 0.7, aiCarHeight * 0.35);
            graphics.generateTexture('aiCar_procedural', aiCarWidth, aiCarHeight);
            graphics.destroy();
        }

        // Grass texture
        if (!this.textures.exists('grass_procedural')) {
            let graphics = this.add.graphics();
            graphics.fillStyle(0x007700, 1); graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            graphics.generateTexture('grass_procedural', GAME_WIDTH, GAME_HEIGHT);
            graphics.destroy();
        }

        // Road texture
        if (!this.textures.exists('road_procedural_tile')) {
            let graphics = this.add.graphics();
            const roadTileWidth = 64; const roadTileHeight = 64;
            graphics.fillStyle(0x606060, 1); graphics.fillRect(0, 0, roadTileWidth, roadTileHeight);
            graphics.fillStyle(0xFFFF00, 1); 
            const dashWidth = roadTileWidth * 0.08; const dashHeight = roadTileHeight * 0.4;
            const dashY = (roadTileHeight - dashHeight) / 2;
            graphics.fillRect((roadTileWidth / 2) - (dashWidth / 2) , dashY, dashWidth, dashHeight);
            graphics.generateTexture('road_procedural_tile', roadTileWidth, roadTileHeight);
            graphics.destroy();
        }
        
        // Building texture
        if (!this.textures.exists('building_procedural')) {
            let graphics = this.add.graphics();
            const buildingWidth = 80; const buildingHeight = 150;
            graphics.fillStyle(0x505050, 1); graphics.fillRect(0, 0, buildingWidth, buildingHeight);
            graphics.fillStyle(0x303030, 1); 
            graphics.fillRect(0, 0, buildingWidth, buildingHeight * 0.1); 
            graphics.fillRect(0, buildingHeight * 0.9, buildingWidth, buildingHeight * 0.1); 
            graphics.fillRect(0, 0, buildingWidth*0.05, buildingHeight); 
            graphics.fillRect(buildingWidth*0.95, 0, buildingWidth*0.05, buildingHeight); 
            graphics.generateTexture('building_procedural', buildingWidth, buildingHeight);
            graphics.destroy();
        }

        // Desert Sand Background
        this.textures.exists('desert_sand_background') || (() => { 
            let graphics = this.add.graphics(); 
            graphics.fillStyle(0xD2B48C, 1); // Sandy yellow/light brown
            graphics.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT); 
            graphics.generateTexture('desert_sand_background', GAME_WIDTH, GAME_HEIGHT); 
            graphics.destroy(); 
        })();

        // Desert Road Tile
        this.textures.exists('desert_road_tile') || (() => {
            let graphics = this.add.graphics();
            const roadTileWidth = 64; const roadTileHeight = 64;
            graphics.fillStyle(0xC19A6B, 1); // Beige/light sandy color for road
            graphics.fillRect(0, 0, roadTileWidth, roadTileHeight);
            graphics.fillStyle(0xE6D8AD, 1); // Lighter yellow/beige for dashes
            const dashWidth = roadTileWidth * 0.08; const dashHeight = roadTileHeight * 0.4;
            const dashY = (roadTileHeight - dashHeight) / 2;
            graphics.fillRect((roadTileWidth / 2) - (dashWidth / 2) , dashY, dashWidth, dashHeight);
            graphics.generateTexture('desert_road_tile', roadTileWidth, roadTileHeight);
            graphics.destroy();
        })();

        // Rock Obstacle
        this.textures.exists('rock_obstacle') || (() => {
            let graphics = this.add.graphics();
            const rockSize = 60; // Base size
            graphics.fillStyle(0x8B4513, 1); // SaddleBrown
            graphics.fillCircle(rockSize/2, rockSize/2, rockSize/2); // Main rock shape
            graphics.fillStyle(0xA0522D, 1); // Sienna
            graphics.fillCircle(rockSize/2 + 10, rockSize/2 + 5, rockSize/3); // Smaller overlapping circle
            graphics.fillStyle(0x808080, 0.6); // Grey for shadow/texture
            graphics.fillEllipse(rockSize/2, rockSize * 0.7, rockSize * 0.8, rockSize * 0.3);
            graphics.generateTexture('rock_obstacle', rockSize, rockSize);
            graphics.destroy();
        })();

        // Oil Slick Patch
        this.textures.exists('oil_slick_patch') || (() => {
            let graphics = this.add.graphics();
            const slickSize = 80;
            graphics.fillStyle(0x1A1A1A, 0.65); // Dark, semi-transparent
            graphics.fillEllipse(slickSize / 2, slickSize / 2, slickSize, slickSize * 0.7); // Irregular ellipse
            graphics.fillStyle(0x0D0D0D, 0.5);
            graphics.fillEllipse(slickSize / 2 + 10, slickSize / 2 + 5, slickSize * 0.8, slickSize * 0.6);
            graphics.generateTexture('oil_slick_patch', slickSize, slickSize);
            graphics.destroy();
        })();

        // Forest Background
        this.textures.exists('forest_background') || (() => { 
            let graphics = this.add.graphics(); 
            graphics.fillStyle(0x004d00, 1); // Darker Green for base
            graphics.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT); 
            // Speckles for texture
            for(let i=0; i<2000; i++) { // More speckles for denser feel
                let x = Phaser.Math.Between(0, GAME_WIDTH);
                let y = Phaser.Math.Between(0, GAME_HEIGHT);
                let size = Phaser.Math.Between(1,3);
                let shade = Phaser.Math.Between(0,50); // 0x00(00-32)00
                graphics.fillStyle(0x000000 + shade*256, Phaser.Math.FloatBetween(0.3, 0.6)); // Darker green/black speckles
                graphics.fillRect(x,y,size,size);
            }
            graphics.generateTexture('forest_background', GAME_WIDTH, GAME_HEIGHT); 
            graphics.destroy(); 
        })();

        // Forest Road Tile
        this.textures.exists('forest_road_tile') || (() => {
            let graphics = this.add.graphics();
            const roadTileWidth = 64; const roadTileHeight = 64;
            graphics.fillStyle(0x6B4226, 1); // Dirt Brown
            graphics.fillRect(0, 0, roadTileWidth, roadTileHeight);
            // Subtle texture (darker speckles)
            for(let i=0; i<50; i++) {
                let x = Phaser.Math.Between(0, roadTileWidth);
                let y = Phaser.Math.Between(0, roadTileHeight);
                let size = Phaser.Math.Between(1,2);
                graphics.fillStyle(0x503010, Phaser.Math.FloatBetween(0.4, 0.7)); // Darker brown speckles
                graphics.fillRect(x,y,size,size);
            }
            graphics.generateTexture('forest_road_tile', roadTileWidth, roadTileHeight);
            graphics.destroy();
        })();
        
        // Tree Obstacle
        this.textures.exists('tree_obstacle') || (() => {
            let graphics = this.add.graphics();
            const treeWidth = 50; const treeHeight = 100;
            // Trunk
            graphics.fillStyle(0x5D4037, 1); // Brown
            graphics.fillRect(treeWidth * 0.3, treeHeight * 0.6, treeWidth * 0.4, treeHeight * 0.4);
            // Leaves (multiple overlapping circles for a fuller look)
            graphics.fillStyle(0x2E7D32, 1); // Dark Green
            graphics.fillCircle(treeWidth * 0.5, treeHeight * 0.35, treeWidth * 0.45);
            graphics.fillStyle(0x388E3C, 1); // Slightly Lighter Green
            graphics.fillCircle(treeWidth * 0.35, treeHeight * 0.4, treeWidth * 0.35);
            graphics.fillCircle(treeWidth * 0.65, treeHeight * 0.4, treeWidth * 0.35);
            graphics.generateTexture('tree_obstacle', treeWidth, treeHeight);
            graphics.destroy();
        })();

        // Ocean Background
        this.textures.exists('ocean_background') || (() => {
            let graphics = this.add.graphics();
            // Sky
            graphics.fillStyle(0x87CEEB, 1); // Sky Blue
            graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT * 0.6);
            // Ocean
            graphics.fillStyle(0x0077BE, 1); // Deep Blue for Ocean
            graphics.fillRect(0, GAME_HEIGHT * 0.6, GAME_WIDTH, GAME_HEIGHT * 0.4);
            // Horizon line
            graphics.lineStyle(2, 0x005fa3, 1); // Darker blue for horizon
            graphics.beginPath();
            graphics.moveTo(0, GAME_HEIGHT * 0.6);
            graphics.lineTo(GAME_WIDTH, GAME_HEIGHT * 0.6);
            graphics.strokePath();
            // Optional: Sun
            graphics.fillStyle(0xFFD700, 1); // Gold
            graphics.fillCircle(GAME_WIDTH * 0.8, GAME_HEIGHT * 0.2, 40);
            graphics.generateTexture('ocean_background', GAME_WIDTH, GAME_HEIGHT);
            graphics.destroy();
        })();

        // Highway Road Tile
        this.textures.exists('highway_road_tile') || (() => {
            let graphics = this.add.graphics();
            const roadTileWidth = 128; 
            const roadTileHeight = 64;
            graphics.fillStyle(0x4A4A4A, 1); 
            graphics.fillRect(0, 0, roadTileWidth, roadTileHeight);
            graphics.fillStyle(0xFFFFFF, 1); 
            graphics.fillRect(roadTileWidth * 0.5 - 2, roadTileHeight * 0.2, 4, roadTileHeight * 0.25);
            graphics.fillRect(roadTileWidth * 0.5 - 2, roadTileHeight * 0.55, 4, roadTileHeight * 0.25);
            graphics.generateTexture('highway_road_tile', roadTileWidth, roadTileHeight);
            graphics.destroy();
        })();
        
        // Night Sky Background
        this.textures.exists('night_sky_background') || (() => {
            let graphics = this.add.graphics();
            graphics.fillStyle(0x00001A, 1); // Very dark blue
            graphics.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
            // Stars
            for(let i=0; i<100; i++) {
                let x = Phaser.Math.Between(0, GAME_WIDTH);
                let y = Phaser.Math.Between(0, GAME_HEIGHT);
                let size = Phaser.Math.Between(1,2);
                graphics.fillStyle(Phaser.Math.RND.pick([0xFFFFFF, 0xFFFFE0, 0xE0E0FF]), Phaser.Math.FloatBetween(0.5, 1.0));
                graphics.fillRect(x,y,size,size);
            }
            graphics.generateTexture('night_sky_background', GAME_WIDTH, GAME_HEIGHT);
            graphics.destroy();
        })();

        // Streetlight Sprite
        this.textures.exists('streetlight_sprite') || (() => {
            let graphics = this.add.graphics();
            const poleWidth = 8; const poleHeight = 100;
            const lightRadius = 15;
            // Pole
            graphics.fillStyle(0x444444, 1); // Dark grey pole
            graphics.fillRect((lightRadius*2-poleWidth)/2, lightRadius*1.5, poleWidth, poleHeight);
            // Light area
            graphics.fillStyle(0xFFFF88, 1); // Bright yellow light
            graphics.fillCircle(lightRadius, lightRadius, lightRadius);
            // Glow
            graphics.fillStyle(0xFFFF88, 0.3);
            graphics.fillCircle(lightRadius, lightRadius, lightRadius * 1.8);
            graphics.generateTexture('streetlight_sprite', lightRadius*2, poleHeight + lightRadius * 1.5);
            graphics.destroy();
        })();


        // Sound Generation
        let audioCtx = this.sound.context;
        if (audioCtx) {
            // Engine Sound Placeholder
            if (!this.textures.exists('engine_sound_placeholder_texture')) {
                let buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate); // 0.5 sec
                let data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                    data[i] = Math.sin(i / (audioCtx.sampleRate / 100) * Math.PI * 2) * 0.3; // Low freq tone
                }
                this.sound.addAudioSprite('engine_sound_placeholder_sprite', { main: buffer });
                this.textures.createCanvas('engine_sound_placeholder_texture', 1, 1).destroy();
            }

            // Collision Sound Placeholder
            if (!this.textures.exists('collision_sound_placeholder_texture')) {
                let buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.1, audioCtx.sampleRate); // 0.1 sec
                let data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                    data[i] = (Math.random() * 2 - 1) * 0.4 * (1 - i/data.length); // White noise burst, decay
                }
                this.sound.addAudioSprite('collision_sound_placeholder_sprite', { main: buffer });
                this.textures.createCanvas('collision_sound_placeholder_texture', 1, 1).destroy();
            }
            
            // Out of Energy Sound Placeholder
            if (!this.textures.exists('out_of_energy_sound_placeholder_texture')) {
                let buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.3, audioCtx.sampleRate); // 0.3 sec
                let data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                     // Descending tone
                    data[i] = Math.sin(i / (audioCtx.sampleRate / (300 - i * 0.02)) * Math.PI * 2) * 0.3 * (1 - i/data.length);
                }
                this.sound.addAudioSprite('out_of_energy_sound_placeholder_sprite', { main: buffer });
                this.textures.createCanvas('out_of_energy_sound_placeholder_texture', 1, 1).destroy();
            }
        }
    }

    create() {
        // Get current level data
        let levelData = LEVELS.find(l => l.levelId === currentLevelId);
        if (!levelData) {
            console.warn("Level data not found for levelId:", currentLevelId, ". Defaulting to Level 1.");
            currentLevelId = 1; // Reset to a known valid level
            levelData = LEVELS[0];
        }
        this.loadLevel(levelData);
    }

    loadLevel(levelData) {
        this.moveSpeed = selectedCarData.moveSpeed;
        this.playerAngularVelocity = selectedCarData.angularVelocity;
        this.playerEnergyDrainRate = selectedCarData.energyDrainRate || 1.0;

        this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, levelData.backgroundTextureKey);
        this.road = this.add.tileSprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, levelData.roadTextureKey); 
        
        if (levelData.roadTextureKey === 'forest_road_tile' || levelData.roadTextureKey === 'desert_road_tile') {
            this.road.setTileScale(GAME_WIDTH / 64, GAME_HEIGHT / 64); 
        } else if (levelData.roadTextureKey === 'highway_road_tile') {
             this.road.setTileScale(GAME_WIDTH / 128, GAME_HEIGHT / 64); // Assuming 128x64 tile
        } else { 
             this.road.setDisplaySize(GAME_WIDTH, 500); 
        }


        this.roadTopY = levelData.roadBoundaries.topY;
        this.roadBottomY = levelData.roadBoundaries.bottomY;
        
        const playerStartY = levelData.playerStartPosition.y !== undefined ? levelData.playerStartPosition.y : this.roadBottomY - 50;
        this.player = this.physics.add.sprite(levelData.playerStartPosition.x, playerStartY, selectedCarData.textureKey);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(1);
        this.player.setDamping(true);
        this.player.setDrag(0.95);
        this.player.setMaxVelocity(this.moveSpeed + 100); 
        
        this.player.maxEnergy = selectedCarData.maxEnergy;
        this.player.currentEnergy = this.player.maxEnergy;
        this.playedOutOfEnergySound = false; 

        this.cursors = this.input.keyboard.createCursorKeys();
        this.energyText = this.add.text(16, 16, `Energy: ${this.player.currentEnergy}/${this.player.maxEnergy}`, { fontSize: '20px', fill: '#ffffff' });
        this.energyText.setDepth(2);

        // Create buildings group if it doesn't exist, or clear it
        if (!this.buildings) {
            this.buildings = this.physics.add.staticGroup();
        } else {
            this.buildings.clear(true, true);
        }

        if (!this.oilSlicks) { // Ensure oilSlicks group is initialized if not already
            this.oilSlicks = this.physics.add.group({ allowGravity: false, immovable: true });
        } else {
            this.oilSlicks.clear(true, true);
        }

        // Scenery Group (for non-collidable items like streetlights)
        if(!this.scenery) {
            this.scenery = this.add.group();
        } else {
            this.scenery.clear(true,true);
        }

        levelData.obstacles.forEach(obs => {
            if (obs.type === 'building' || obs.type === 'rock' || obs.type === 'tree') {
                let obstacle = this.buildings.create(obs.x, obs.y, obs.textureKey);
                if (obs.scaleX && obs.scaleY) obstacle.setScale(obs.scaleX, obs.scaleY).refreshBody();
                else if (obs.scale) obstacle.setScale(obs.scale).refreshBody();
            } else if (obs.type === 'cliff_barrier' && obs.isInvisible) {
                let barrier = this.buildings.create(obs.x, obs.y, null); 
                barrier.setSize(obs.width, obs.height).setVisible(false).setOrigin(0,0);
                this.physics.world.enable(barrier); 
                barrier.body.setImmovable(true);
                barrier.refreshBody();
            } else if (obs.type === 'oilSlick') {
                let slick = this.oilSlicks.create(obs.x, obs.y, obs.textureKey);
                if (obs.scale) slick.setScale(obs.scale);
                slick.body.isSensor = true;
                slick.setDepth(0); 
            } else if (obs.type === 'streetlight' && obs.isVisualOnly) {
                let light = this.scenery.create(obs.x, obs.y, obs.textureKey);
                if(obs.scale) light.setScale(obs.scale);
                light.setDepth(0); // Render below player but above road/background
            }
        });

        // Camera Tint for levels like Forest Sprint
        if (levelData.levelTint !== undefined) {
            this.cameras.main.setBackgroundColor(levelData.levelTint);
        } else {
            this.cameras.main.setBackgroundColor(0x000000); 
        }
        
        if (!this.aiCars) this.aiCars = this.physics.add.group();
        else this.aiCars.clear(true, true);
        for (let i = 0; i < levelData.aiCarCount; i++) {
            let startX = Phaser.Math.Between(this.roadTopY + 50, GAME_WIDTH - (this.roadTopY + 50) );
            let startY = Phaser.Math.Between(this.roadTopY + 30, this.roadBottomY - 30); 
            let aiSpeed = Phaser.Math.Between(levelData.aiCarMinSpeed, levelData.aiCarMaxSpeed);
            if (Phaser.Math.RND.pick([true, false])) aiSpeed *= -1;
            let aiCar = this.aiCars.create(startX, startY, levelData.aiCarTextureKey); 
            aiCar.setVelocityX(aiSpeed); aiCar.setImmovable(true); aiCar.setDepth(0); 
            aiCar.setCollideWorldBounds(true); aiCar.body.onWorldBounds = true;
        }
        
        if (!this.physics.world.events.get("worldbounds")) { 
            this.physics.world.on('worldbounds', (body) => {
                const gameObject = body.gameObject;
                if (this.aiCars && this.aiCars.contains(gameObject)) { 
                    gameObject.setVelocityX(gameObject.body.velocity.x * -1);
                }
            });
        }

        if (this.player) { 
            this.physics.add.collider(this.player, this.aiCars, this.handlePlayerAiCollision, null, this);
            this.physics.add.collider(this.player, this.buildings, this.handlePlayerBuildingCollision, null, this);
            this.physics.add.overlap(this.player, this.oilSlicks, this.handlePlayerOilSlickOverlap, null, this);
        }
        this.physics.add.collider(this.aiCars, this.buildings);

        if (this.sound.get('engine_sound_placeholder_sprite')) {
            if (this.engineSoundInstance) { this.engineSoundInstance.stop(); this.engineSoundInstance.destroy(); }
            this.engineSoundInstance = this.sound.add('engine_sound_placeholder_sprite', { key: 'main', loop: true, volume: 0.05 });
        }

        // Player Headlight Graphics
        if (!this.headlight) {
            this.headlight = this.add.graphics({ fillStyle: { color: 0xFFFFEE, alpha: 0.15 } });
        }
        if (this.player) this.headlight.setDepth(this.player.depth - 1); // Ensure it's under player
    }

    handlePlayerOilSlickOverlap(player, oilSlick) {
        this.playerOnOilSlick = true;
    }

    update() {
        if (!this.player || !this.player.body) return;

        let onOilThisFrame = this.playerOnOilSlick; 
        this.playerOnOilSlick = false; 

        // Headlight update
        this.headlight.clear();
        if (this.player.currentEnergy > 0) { // Only show headlight if car has energy
            const beamAngle = Phaser.Math.DegToRad(35); // Narrower cone
            const beamLength = 180; // Longer beam
            const playerAngle = this.player.rotation - Math.PI / 2; // Adjust for sprite's 'up'
            
            const p1x = this.player.x;
            const p1y = this.player.y;
            const p2x = this.player.x + beamLength * Math.cos(playerAngle - beamAngle / 2);
            const p2y = this.player.y + beamLength * Math.sin(playerAngle - beamAngle / 2);
            const p3x = this.player.x + beamLength * Math.cos(playerAngle + beamAngle / 2);
            const p3y = this.player.y + beamLength * Math.sin(playerAngle + beamAngle / 2);
            
            this.headlight.fillTriangle(p1x, p1y, p2x, p2y, p3x, p3y);
        }
        this.player.setAngularVelocity(0);
        let currentRotationSpeed = this.playerAngularVelocity; 

        if (onOilThisFrame) {
            currentRotationSpeed *= 0.3; // Reduce turning capability significantly
        }

        if (this.cursors.left.isDown) {
            this.player.setAngularVelocity(-currentRotationSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setAngularVelocity(currentRotationSpeed);
        }
        
        const carTopEdge = this.player.y - this.player.displayHeight / 2;
        const carBottomEdge = this.player.y + this.player.displayHeight / 2;
        let isOffRoad = false;
        if (carTopEdge < this.roadTopY || carBottomEdge > this.roadBottomY) {
            isOffRoad = true;
        }

        let currentAppliedMoveSpeed = this.moveSpeed; 
        if (isOffRoad) {
            currentAppliedMoveSpeed = this.moveSpeed / 3;
        }
        if (onOilThisFrame) {
            currentAppliedMoveSpeed *= 0.5; // Reduce speed by 50%
        }


        if (this.cursors.up.isDown && this.player.currentEnergy > 0) {
            this.physics.velocityFromRotation(this.player.rotation - Math.PI / 2, currentAppliedMoveSpeed, this.player.body.velocity);
            this.player.currentEnergy -= (0.5 * this.playerEnergyDrainRate); 
            if (this.player.currentEnergy < 0) this.player.currentEnergy = 0;

            if (this.engineSoundInstance && !this.engineSoundInstance.isPlaying) this.engineSoundInstance.play();
            if (this.engineSoundInstance) {
                const speedMagnitude = this.player.body.velocity.length();
                this.engineSoundInstance.volume = 0.05 + (speedMagnitude / (this.moveSpeed + 100)) * 0.15; 
            }

        } else if (this.cursors.down.isDown && this.player.currentEnergy > 0) { 
            this.physics.velocityFromRotation(this.player.rotation - Math.PI / 2, -currentAppliedMoveSpeed / 1.5, this.player.body.velocity);
            if (this.engineSoundInstance && !this.engineSoundInstance.isPlaying) this.engineSoundInstance.play();
            if (this.engineSoundInstance) this.engineSoundInstance.volume = 0.05; 
        } else {
            if (this.engineSoundInstance && this.engineSoundInstance.isPlaying) this.engineSoundInstance.stop();
        }
        
        if (onOilThisFrame) { // Slight random drift on oil
             this.player.body.velocity.x += Phaser.Math.FloatBetween(-20, 20); // Increased drift effect
        }

        if (this.player.currentEnergy <= 0) {
            this.player.setAcceleration(0, 0);
            if (!this.playedOutOfEnergySound && this.sound.get('out_of_energy_sound_placeholder_sprite')) {
                this.sound.play('out_of_energy_sound_placeholder_sprite', {key: 'main', volume: 0.5 });
                this.playedOutOfEnergySound = true;
                if (this.engineSoundInstance && this.engineSoundInstance.isPlaying) this.engineSoundInstance.stop();
            }
        } else {
            this.playedOutOfEnergySound = false; 
        }

        // Tinting logic: Oil slick tint takes precedence, then no energy, then off-road
        if (onOilThisFrame) {
            this.player.setTint(0x554433); // Brownish tint for oil
            this.playerIsTintedByCollision = true; // Use the flag to prevent other tints overriding this
        } else if (this.playerIsTintedByCollision && !onOilThisFrame) {
            // This case means a collision tint was active, but we are no longer on oil.
            // The collision handler's delayedCall will clear the tint.
            // If no collision tint was active, this flag is false, then we proceed.
            // If a collision tint IS active, and we are NOT on oil, we let collision handler manage it.
        } else { // Not on oil, and no other collision tint should be active from this frame
             this.playerIsTintedByCollision = false; // Reset collision tint flag
            if (this.player.currentEnergy <= 0) {
                this.player.setTint(0x0000ff);
            } else if (isOffRoad) {
                this.player.setTint(0xaaaaaa);
            } else {
                this.player.clearTint();
            }
        }
        
        this.energyText.setText('Energy: ' + Math.floor(this.player.currentEnergy) + '/' + this.player.maxEnergy);

        // AI Car logic is now primarily handled by world bounds collision (reversing direction)
        // and collision with buildings. The explicit wrapping block below has been removed.
        // this.aiCars.getChildren().forEach(aiCar => {
        //     // Example of corrected X-boundary check if simple wrapping were still needed:
        //     // if (aiCar.x < 0 - aiCar.displayWidth / 2) { 
        //     //     aiCar.x = this.game.config.width + aiCar.displayWidth / 2;
        //     // } else if (aiCar.x > this.game.config.width + aiCar.displayWidth / 2) {
        //     //     aiCar.x = 0 - aiCar.displayWidth / 2;
        //     // }
        // });
    }

    handlePlayerAiCollision(player, aiCar) {
        if (this.playerIsTintedByCollision) return;
        this.playerIsTintedByCollision = true;
        player.setTint(0xff0000); 
        player.currentEnergy -= 50;
        if (player.currentEnergy < 0) player.currentEnergy = 0;

        if (this.sound.get('collision_sound_placeholder_sprite')) this.sound.play('collision_sound_placeholder_sprite', {key: 'main', volume: 0.4 });

        const knockbackStrength = 150;
        if (player.body.touching.left) player.setVelocityX(-knockbackStrength);
        else if (player.body.touching.right) player.setVelocityX(knockbackStrength);
        if (player.body.touching.up) player.setVelocityY(-knockbackStrength);
        else if (player.body.touching.down) player.setVelocityY(knockbackStrength);
        else {
            if (player.x < aiCar.x) player.setVelocityX(-knockbackStrength); else player.setVelocityX(knockbackStrength);
            if (player.y < aiCar.y) player.setVelocityY(-knockbackStrength); else player.setVelocityY(knockbackStrength);
        }

        this.time.delayedCall(200, () => {
            this.playerIsTintedByCollision = false;
            if (player.tintTopLeft === 0xff0000) player.clearTint(); 
        }, [], this);
    }

    handlePlayerBuildingCollision(player, building) {
        if (this.playerIsTintedByCollision) return; 
        this.playerIsTintedByCollision = true;
        player.setTint(0xcc0000); 
        player.currentEnergy -= 20;
        if (player.currentEnergy < 0) player.currentEnergy = 0;

        if (this.sound.get('collision_sound_placeholder_sprite')) this.sound.play('collision_sound_placeholder_sprite', {key: 'main', volume: 0.4 });

        player.setVelocityX(player.body.velocity.x * -0.5);
        player.setVelocityY(player.body.velocity.y * -0.5);

        this.time.delayedCall(100, () => {
            this.playerIsTintedByCollision = false;
            if (player.tintTopLeft === 0xcc0000) player.clearTint();
        }, [], this);
    }
}

// Main Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true, 
            gravity: { y: 0 }
        }
    },
    scene: [CarSelectionScene, PlayScene] // Start with CarSelectionScene
};

const game = new Phaser.Game(config);
