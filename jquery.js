<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.css">
    <style>
        img {
            max-width: 70%;
        }
        
        .image-center {
            display: block;
            margin: 10px auto;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 id="title" class="text-center">Welcome to my website.</h1>
        <div class="row">
            <article class="col-sm-8">
                <p>My website is very important because I have many important things to say. Here is a picture of a puppy in a cup: </p>
                <img src="pup-in-cup.jpg" alt="Puppy in Cup">
                <p>Here are some more thoughts: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum harum labore veritatis, possimus facilis quas repellat, explicabo, ad commodi ipsum quidem nostrum earum pariatur fugit! Magni sunt nulla impedit!
                    Facilis.
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, natus qui nostrum libero atque hic distinctio sint facilis nihil possimus tenetur deserunt rerum laboriosam cum quisuam doloremque ducimus error.
                </p>
                <p>Rerum debitis aspernatur, ipsum animi! Quis ullam dolore blanditiis accusantium eius minus tempore, iure maxime similique vel! Possimus reprehenderit autem, recusandae quos laudantium nesciunt libero suscipit officia rerum, et.</p>
                <p>Aliquam harum at soluta id esse perspiciatis, nesciunt corporis nostrum commodi, dolorum, repellat possimus a cumque. Id sed explicabo, quaerat sit esse facere, voluptatem, odit nesciunt eveniet assumenda, error!</p>
                <p>Consequuntur porro, nobis placeat, labore magni aliquam repellendus consequatur hic facere, molestiae dolorum suscipit quos sint, minima Quibusdam voluptatem est hic, corporis. Officiis delectus, consectetur harum reiciendis perferendis.</p>
            </article>
            <aside class="col-sm-4">
                <h4>I love lists. Here's why.</h4>
                <ol>
                    <li>Sometimes they're numbered, and numbers are great.</li>
                    <li>Sometimes they're not, and that's okay too.</li>
                    <li>I don't have the attention span to read paragraphs.</li>
                    <li>Hey look, there's a puppy!</li>
                </ol>
            </aside>
        </div>
        <div class="row mb-5">
            <div class="col-sm-4">
                Red
                <input class="form-control" type="number" min="0" max="255" value="255">
            </div>
            <div class="col-sm-4">
                Blue
                <input class="form-control" type="number" min="0" max="255" value="255">
            </div>
            <div class="col-sm-4">
                Green
                <input class="form-control" type="number" min="0" max="255" value="255">
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script>
        $('document').ready(function() {
                console.log("Let get ready to party with jQuery!");
            })
            //2
        $('img').addClass('image-center');
        //3
        $('p').last().remove();
        //4
        $('h1').css('font-size', Math.random() * 100);
        //5
        $('ol').append('<li> I\'m here</li>');
        //6
        $("aside")
            .empty()
            .append($("<p>", {
                text: "Sorry about that list :("
            }));
        //7
        $(".form-control").on('keyup blur change', function() {
            let red = $(".form-control").eq(0).val();
            let blue = $(".form-control").eq(1).val();
            let green = $(".form-control").eq(2).val();
            $("body").css("background-color",
                "rgb(" + red + "," + green + "," + blue + ")");
        });
        //8
        $('img').click(function() {
            $(this).remove();
        })
    </script>
</body>

</html>
