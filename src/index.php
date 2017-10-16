<?php
include("svg-stock.php")
 ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Fanta Gamme 2017</title>
    <link rel="stylesheet" href="css/app.min.css">
</head>
<body>
    <div id="smoothScroll-wrapper">
        <section id="landingSection" data-anchor="accueil" data-scroll=0 class="scrollY-active section">
            <p>Je suis la page d'accueil.</p>
            <div class="navigation-button">
                <a href="#" class="previous-navigation-button"><p>Previous</p></a>
                <br>
                <a href="#" class="next-navigation-button"><p>Next</p></a>
            </div>
            <div class="waves">
                <svg class="wave first">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
                <svg width="80" height="80" class="wave second">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
        </section>

        <section id="firstBottle" class="section" data-anchor="fanta-orange" data-scroll=1>
            <h2>Je suis la bouteille à l'orange.</h2>
            <div class="navigation-button">
                <a href="#" class="previous-navigation-button"><p>Previous</p></a>
                <br>
                <a href="#" class="next-navigation-button"><p>Next</p></a>
            </div>

            <div class="waves">
                <svg class="wave first">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
                <svg width="80" height="80" class="wave second">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
        </section>

        <section id="secondBottle" class="section" data-anchor="fanta-cassis-framboise" data-scroll=2>
            <h2>Je suis la bouteille à la cassis et framboise.</h2>
            <div class="navigation-button">
                <a href="#" class="previous-navigation-button"><p>Previous</p></a>
                <br>
                <a href="#" class="next-navigation-button"><p>Next</p></a>
            </div>

            <div class="waves">
                <svg class="wave first">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
                <svg width="80" height="80" class="wave second">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
        </section>

        <section id="thirdBottle" class="section" data-anchor="fanta-orange-sanguine" data-scroll=3>
            <h2>Je suis la bouteille à la orange Sanguine.</h2>
            <div class="navigation-button">
                <a href="#" class="previous-navigation-button"><p>Previous</p></a>
                <br>
                <a href="#" class="next-navigation-button"><p>Next</p></a>
            </div>

            <div class="waves">
                <svg class="wave first">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
                <svg width="80" height="80" class="wave second">
                    <use class="ic-1" xlink:href="#wave" x="0" y="0" />
                </svg>
        </section>

    </div>
<script src="js/app.js" charset="utf-8"></script>
</body>
</html>
