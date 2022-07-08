import React from "react";
import "./Rules.css";

export function Rules() {
    return (
        <div className="rules">
            <h1>Rules</h1>
                <h2>Basic rules</h2>
                <h3><u>How to win</u></h3>
                <p>The goal of Machine Strike is to eliminate your opponent's pieces and earn 7 Victory Points. Each piece represents<br/>
                    a Machine, and these pieces all have a Victory Points value, awarded to you when you defeat them. To win, you<br/> 
                    must either be the first player to earn 7 Victory Points, or destroy all your opponent's pieces — whichever comes first.</p>
                <h3><u>Starting a game of Machine Strike</u></h3>
                <p>Before a game of Machine Strike can begin, both players must first select a team of pieces to place on<br/>
                    the board. Outside of practice matches and tutorials, you will need to choose your pieces manually. However,<br/>
                    you cannot just bring all your pieces; you need to create a set.</p>
                <p>When preparing for a game, you can create a set, spending up to 10 Setup Points by selecting pieces. Each piece<br/>
                    as a setup cost equivalent to their Victory Points value. For example, a Burrower piece costs 1 Setup Point,<br/>
                    as per the shot above. You need to decide which pieces will be best while also ensuring you don't go over the<br/>
                    maximum of 10 Setup Points.</p>
                <p>One other thing to note: you cannot have more than four of the same machine piece in a set, so you'll need to<br/>
                    mix it up to a degree. Once you have created a play set, it will be saved so you can use it in future, or<br/>
                    you can make new sets.</p>
                <h3><u>First steps</u></h3>
                <p>After choosing your set of pieces, the game will start. Each player must place their pieces onto the board within<br/>
                    the two rows nearest to them. Once this is done, the owner of the board (always the opponent) decides who moves<br/>
                    first, and then turns alternate.</p>
                <h3><u>Basic movements</u></h3>
                <p>You are allowed to move two of your pieces per turn. If you only have one piece in play, you can move it twice.<br/>
                    Once your two moves have been made, you can end your turn.</p>
                <p>Your basic options are to move a piece or attack an opposing piece, if it's within range. After selecting a piece,<br/>
                    you will be able to see its movement range and the tiles where an attack would land. You can also choose to rotate,<br/>
                    a piece — we'll explain why this can be important later.</p>
            <br/>

            <h2>Pieces</h2>
            <h3><u>Piece name and type</u></h3>
            <p>Each piece has a name and type. There are 6 machine types, each one dictating how a piece can behave:</p>
            <ul>
                <li><strong>Melee:</strong> Always attacks the first machine in its Attack Range.</li>
                <li><strong>Gunner:</strong> Always attacks at the maximum of its Attack Range.</li>
                <li><strong>Ram:</strong> Always attacks the first machine in its Attack Range and knocks it backwards.<br/>
                It will thenmove onto the terrain left behind by the opposing machine.</li>
                <li><strong>Dash:</strong> Always moves to the end of its Attack Range and damages every machine in its path,<br/>
                including your own, and rotates them 180 degrees. It must have an empty terrain to land on<br/>
                at the end of its Attack Range in order to attack.</li>
                <li><strong>Swoop:</strong> Always attacks the first machine within its Attack Range and moves next to it.<br/>
                Gains +1 Combat Power on all terrains and can ignore all terrain penalties.</li>
                <li><strong>Pull:</strong> Always attacks the first machine in its Attack Range and pulls the enemy one<br/>
                terrain closer to it. Gains +1 Combat Power while on Marsh terrain and can traverse through it<br/>
                without hindering its movement.</li>
            </ul>
            <h3><u>Victory points value</u></h3>
            <p>In the upper right of the note card is its Victory Points value. This is<br/>
                the number of Victory Points a player will gain by destroying the piece.</p>
            <h3><u>Armored and weak points</u></h3>
            <p>On the bottom left of the central image, you'll see a symbol with red and blue segments. The red parts<br/>
                are Weak Points, and the blue parts are Armored Points. These affect the amount of damage a piece will take<br/>
                when being attacked. Assuming yours is the defending piece:</p>
            <ul>
                <li>Your piece will gain +1 Combat Power if an Armored Point is being attacked.</li>
                <li>Your piece will lose -1 Combat Power if a Weak Point is being attacked.</li>
            </ul>
            <p>This is why rotating pieces can make a difference; if you're looking to defend, you should rotate your<br/>
                pieces so that any Weak Points are protected from opposing pieces, or at least harder to reach.</p>
            <h3><u>Skill</u></h3>
            <p>While not all of them do, some machine pieces will have a Skill, viewable on the note card below the main image.<br/>
                These Skills take effect automatically, and can provide some interesting advantages in combat.</p>
            <p>For example, a Lancehorn's Skill is Climb, which means it gains an additional +1 Combat Power when attacking<br/>
                from Hill terrain. Check out each of your pieces and take note of any Skills you can make use of.</p>
            <h3><u>Attack Power, Attack Range, Movement Range, and Health</u></h3>
            <p>At the bottom of the note card, you'll see four symbols and numbers. From left to right, these are:</p>
            <ul>
                <li><strong>Attack power:</strong> How much damage the piece deals by default.</li>
                <li><strong>Attack range:</strong> How far the piece's attack will reach by default.</li>
                <li><strong>Movement range:</strong> How far the piece can travel by default.</li>
                <li><strong>Health:</strong> The piece's default amount of health.</li>
            </ul>
            <h3><u>Active effects</u></h3>
            <p>Below the note card, you may see various symbols. These denote any active effects on the piece. Among these, you will always<br/>
                see a symbol on the left that tells you what terrain the piece is standing on, and how this affects its Combat Power.</p>
            <br/>

            <h2>The board</h2>
            <p>Playing boards in Machine Strike are made up of various types of tile arranged in an eight by eight grid. The different elevations<br/>
                and colours of the tiles represent different terrain. These terrains affect a piece's Combat Power. They are as follows:</p>
            <ul>
                <li><strong>Chasm:</strong> The lowest terrain, only accessible by flying machines. Impacts Combat Power by -2.</li>
                <li><strong>Marsh Terrain:</strong> Impedes movement upon landing. Impacts Combat Power by -1.</li>
                <li><strong>Grassland Terrain:</strong> Level terrain and most common. Impacts Combat Power by 0.</li>
                <li><strong>Forest Terrain:</strong> Up a level from Grassland Terrain. Impacts Combat Power by +1.</li>
                <li><strong>Hill Terrain:</strong> Up a level from Forest Terrain. Impacts Combat Power by +2.</li>
                <li><strong>Mountain Terrain:</strong> Up a level from Hill Terrain. Impacts Combat Power by +3.</li>
            </ul>
            <br/>

            <h2>Combat</h2>
            <p>You and your opponent's pieces will eventually come to blows. Let's go through what you need to<br/>
                remember when engagingin combat in Machine Strike.</p>
            <h3><u>Combat power</u></h3>
            <p>An attacking piece's Combat Power is the combination of its base Attack Power and the terrain value as outlined above.<br/>
                For example, if a piece's Attack Power is 2, and it's currently stood on Forest terrain (providing a +1 boost), its<br/>
                Combat Power will be 3. Likewise, if the same piece is on Marsh terrain, its Combat Power will become 1.<br/>
                A defending piece's Combat Power is only the Terrain value.</p>
            <h3><u>Damage</u></h3>
            <p>The attacking piece's Combat Power is pitted against the defending piece's Combat Power, and the difference will be<br/>
                the damage dealt. So, if your piece has a Combat Power of 2 and the defending piece has a Combat Power of 1, you will<br/>
                deal 1 point of damage to that piece's Health.</p>
            <br/>

            <h2>Advanced moves</h2>
            <p>Machine Strike also has a couple of other moves to consider while playing.</p>
            <h3><u>Sprinting</u></h3>
            <p>When moving a piece, you will be able to see its whole range of movement. The outer limits of this shown range,<br/>
                the tiles with a dotted circle, are where you can Sprint to. Sprinting is when you move a piece one space beyond<br/>
                its normal movement limit. If you Sprint, you cannot follow up with an attack — unless you Overcharge.</p>
            <h3><u>Overcharging</u></h3>
            <p>As outlined above, a single piece can only move and attack once in a turn. However, you can choose to Overcharge<br/>
                that piece, which allows you to move that piece or attack with it a second time. However, to do so, that piece must<br/>
                sacrifice 2 Health points. This damage is dealt after the Overcharge action is taken.</p>
            <h3><u>Special attacks</u></h3>
            <p>There are a couple of special attack effects you should be aware of before you commit to an attack.<br/>
            <br/>
            <strong>Defense Break:</strong> If an attacking piece has an equal or lower Combat Power than a defending piece, both pieces<br/>
            will lose 1 Health point, and the defending piece will be knocked back one space.<br/>
            <br/>
            <strong>Knockback:</strong> A piece that is knocked back moves one spot away from the attacking piece. If it isn't possible<br/>
            for the affected piece to move back, it will lose a point of Health instead. If the space behind<br/>
            the affected piece is already occupied, both of these pieces will lose a point of Health.</p>
            <br/>

            <h2>Skills</h2>
            <p>Certain pieces in Machine Strike will have a Skill, a unique effect or advantage<br/>
                that can change how it moves or how it affects other pieces. You can see what a<br/> 
                piece's Skill is, if it has one, on its note card on the corresponding side of your screen.</p>
            <br/>
            <br/>
        </div>
    )
}