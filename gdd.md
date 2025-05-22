# Game Design Document

## 1. Introduction

-   **Game Title Suggestions:**
    -   Electric Velocity
    -   Volt Racer Pro
    -   Circuit Surge
    -   Amped Up Racing
    -   EVolution Racer
-   **Concept:** A web-based, arcade-style racing game inspired by classics like Road Fighter, but with modern graphics and an electric car theme.
-   **Target Audience:** Casual gamers, fans of retro racing games, players interested in electric vehicles.
-   **Platform:** Web browser (HTML5)

## 2. Core Gameplay Mechanics

-   **Objective:** Finish each race course before running out of time or energy, avoiding obstacles and opponents.
-   **Controls:**
    -   Accelerate: Up Arrow / W key
    -   Brake/Reverse: Down Arrow / S key
    -   Steer Left: Left Arrow / A key
    -   Steer Right: Right Arrow / D key
    -   Special Ability/Boost: Spacebar (tied to car or upgrade)
-   **Game Perspective:** Top-down or slightly angled top-down view.
-   **Winning/Losing Conditions:**
    -   Win: Reach the finish line of a level.
    -   Lose: Run out of time, run out of energy (battery), or crash too many times (if a health/damage system is implemented).
-   **Energy (Battery) System:** Cars consume energy to move. Energy can be replenished by picking up power-ups or at specific "charging zones" on the track.
-   **Obstacles:** Static obstacles (e.g., barriers, rocks), moving obstacles (e.g., civilian traffic, opponent racers).
-   **AI Opponents:** Basic AI for other racers on the track. Their behavior will vary (some aggressive, some defensive).

## 3. Game Elements

-   **Levels (10 total):**
    -   Each level should have a unique theme:
        1.  Cityscape
        2.  Desert Highway
        3.  Mountain Pass
        4.  Coastal Road
        5.  Futuristic Tunnel
        6.  Forest Trail
        7.  Snowy Tundra
        8.  Industrial Zone
        9.  Night Race
        10. Canyon Run
    -   Increasing difficulty: More complex tracks, more aggressive AI, more obstacles, tighter time/energy limits.
    -   Potential unique features per level:
        -   Cityscape: Narrow streets, tight turns, pedestrian crossings (visual only).
        -   Desert Highway: Long straights, heat haze effect, occasional sandstorms reducing visibility.
        -   Mountain Pass: Winding roads, elevation changes, risk of falling off edges (visual penalty or reset).
        -   Coastal Road: Scenic views, some slippery sections near water, potential for shortcuts via beaches.
        -   Futuristic Tunnel: Neon lights, speed boost pads, energy recharge strips.
        -   Forest Trail: Dirt tracks, trees as obstacles, reduced visibility under canopy.
        -   Snowy Tundra: Icy patches causing reduced traction, blizzards.
        -   Industrial Zone: Complex layouts, moving machinery as obstacles, oil slicks.
        -   Night Race: Limited visibility, reliance on headlights, opponent taillights.
        -   Canyon Run: Narrow paths, rockfalls, tight echoing sounds.
-   **Playable Electric Cars (10 total):**
    -   Creative car name suggestions:
        1.  Spark Ace
        2.  Volt Runner
        3.  Ion Comet
        4.  Circuit Star
        5.  Current Cruiser (Similar to Tesla Model S)
        6.  Bolt Pioneer (Similar to Rivian R1T)
        7.  Charge Chaser
        8.  Kilowatt King
        9.  Static Speedster
        10. Electron Epsilon
    -   Each car will have base stats for:
        -   Top Speed
        -   Acceleration
        -   Handling (Traction/Turning Radius)
        -   Battery Capacity
        -   Durability (if damage is a factor, e.g., 3 hits and car is temporarily stalled)
    -   Cars are unlocked progressively (e.g., by winning races or earning in-game currency).
-   **Car Upgrades:**
    -   Players can upgrade their cars using in-game currency earned from races.
    -   Upgradeable parts:
        -   Motor (improves acceleration and top speed)
        -   Battery (increases energy capacity)
        -   Tires (improves handling and traction)
        -   Aero Kit (improves top speed / handling - visual change too)
        -   Special Module (e.g., short boost, temporary shield, passive energy regen - one per car, or swappable)
-   **Power-ups (Optional but Recommended):**
    -   Instant Battery Refill: Fully charges the car's battery.
    -   Temporary Invincibility/Shield: Car takes no damage and passes through obstacles for a short period.
    -   Speed Boost: Provides a significant burst of speed for a limited time.
    -   Time Bonus: Adds extra seconds to the level timer.

## 4. Art Style and UI/UX

-   **Graphics:** Modern, clean, and vibrant. More detailed than classic 8-bit/16-bit racers. Could be stylized 2.5D or simple 3D. Aim for a visually appealing and smooth experience.
-   **UI:**
    -   **Main Menu:**
        -   Play (Starts the game, leading to level select or continuing progress)
        -   Car Select (Allows players to choose their car and see stats)
        -   Upgrades (Access the car upgrade screen)
        -   Options (Sound volume, control mapping, graphics quality)
        -   Exit/Quit (Closes the game or returns to a main hub if web-based)
    -   **In-Game HUD:**
        -   Speedometer: Displays current speed.
        -   Energy Gauge: Shows remaining battery life.
        -   Timer: Counts down remaining time for the level.
        -   Lap Counter: (If applicable, for circuit-based tracks)
        -   Mini-map: (Optional) Shows a simplified layout of the track and player position.
        -   Power-up Slot: Displays currently held power-up.
    -   **Car Selection Screen:**
        -   Visually display car models (2D sprites or simple 3D renders).
        -   Clearly show stats for Top Speed, Acceleration, Handling, Battery, Durability.
        -   Indication of locked/unlocked status.
    -   **Upgrade Screen:**
        -   Select a car to upgrade.
        -   List upgradeable parts (Motor, Battery, Tires, Aero Kit, Special Module).
        -   Show current level of upgrade and cost for next level.
        -   Visual feedback for upgrades (e.g., part highlights, stat changes).
-   **Sound:**
    -   Engine sounds: Distinct electric hum, dynamic whine for acceleration and deceleration.
    -   Collision sounds: Different sounds for light bumps, heavy crashes, and obstacle types.
    -   UI feedback sounds: Clicks for button presses, confirmation sounds for purchases.
    -   Background music:
        -   Upbeat electronic music for menus.
        -   Theme-specific tracks for each level (e.g., intense techno for Futuristic Tunnel, adventurous for Mountain Pass).
    -   Power-up activation sounds.

## 5. Monetization

-   For now, assume a free-to-play model with no real-money transactions.
-   Focus on in-game currency earned through gameplay (completing races, achieving high scores, daily login bonus if implemented).
-   Currency is used for unlocking cars and purchasing upgrades.

## 6. Technology Stack (Initial Thoughts)

-   **Frontend:** HTML5, CSS3, JavaScript
-   **Game Engine/Library:**
    -   Phaser 3: Strong choice for 2D, rich features, large community.
    -   PixiJS: High-performance 2D rendering, more lightweight than Phaser if fewer built-in game features are needed.
    -   Three.js: Consider if a simple 3D style is strongly preferred and the team has or can acquire the expertise. May increase development complexity compared to 2D engines for this type of game.

## 7. Future Considerations (Optional)

-   **Multiplayer Mode:**
    -   Local split-screen or online multiplayer races.
    -   Ghost racing against other players' best times.
-   **Leaderboards:**
    -   Global and friend-based leaderboards for best race times per level.
-   **Daily Challenges:**
    -   Specific objectives for players to complete each day for extra in-game currency (e.g., "Finish Cityscape with 50% battery remaining," "Beat 3 opponents in Desert Highway").
-   **More Cars and Levels:**
    -   Expand content post-launch.
-   **Customizable Car Skins/Colors.**
-   **Story Mode (Simple):**
    -   A light narrative to tie the races together.
